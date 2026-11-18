
import jwt from "jsonwebtoken";

const isAuthorized = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.id = decoded.userId;
        req.email = decoded.email;
        req.role = decoded.role;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
};

export default isAuthorized;
