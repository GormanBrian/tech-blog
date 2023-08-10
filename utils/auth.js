const e = require("express");

/**
 * Authentication middleware that redirects if not logged in
 *
 * @method withAuth
 * @param {e.Request} req Express {@linkcode e.Request request} object
 * @param {e.Response} res Express {@linkcode e.Response response} object
 * @param {e.NextFunction} next Express {@linkcode e.NextFunction next} function
 * @returns {void}
 */
const withAuth = (req, res, next) => {
  req.session.logged_in ? next() : res.redirect("/login");
};

module.exports = withAuth;
