import express from 'express';
import categoryRout from './routes/categoriesRout.js';
import journalistRout from './routes/journalistsRout.js';
import articleRout from './routes/articlesRout.js';
import logger from './middleware/logger.js'
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/articles', articleRout);
app.use('/journalists', journalistRout);
app.use('/categories', categoryRout);
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});