import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles, removeArticle, getCategories, getArticlesByCategory } from "../services/api";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      fetchArticles();
    } else {
      fetchFilteredArticles();
    }
  }, [selectedCategories]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories");
    }
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilteredArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const results = await Promise.all(
        selectedCategories.map((catId) => getArticlesByCategory(catId))
      );
      const merged = results.flat();
      const unique = merged.filter(
        (article, index, self) => index === self.findIndex((a) => a.id === article.id)
      );
      setArticles(unique);
    } catch (err) {
      setError("Failed to filter articles.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await removeArticle(id);
      if (selectedCategories.length === 0) {
        await fetchArticles();
      } else {
        await fetchFilteredArticles();
      }
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryToggle = (catId) => {
    setSelectedCategories((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId]
    );
  };

  const handleView = (id) => navigate(`/articles/${id}`);
  const handleEdit = (id) => navigate(`/articles/${id}/edit`);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {categories.length > 0 && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryToggle(cat.id)}
              style={{
                margin: "5px",
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid var(--main-color)",
                background: selectedCategories.includes(cat.id)
                  ? "var(--main-color)"
                  : "white",
                color: selectedCategories.includes(cat.id) ? "white" : "var(--main-color)",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {cat.name}
            </button>
          ))}
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              style={{
                margin: "5px",
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #999",
                background: "transparent",
                cursor: "pointer",
                color: "#999",
              }}
            >
              Clear filter
            </button>
          )}
        </div>
      )}

      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteArticle}
          />
        ))}
      </div>
    </>
  );
}

function ArticleCard({ article, onView, onEdit, onDelete }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">
        By {article.journalist_name || `Journalist #${article.journalist_id}`}
      </div>
      {article.category_names && (
        <div style={{ fontSize: "0.85em", color: "#888", marginBottom: "10px" }}>
          Categories: {article.category_names}
        </div>
      )}
      {article.category && !article.category_names && (
        <div style={{ fontSize: "0.85em", color: "#888", marginBottom: "10px" }}>
          Category: {article.category}
        </div>
      )}

      <div className="article-actions">
        <button className="button-tertiary" onClick={() => onEdit(article.id)}>
          Edit
        </button>
        <button
          className="button-tertiary"
          onClick={() => onDelete(article.id)}
        >
          Delete
        </button>
        <button className="button-secondary" onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  );
}
