import { pool } from "../utils/database.js";

export async function getArticles() {
  const [rows] = await pool.query(
    `SELECT a.*, j.name AS journalist_name,
            GROUP_CONCAT(c.name SEPARATOR ', ') AS category_names
     FROM articles a
     LEFT JOIN journalists j ON a.journalist_id = j.id
     LEFT JOIN article_categories ac ON a.id = ac.article_id
     LEFT JOIN categories c ON ac.category_id = c.id
     GROUP BY a.id`
  );
  return rows;
}

export async function getArticleById(id) {
  const [rows] = await pool.query(
    `SELECT a.*, j.name AS journalist_name
     FROM articles a
     LEFT JOIN journalists j ON a.journalist_id = j.id
     WHERE a.id = ?`,
    [id]
  );
  return rows[0] || null;
}

export async function createArticle(article) {
  const { title, content, journalist_id, category } = article;
  const [result] = await pool.query(
    "INSERT INTO articles (title, content, journalist_id, category) VALUES (?, ?, ?, ?)",
    [title, content, journalist_id || null, category]
  );
  return { id: result.insertId, ...article };
}

export async function updateArticle(id, updatedData) {
  const { title, content, journalist_id, category } = updatedData;
  const [result] = await pool.query(
    "UPDATE articles SET title = ?, content = ?, journalist_id = ?, category = ? WHERE id = ?",
    [title, content, journalist_id || null, category, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, ...updatedData };
}

export async function deleteArticle(id) {
  const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
