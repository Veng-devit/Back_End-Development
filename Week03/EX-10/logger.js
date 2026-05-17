
export default function logger(req, res, next) {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Query:", req.query);
  console.log("Time:", new Date().toISOString());
  console.log("---");
  next(); 
}
