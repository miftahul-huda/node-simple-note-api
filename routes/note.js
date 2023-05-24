const CrudRouter = require("./crudrouter");

class NoteRouter extends CrudRouter{

    static init(req, res)
    {
        //req.session.user = "miftahul.huda@devoteam.com";
        req.session.user = JSON.parse(req.headers.user).username;

    }

    static getRouter(logic)
    {
        let router = super.getRouter(logic)
        let me  = this;
        router.get('/by-category-project/:category/:project', function (req, res){
            me.init(req, res);
            let o = req.body;
            let logic = router.logic;
            logic.session = req.session;

            let category_id = req.params.category;
            let project_id = req.params.project;
            let offset = req.query.offset;
            let limit = req.query.limit;
            let sort = req.query.sort;

            sort = me.sortToArray(sort)

            logic.findByCategoryAndProject(category_id, project_id, offset, limit, sort).then(function (savedO)
            {
                res.send(savedO);
            }).catch(function (err){
                console.log("error")
                console.log(err)
                res.send(err);
            })
        })


        return router;
    }

}

module.exports = NoteRouter;