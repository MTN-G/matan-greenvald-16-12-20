const Router = require("express").Router;
const fs = require("fs").promises;
const router = Router();
const path = require("path")

const dir_name = process.cwd()

router.get("/all/:recieved", async (req, res) => {
  try {
    console.log(dir_name)
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
    res.json(resItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let items = await fs.readFile(path.join(dir_name, './files/Items.json'), "utf8");
    items = JSON.parse(items);
    const { name, date, store, label } = req.body;
    const newItem = {
      id: items[items.length - 1].id + 1,
      name,
      date,
      recieved: false,
      store,
      label: [label],
    };
    const newItemsArray = items.push(newItem);
    const newItemsArrayJson = [];
    newItemsArray.forEach((obj) => newItemsArrayJson.push(JSON.stringify(obj)));
    await fs.writeFile(path.join(dir_name, './file/Items.json'), newItemsArrayJson);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
