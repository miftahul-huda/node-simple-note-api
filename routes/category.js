const CrudRouter = require("./crudrouter");

class CategoryRouter extends CrudRouter{

    static init(req, res)
    {
        req.session.user = req.body.user;
    }
}

module.exports = CategoryRouter;