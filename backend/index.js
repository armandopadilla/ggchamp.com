/**
 * Site Landing Page (Controller/Action)
 *
 * @param app
 * @param req
 * @param res
 */
module.exports = (app, req, res) => {
    return app.render(req.raw, res.res, '/', req.query, {})
};