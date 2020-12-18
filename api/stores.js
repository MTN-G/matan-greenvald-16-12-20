const Router = require('express').Router
const fs = require('fs').promises
const router = Router();
const path = require("path")

const dir_name = process.cwd()

router.get("/all", async (req, res) => {

    try {
        let items = await fs.readFile(path.join(dir_name, 'api/files/Items.json'),'utf8');
        items = JSON.parse(items)
        
    let stores = await fs.readFile(path.join(dir_name, 'api/files/stores.json'), 'utf8');
        stores = JSON.parse(stores)
        stores.map(store => {
            store.count = 0;
            items.forEach(item => {
                if (item.store === store.id) store.count++
            })
            return store
        })
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const newStore = req.body
  const newStoreJson = JSON.stringify(newStore)
  await fs.writeFile('api/files/stores.json', newStoreJson)
})


module.exports = router;