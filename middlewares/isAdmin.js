// Middleware para verificar si el usuario tiene el rol de administrador
export default (req, res, next) => {
    if (req.user?.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Administrator role required." });
    }
};
