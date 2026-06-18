import { pool } from "../utils/database.js";

export async function getCategories() {
  const [rows] = await pool.query("SELECT * FROM categories");
  return rows;
}

export async function getArticlesByCategory(categoryId) {
  const [rows] = await pool.query(
    `SELECT a.*, j.name AS journalist_name
     FROM articles a
     LEFT JOIN journalists j ON a.journalist_id = j.id
     LEFT JOIN article_categories ac ON a.id = ac.article_id
     WHERE ac.category_id = ?`,
    [categoryId]
  );
  return rows;
}

export async function getArticlesWithCategories() {
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
