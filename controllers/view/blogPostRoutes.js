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

// Render the dashboard view with all BlogPost titles and timestamps
router.get("/dashboard", withAuth, async (_, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      attributes: ["title", "created_at"],
    }).get({ plain: true });
    res.render("dashboard", { blogPosts });
  } catch (err) {
    console.error(err);
    res.send(500).json(err);
  }
});

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

// Render the blogpost view with a BlogPost found by ID
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
