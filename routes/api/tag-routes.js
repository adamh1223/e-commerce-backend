const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });

    if (tags.length === 0) {
      return res.status(404).json({ message: "No tags found." });
    }

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });

    if (!tag) {
      return res
        .status(404)
        .json({ message: `Tag with ID: ${req.params.id} not found.` });
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length > 0) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newTag.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json({ message: "Tag created.", newTag });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updated === 1) {
      res.status(200).json({ message: "Tag updated." });
    } else {
      res
        .status(404)
        .json({ message: `Tag with ID ${req.params.id} not found.` });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to update tag." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deleted === 0) {
      return res
        .status(404)
        .json({ message: `Tag with ID: ${req.params.id} not found.` });
    }

    res.status(200).json({ message: "Tag deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
