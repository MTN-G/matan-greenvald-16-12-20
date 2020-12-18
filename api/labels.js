const Router = require("express").Router;
const fs = require("fs").promises;
const router = Router();
const path = require("path");

const dir_name = process.cwd();

router.get("/all", async (req, res) => {
  try {
    let labels = await fs.readFile(
      path.join(dir_name, "api/files/labels.json"),
      "utf8"
    );
    labels = JSON.parse(labels);
    res.json(labels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let labels = await fs.readFile(
      path.join(dir_name, "api/files/labels.json"),
      "utf8"
    );
    labels = JSON.parse(labels);
    const newLabel = {
      name: req.body.name,
      id: labels[labels.length - 1].id + 1,
    };
    labels.push(newLabel);
    await fs.writeFile(
      path.join(dir_name, "api/files/labels.json"),
      JSON.stringify(labels)
    );
    res.json(JSON.stringify(labels))
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
