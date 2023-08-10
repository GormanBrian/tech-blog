const express = require("express");

// Import auth middleware
const withAuth = require("../../utils/auth");

// Import sequelize models
const BlogPost = require("../../models/BlogPost");
const Comment = require("../../models/Comment");
const User = require("../../models/User");

/**
 * Express router to mount {@linkcode BlogPost} related functions on.
 * @type {object}
 * @const
 */
const router = express.Router();

/**
 * Common BlogPost attributes
 * @type {Array<string>}
 * @const
 */
const attributes = ["id", "title", "contents"];

/**
 * Includes the associated User object's username
 * @type {object}
 * @property {object} model User model
 * @property {Array<string>} attributes Username attribute
 * @const
 */
const includeUsername = {
  model: User,
  attributes: ["username"],
};

// Get BlogPost by ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id, {
      attributes,
      include: [
        includeUsername,
        {
          model: Comment,
          attributes: ["contents", "created_at"],
          include: [includeUsername],
        },
      ],
    }).get({ plain: true });
    res.render("blogpost", { blogPost });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
