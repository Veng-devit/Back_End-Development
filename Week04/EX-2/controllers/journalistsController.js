import { journalists, articles } from "../models/data.js";

export const getAllJournalists = (req, res) => {
    res.json(journalists);
};

export const getJournalistByID = (req, res) => {
    const journalistId = parseInt(req.params.id);
    const journalist = journalists.find(j => j.id === journalistId);
    if (!journalist) return res.status(404).json({ error: 'category not found' });
    res.json(journalist);
};

export const createJournalist= (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Create journalist require name and email' });
    }

    const newjournalist = {
        id: journalists.length + 1,
        name,
        email
    };
    journalists.push(newjournalist);
    res.status(201).json(newjournalist);
};

export const updateJournalist = (req, res) => {
    const journalistId = parseInt(req.params.id);
    const { name, email } = req.body;

    const journalist = journalists.find(j => j.id === journalistId);
    if (!journalist) return res.status(404).json({ error: 'journalist not found' });

    if (name) journalist.name = name;
    if (email) journalist.email = email;
    res.json(journalist);
};

export const deleteJournalist = (req, res) => {
    const journalistId = parseInt(req.params.id);
    const index = journalists.findIndex(j => j.id === journalistId);
    if (index === -1) return res.status(404).json({ error: 'journalist not found' });

    journalists.splice(index, 1);
    res.status(204).send();
};

export const getJournalistArticle = (req, res)=>{
    const journalistId = parseInt(req.params.id);
    const articleList = articles.filter(a => a.journalistId === journalistId);
    if (!articleList) return res.status(404).json({error: 'Article not exist with this journalist'});
    res.json(articleList);
}


