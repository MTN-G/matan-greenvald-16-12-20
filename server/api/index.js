const Router = require("express").Router

const router = Router();

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use("/items", require("./items"));
router.use("/labels", require("./labels"));
router.use("/stores", require("./stores"));


router.use(unknownEndpoint);

module.exports = router;