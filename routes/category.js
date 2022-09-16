const CrudRouter = require("./crudrouter");

class CategoryRouter extends CrudRouter{

    static init(req, res)
    {
        req.session.user = "miftahul.huda@devoteam.com";
    }
}

module.exports = CategoryRouter;