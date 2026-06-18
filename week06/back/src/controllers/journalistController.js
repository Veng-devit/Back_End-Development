import * as journalistRepository from "../repositories/journalistRepository.js";

export async function getAllJournalists(req, res) {
  try {
    const journalists = await journalistRepository.getJournalists();
    res.json(journalists);
  } catch (error) {
    console.error("Error fetching journalists:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getJournalistById(req, res) {
  try {
    const journalist = await journalistRepository.getJournalistById(req.params.id);
    if (!journalist) {
      return res.status(404).json({ message: "Journalist not found" });
    }
    res.json(journalist);
  } catch (error) {
    console.error("Error fetching journalist:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getArticlesByJournalist(req, res) {
  try {
    const articles = await journalistRepository.getArticlesByJournalist(req.params.id);
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles by journalist:", error);
    res.status(500).json({ message: "Server error" });
  }
}
