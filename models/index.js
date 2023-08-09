const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

// Blog post belongs to a user
BlogPost.belongsTo(User, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
});

// User has many blog posts
User.hasMany(BlogPost, {
  foreignKey: "author_id",
});

/* -------------------- Comment Associations -------------------- */

// Comment belongs to a blog post
Comment.belongsTo(BlogPost, {
  foreignKey: "blog_post_id",
});

// Blog post has many comments
BlogPost.hasMany(Comment, {
  foreignKey: "blog_post_id",
});

Comment.belongsTo(User, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "author_id",
});

module.exports = {
  User,
  BlogPost,
  Comment,
};
