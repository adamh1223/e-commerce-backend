const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  console.log({ req, res });

  Category.findAll({
    include: [Product],
  })
    .then((result) => {
      console.log(result);
      if (result.length <= 0) {
        return res.status(400).send("No categories found.");
      }

      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json({ err }));
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  }).then((result) => {
    if (!result) {
      return res
        .status(400)
        .send(`Category with ID: ${req.params.id} could not be found.`);
    }

    res.status(200).json(result);
  });
});

router.post("/", (req, res) => {
  // create a new category

  console.log(req.body);
  Category.create(req.body)
    .then((result) => {
      console.log(result);
      if (!result) {
        return res.status(400).send("Failed to create new category.");
      }

      res.status(200).json({ message: "New category created." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value

  console.log(req.params.id);
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    console.log(result);
    if (!result) {
      return res
        .status(400)
        .send(`Category with ID: ${req.params.id} could not be found.`);
    }
    res.status(200).json({ message: "Category updated." });
  });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value

  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    console.log(result);
    if (!result) {
      return res
        .status(400)
        .send(`Category with ID: ${req.params.id} could not be found.`);
    }
    res.status(200).json({ message: "Category deleted." });
  });
});

module.exports = router;
