import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesByJournalist, getJournalistById } from "../services/api";

export default function JournalistArticles() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [journalist, setJournalist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [articlesData, journalistData] = await Promise.all([
        getArticlesByJournalist(id),
        getJournalistById(id),
      ]);
      setArticles(articlesData);
      setJournalist(journalistData);
    } catch (err) {
      setError("Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!journalist) return <p>Journalist not found.</p>;

  return (
    <div>
      <h2>Articles by {journalist.name}</h2>
      <p><strong>Email:</strong> {journalist.email}</p>
      <p><strong>Bio:</strong> {journalist.bio}</p>

      <div className="article-list">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <div className="article-title">{article.title}</div>
            <div className="article-snippet">{article.content}</div>
            <div className="article-actions">
              <button
                className="button-secondary"
                onClick={() => navigate(`/articles/${article.id}`)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
