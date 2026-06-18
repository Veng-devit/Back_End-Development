import { pool } from "../utils/database.js";

export async function getJournalists() {
  const [rows] = await pool.query("SELECT * FROM journalists");
  return rows;
}

export async function getJournalistById(id) {
  const [rows] = await pool.query("SELECT * FROM journalists WHERE id = ?", [id]);
  return rows[0] || null;
}

export async function getArticlesByJournalist(journalistId) {
  const [rows] = await pool.query(
    `SELECT a.*, j.name AS journalist_name
     FROM articles a
     LEFT JOIN journalists j ON a.journalist_id = j.id
     WHERE a.journalist_id = ?`,
    [journalistId]
  );
  return rows;
}
