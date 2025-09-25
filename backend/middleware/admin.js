const fetchAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send({ error: "Access denied, only admins allowed" });
  }
  next();
};

module.exports = fetchAdmin;
