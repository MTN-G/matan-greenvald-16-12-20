const Router = require("express").Router;
const fs = require("fs").promises;
const router = Router();
const path = require("path")

const dir_name = process.cwd()

router.get("/all/:recieved", async (req, res) => {
  try {
    let items = await fs.readFile(path.join(dir_name, 'api/files/Items.json'), "utf8");
    items = JSON.parse(items);
    if (req.params.recieved === "recieved") {
      items = items.filter((item) => item.recieved === true);
    } else {
      items = items.filter((item) => item.recieved === false);
    }
    let stores = await fs.readFile(path.join(dir_name, 'api/files/stores.json'), "utf8");
    stores = JSON.parse(stores);
    let labels = await fs.readFile(path.join(dir_name, 'api/files/labels.json'), "utf8");
    labels = JSON.parse(labels);
    const resItems = items.map((item) => {
      item.store = stores.find((store) => store.id === item.store).name;
      const newLabels = [];
      const oldLabels = item.labels;
      oldLabels.forEach((itemLabel) => {
        newLabels.push(labels.find((label) => label.id === itemLabel).name);
      });
      item.labels = newLabels;
      return item;
    });
    resItems.sort((a,b)=> a.estimatedDate - b.estimatedDate)
    res.json(resItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let items = await fs.readFile(path.join(dir_name, 'api/files/Items.json'), "utf8");
    items = JSON.parse(items);
    const { name, estimatedDate, store, labels, price} = req.body;
    const newItem = {
      id: items[items.length - 1].id + 1,
      name,
      estimatedDate,
      recieved: false,
      store,
      labels,
      price
    };
    items.push(newItem)
    await fs.writeFile(path.join(dir_name, 'api/files/Items.json'), JSON.stringify(items));
    res.json(newItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/recieved/:id/:boolean", async (req, res) => {
  try {
    let items = await fs.readFile(path.join(dir_name, 'api/files/Items.json'), "utf8");
    items = JSON.parse(items);
    const newItem = items.findIndex((item => item.id === parseInt(req.params.id)))
    if (req.params.boolean === "true") {
      items[newItem].recieved = true
    } else if (req.params.boolean === "false") {
      items[newItem].recieved = false
    } else {
      res.status(500).json({error: "invalid params"})
    }
    
    JSON.stringify(items)
    await fs.writeFile(path.join(dir_name, 'api/files/Items.json'), JSON.stringify(items));
    res.json(JSON.stringify(items));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let items = await fs.readFile(path.join(dir_name, 'api/files/Items.json'), "utf8");
    items = JSON.parse(items);
    const itemToDelete = items.findIndex((item => item.id === parseInt(req.params.id)))
    items.splice(itemToDelete, 1)
    JSON.stringify(items)
    await fs.writeFile(path.join(dir_name, 'api/files/Items.json'), JSON.stringify(items));
    res.json(JSON.stringify(items));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
