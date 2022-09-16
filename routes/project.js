const CrudRouter = require("./crudrouter");

class ProjectRouter extends CrudRouter{

    static init(req, res)
    {
        req.session.user = "miftahul.huda@devoteam.com";
    }

}

module.exports = ProjectRouter;