CREATE DATABASE IF NOT EXISTS week6Db;
USE week6Db;

CREATE TABLE IF NOT EXISTS journalists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  bio TEXT
);

CREATE TABLE IF NOT EXISTS articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  journalist_id INT,
  category VARCHAR(255),
  article_date DATE,
  FOREIGN KEY (journalist_id) REFERENCES journalists(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS article_categories (
  article_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO journalists (name, email, bio) VALUES
('Alice', 'alice@example.com', 'Senior frontend reporter'),
('Bob', 'bob@example.com', 'Backend and infrastructure journalist'),
('RONAN', 'ronan@example.com', 'Breaking news correspondent');

INSERT INTO categories (name) VALUES
('Frontend'),
('Backend'),
('DevOps'),
('Mobile');

INSERT INTO articles (title, content, journalist_id, category, article_date) VALUES
('React Basics', 'Learn React fundamentals', 1, 'Frontend', '2026-06-01'),
('Routing', 'React Router deep dive', 2, 'Frontend', '2026-06-02'),
('Node.js Performance', 'Optimizing Node.js apps', 2, 'Backend', '2026-06-03'),
('CSS Grid Layout', 'Mastering CSS Grid', 1, 'Frontend', '2026-06-04'),
('Docker for Beginners', 'Getting started with containers', 3, 'DevOps', '2026-06-05');

INSERT INTO article_categories (article_id, category_id) VALUES
(1, 1), (2, 1), (3, 2), (4, 1), (5, 3);
