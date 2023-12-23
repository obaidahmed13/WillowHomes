import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

// Middleware - check if JWT is valid
export const verifyToken = (req, res, next) => {
    //Retrieve token - extract from access_token cookie in incoming http req
    const token = req.cookies.access_token;
    // Check if there is a token, return error if there isn't
    if (!token) return next(errorHandler(401, 'Unauthorized'));
        // Verify the token, if valid, save information in user
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
            // Return error using errorHandler
            if (err) return next(errorHandler(403, 'Forbidden'));
            // Attach information to the request object
            req.user = user;
            // Pass to next middleware 
            next();
        })
}
