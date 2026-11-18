const isCanteenOwner = (req, res, next) => {
    if (req.role !== "canteen owner") {
        return res.status(403).json({
            success: false,
            message: "Only canteen owner can perform this operation"
        });
    }

    next();
};

export default isCanteenOwner;