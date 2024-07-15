const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data

  Product.findAll({
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    .then((result) => {
      if (result.length <= 0) {
        return res.status(400).send("No products found.");
      }
      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json({ err }));
});

// get one product
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data

  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    .then((result) => {
      if (!result) {
        return res
          .status(400)
          .send(`Product with ID: ${req.params.id} could not be found.`);
      }
      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json({ err }));
});

// create new product
router.post("/", (req, res) => {
  // Ensure req.body.tagIds is an array
  const tagIds = req.body.tagIds || [];

  Product.create(req.body)
    .then((product) => {
      if (tagIds.length) {
        const productTagIdArr = tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr).then((productTags) => {
          res.status(200).json({ message: "New product created." });
        });
      } else {
        res.status(200).json({ message: "New product created." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      // Check if any rows were affected
      if (result[0] === 0) {
        return res
          .status(400)
          .json({ message: "Product not found or no changes made." });
      }

      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      // Return success message
      res.status(200).json({ message: "Product updated." });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// delete one product by its `id` value
router.delete("/:id", (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (!result) {
        return res
          .status(400)
          .send(`Product with ID: ${req.params.id} could not be found.`);
      }
      res.status(200).json({ message: "Product deleted." });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
