module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  res.json({
    categories: ["Love", "Career", "Destiny", "Warning"],
    description: 'Available mystical categories for Luminary Oracle'
  });
}; 