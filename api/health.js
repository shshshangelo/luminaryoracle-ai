module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  res.json({ status: 'Luminary Oracle is alive and mystical ✨' });
}; 