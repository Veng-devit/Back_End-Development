import { 
    getArticle, 
    getArticleID, 
    createArticle, 
    updateArticle, 
    deleteArticle 
} from "../controllers/articlesController.js";
import express, { Router } from 'express';

const articleRout = express.Router();

articleRout.get('/', getArticle);
articleRout.get('/:id', getArticleID);
articleRout.post('/', createArticle);
articleRout.put('/:id', updateArticle);
articleRout.delete('/:id', deleteArticle);

export default articleRout;
