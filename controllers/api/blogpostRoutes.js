const router = require("express").Router();
const { BlogPost } = require("../../models");

// Create a new blog post
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const blogPostData = await BlogPost.create({
      title,
      content,
      author_id: req.session.user_id,
    });

    if (!blogPostData) {
      res.status(400);
      return;
    }

    res.status(201).redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!blogPostData) {
      res.status(400).json({ message: "No blogpost exists with that ID" });
      return;
    }

    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
