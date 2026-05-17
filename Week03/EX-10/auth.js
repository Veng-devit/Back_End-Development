

export default function auth(req, res, next) {
  const token = req.query.token;

  if (!token || token !== "xyz123") {
    return res.status(401).json({ error: "Unauthorized: missing or invalid token" });
  }

  next(); 
}

