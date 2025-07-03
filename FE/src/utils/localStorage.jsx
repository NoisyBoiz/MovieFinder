const localStorage = window.localStorage;
const ls = {
    getUserInfo: ()=>{
        return localStorage.getItem("user-info")?JSON.parse(localStorage.getItem("user-info")):null;
    },
    setUserInfo: (x)=>{
        localStorage.setItem("user-info",JSON.stringify(x));
    },
    getLanguage: ()=>{
        return localStorage.getItem("language")!==null?localStorage.getItem("language"):"en";
    },
    setLanguage: (x)=>{
        localStorage.setItem("language",x);
    },
    getShowPagination: ()=>{
        if(localStorage.getItem("showPagination")===null) localStorage.setItem("showPagination","true");
        return localStorage.getItem("showPagination")==="true"?true:false;
    },
    setShowPagination: (x)=>{
        x = x?"true":"false";
        localStorage.setItem("showPagination",x);
    },
    getDarkMode: ()=>{
        if(localStorage.getItem("darkMode")===null) localStorage.setItem("darkMode","true");
        return localStorage.getItem("darkMode")==="true"?true:false;
    },
    setDarkMode: (x)=>{
        x = x?"true":"false";
        localStorage.setItem("darkMode",x);
    }
}

export default ls;

