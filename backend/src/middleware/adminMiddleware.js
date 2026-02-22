/**
 * Restricts access to admin only. Must be used after authMiddleware.
 * Returns 403 if req.user.role !== "admin".
 */
export function adminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
}
