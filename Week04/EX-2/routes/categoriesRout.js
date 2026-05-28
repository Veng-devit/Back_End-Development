import { 
    getAllCategories, 
    getCategoryByID, 
    createCategory, 
    updateCategory, 
    deleteArticle, 
    getCategoryArticle 
} from "../controllers/categoriesController.js";
import express from 'express';

const categoryRout = express.Router();

categoryRout.get('/', getAllCategories);
categoryRout.get('/:id', getCategoryByID);
categoryRout.post('/', createCategory);
categoryRout.put('/:id', updateCategory);
categoryRout.delete('/:id', deleteArticle);
categoryRout.get('/:id/articles', getCategoryArticle)

export default categoryRout;
