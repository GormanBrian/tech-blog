const express = require("express");

// Import auth middleware
const withAuth = require("../utils/auth");

// Import sequelize models
const { BlogPost, Comment, User } = require("../models/");

/**
 * Express router to mount {@linkcode BlogPost} related functions on.
 * @type {object}
 * @const
 */
const router = express.Router();

router.get("/", withAuth, async (req, res) => {
  try {
    const blogPostsData = await BlogPost.findAll({
      attributes: ["title", "createdAt"],
      raw: true,
    });

    res.render("homepage", {
      blogPosts: blogPostsData,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Render the dashboard view with all BlogPost titles and timestamps
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogPostsData = await BlogPost.findAll({
      attributes: ["title", "createdAt", "content"],
      raw: true,
    });

    res.render("dashboard", {
      blogPosts: blogPostsData,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.render("error", { err });
  }
});

router.get("/dashboard/new", withAuth, async (req, res) => {
  res.render("create-blogpost", { loggedIn: req.session.logged_in });
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
router.get("/blogposts/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      attributes,
      include: [
        includeUsername,
        {
          model: Comment,
          attributes: ["contents", "createdAt"],
          include: [includeUsername],
        },
      ],
    }).get({ plain: true });
    res.render("blogpost", {
      blogPost: blogPostData,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Render the login page or redirect to the homepage if already logged in
router.get("/login", (req, res) => {
  req.session.logged_in ? res.redirect("/") : res.render("login");
});

module.exports = router;
