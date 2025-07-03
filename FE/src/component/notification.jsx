import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import "../styles/notification.css";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notificationProps, setNotificationProps] = useState(null);

  const notify = useCallback((props) => {
    setNotificationProps({
      ...props,
      onClose: () => {
        props.onClose?.();
        setNotificationProps(null);
      },
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notificationProps &&
        ReactDOM.createPortal(
          <Notification {...notificationProps} />,
          document.body
        )}
    </NotificationContext.Provider>
  );
};

const Notification = ({
  type = "alert", // alert, warning, success, error, confirm
  title = "",
  message = "",
  showCloseButton = false,
  onAccept = null,
  onCancel = null,
  titleAccept = "Yes",
  titleCancel = "No",
  duration = 2000,
  timer = false,
  onClose = null,
}) => {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setVisible(true);
    const el = document.getElementById("notification-box");
    el?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    let interval;
    if (timer && duration > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            handleClose();
            return 0;
          }
          return prev - 100;
        });
      }, 100);
    }

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const handleAccept = () => {
    onAccept?.();
    handleClose();
  };

  const handleCancel = () => {
    onCancel?.();
    handleClose();
  };

  const icons = {
    alert: <span>🔔</span>,
    warning: <span>⚠️</span>,
    success: <span>✅</span>,
    error: <span>❌</span>,
    confirm: <span>❓</span>,
  };

  const renderButtons = () => (
    <>
      {showCloseButton && (
        <button className="btn btn-close" onClick={handleClose}>
          Đóng
        </button>
      )}
      {onCancel && (
        <button className="btn btn-cancel" onClick={handleCancel}>
          {titleCancel}
        </button>
      )}
      {onAccept && (
        <button className="btn btn-accept" onClick={handleAccept}>
          {titleAccept}
        </button>
      )}
      {timer && (
        <span className="notification-timer">
          {Math.ceil(timeLeft / 1000)}s
        </span>
      )}
    </>
  );

  return (
    <div
      className={`notification-container ${visible ? "show" : ""}`}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="notification-title"
      aria-describedby="notification-message"
    >
      <div
        className={`notification-box ${type}`}
        id="notification-box"
        tabIndex="-1"
      >
        <div className="notification-head">{icons[type]}</div>
        {title && (
          <div id="notification-title" className="notification-title">
            {title}
          </div>
        )}
        <div id="notification-message" className="notification-message">
          {message}
        </div>
        <div className="notification-footer">{renderButtons()}</div>
      </div>
    </div>
  );
};
