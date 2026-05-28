import { categories, articles } from "../models/data.js";

export const getAllCategories = (req, res) => {
    res.json(categories);
};

export const getCategoryByID = (req, res) => {
    const categoriesId = parseInt(req.params.id);
    const category = categories.find(c => c.id === categoriesId);
    if (!category) return res.status(404).json({ error: 'category not found' });
    res.json(category);
};

export const createCategory= (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Create category require name' });
    }

    const newCategory = {
        id: categories.length + 1,
        name
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
};

export const updateCategory = (req, res) => {
    const categoryId = parseInt(req.params.id);
    const { name } = req.body;

    const category = categories.find(c => c.id === categoryId);
    if (!category) return res.status(404).json({ error: 'category not found' });

    if (name) category.name = name;
    res.json(category);
};

export const deleteArticle = (req, res) => {
    const categoryId = parseInt(req.params.id);
    const index = categories.findIndex(c => c.id === categoryId);
    if (index === -1) return res.status(404).json({ error: 'category not found' });

    categories.splice(index, 1);
    res.status(204).send();
};

export const getCategoryArticle = (req, res)=>{
    const categoryId = parseInt(req.params.id);
    const articleList = articles.filter(a => a.categoryId === categoryId);
    if (!articleList) return res.status(404).json({error: 'Article not exist with this category'});
    res.json(articleList);
}


