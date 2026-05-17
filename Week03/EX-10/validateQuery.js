
export default function validateQuery(req, res, next) {
  const { minCredits, maxCredits } = req.query;
  if (minCredits !== undefined && !Number.isInteger(Number(minCredits))) {
    return res.status(400).json({ error: "minCredits must be a valid integer" });
  }
  if (maxCredits !== undefined && !Number.isInteger(Number(maxCredits))) {
    return res.status(400).json({ error: "maxCredits must be a valid integer" });
  }
  if (minCredits !== undefined && maxCredits !== undefined) {
    if (Number(minCredits) > Number(maxCredits)) {
      return res.status(400).json({ error: "minCredits cannot be greater than maxCredits" });
    }
  }

  next();
}
