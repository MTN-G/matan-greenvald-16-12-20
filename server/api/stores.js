const Router = require('express').Router
const fs = require('fs').promises
const router = Router();

router.get("/all", async (req, res) => {

  try {
    let stores = await fs.readFile('./files/stores.json', 'utf8');
    stores = JSON.parse(stores)
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const newStore = req.body
  const newStoreJson = JSON.stringify(newStore)
  await fs.writeFile('./files/stores.json', newStoreJson)
})


module.exports = router;