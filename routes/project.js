const CrudRouter = require("./crudrouter");

class ProjectRouter extends CrudRouter{

    static init(req, res)
    {
        //req.session.user = "miftahul.huda@devoteam.com";
        req.session.user = req.body.user;

    }

}

module.exports = ProjectRouter;