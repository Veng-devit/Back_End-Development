import { 
    getAllJournalists, 
    getJournalistByID,
    createJournalist,
    updateJournalist,
    deleteJournalist,
    getJournalistArticle
} from "../controllers/journalistsController.js";
import express from 'express';

const journalistRout = express.Router();

journalistRout.get('/', getAllJournalists);
journalistRout.get('/:id', getJournalistByID);
journalistRout.post('/', createJournalist);
journalistRout.put('/:id', updateJournalist);
journalistRout.delete('/:id', deleteJournalist);
journalistRout.get('/:id/articles', getJournalistArticle)

export default journalistRout;