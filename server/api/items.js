const Router = require('express').Router
const fs = require('fs').promises
const router = Router();

router.get("/all/:received", async (req, res) => {

  try {
    let items = await fs.readFile('./files/items.json','utf8');
    items = JSON.parse(items)
    if (req.params.received === "received") {
      items = items.filter((item) => item.recieved === true)
    } else {
      items = items.filter((item) => item.recieved === false)
    }
    let stores = await fs.readFile('./files/stores.json', 'utf8');
    stores = JSON.parse(stores)
    let labels = await fs.readFile('./files/labels.json','utf8');
    labels = JSON.parse(labels)
    console.log(items)
    console.log(stores)
      const resItems = items.map((item) => {
          item.store = (stores.find((store) => store.id === item.store)).name;
          const newLabels = []
          const oldLabels = item.labels
          oldLabels.forEach((itemLabel) => {
              newLabels.push((labels.find((label) => label.id === itemLabel)).name)
          })
          item.labels = newLabels;
          return item;
      })
    res.json(resItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const newItem = req.body
  const newItemJson = JSON.stringify(newItem)
  await fs.writeFile('./files/items.json', newItemJson)
})

// router.get("/:id", async (req: Request, res: Response) => {
//     try {
//     const {id} = req.params
//     const items = fs.readFile('../files/items.js', (err, data) => {
//         if (err) throw err;
//         return data;
//     });
//     const selectedItem = items.find(item => item.id === id)
//     if (selectedItem) return res.json(selectedItem);
//     res.status(404).json({ error: "Item not found" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const body: IClass = req.body;
//     const newClass: IClass = {
//       course: body.course,
//       name: body.name,
//       startingDate: body.startingDate,
//       endingDate: body.endingDate,
//       cycleNumber: body.cycleNumber,
//       zoomLink: body.zoomLink,
//       additionalDetails: body.additionalDetails,
//     };
//     const { error } = classSchema.validate(newClass);
//     if (error) return res.status(400).json({ error: error.message });
//     const createdClass: IClass = await Class.create(newClass);
//     res.json(createdClass);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.patch("/:id", async (req: Request, res: Response) => {
//   try {
//     const { value, error } = classSchemaToPut.validate(req.body);
//     if (error) return res.status(400).json({ error: error.message });
//     const updated = await Class.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (updated[0] === 1) return res.json({ message: "Class updated" });
//     res.status(404).json({ error: "Class not found" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Class.destroy({
//       where: { id },
//     });
//     if (deleted === 0) {
//       return res.status(404).send("Class not found");
//     } else {
//       await Student.destroy({ where: { classId: id } });
//       res.json({ message: "Class deleted" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
