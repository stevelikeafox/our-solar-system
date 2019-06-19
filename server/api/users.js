module.exports = function (app) {

    const users = require('../models/users');


    app.get('/api/v1/users/:id', (req, res) => {
        var query = {};
        var id = req.params.id;

        if (id) {
            query._id = id

        }
        users.find(query).exec(function (err, users) {
            if (err) return res.status(500).send(err);
            res.status(200).json(users);
        });
    });


    app.put('/api/v1/users/:userid', (req, res, next) => {
        const updateUser = req.params.userid;
        console.log(updateUser);
        users.update({
            _id: updateUser,
        }, req.body, function (err, resp) {
            if (err) return res.status(500).send(err);
            res.sendStatus(200);
        })
    });

}