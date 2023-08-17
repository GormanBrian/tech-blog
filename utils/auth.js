/**
 * Authentication middleware that redirects if not logged in
 *
 * @method withAuth
 */
const withAuth = (req, res, next) => {
  console.log(req.session.logged_in);
  if (req.session.logged_in) {
    next();
  } else {
    console.log("----------------- NOT LOGGED IN -----------------");
    res.redirect("/login");
  }
};

module.exports = withAuth;
