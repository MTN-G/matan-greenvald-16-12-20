const Router = require('express').Router
const fs = require('fs').promises
const router = Router();

router.get("/all", async (req, res) => {

  try {
    let labels = await fs.readFile(path.join(__dirname, 'files/labels.json'), 'utf8');
    labels = JSON.parse(labels)
    res.json(labels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const newLabel = req.body
  const newLabelJson = JSON.stringify(newLabel)
  await fs.writeFile(path.join(__dirname, 'files/labels.json'), newLabelJson)
})


module.exports = router;