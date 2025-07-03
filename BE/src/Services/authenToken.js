import jwt from 'jsonwebtoken';
import ResponseObj from "../ResponseObj/index.js";

const AuthenToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null || token === "") return res.status(401).json(ResponseObj(401,"Token is null!", null));

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if(err) return res.status(403).json(ResponseObj(403,"Token expired!", null));
        next()
    });
}

export default AuthenToken;
