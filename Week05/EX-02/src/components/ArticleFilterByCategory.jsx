import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:3000/articles');
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilters = async () => {
    try {
      if (selectedCategory) {
        const res = await axios.get(
          `http://localhost:3000/categories/${selectedCategory}/articles`
        );
        setArticles(res.data);
      } else {
        fetchArticles();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetFilters = () => {
    setSelectedCategory('');
    fetchArticles();
  };

  return (
    <div>
      <h2>Articles</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>

        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button onClick={applyFilters}>
          Apply Filters
        </button>

        <button onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong>
            <br />
            <small>
              By Journalist #{article.journalistId} | Category #{article.categoryId}
            </small>
            <br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}