const results = await LibraryBook.findAll({
  where: {
     price: { [Op.between]: [10, 40] },
     genre: { [Op.in]: ['fiction', 'sci-fi'] },   // in
     stock: { [Op.gte]: 1 },                      // 1
  }
});

console.log('Matching books:', results.map(b => b.title));