const router = require("express").Router();
const { User } = require("../../models");

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userData = await User.create({ username, email, password });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = userData.id;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400).json({
        message: "No account exists with that email. Please try again!",
      });
      return;
    }

    const isValidPassword = userData.checkPassword(req.body.password);
    if (!isValidPassword) {
      res
        .status(400)
        .json({ message: "Incorrect password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = userData.id;
      res.status(200);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  console.info("LOGGING OUT");
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end().redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
