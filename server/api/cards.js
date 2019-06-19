module.exports = function (app) {

    const cards = require('../models/cards');

    app.post('/api/v1/cards', (req, res, next) => {
        const postBody = req.body;
        const newCard = new cards(postBody);


        newCard.save((err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).json(result);
        });
    });

    app.put('/api/v1/cards/:cardid', (req, res, next) => {
        const updateCard = req.params.cardid;
        console.log(updateCard);
        cards.update({
            _id: updateCard,
        }, req.body, function (err, resp) {
            if (err) return res.status(500).send(err);
            res.sendStatus(200);
        })
    });

    app.get('/api/v1/cards', (req, res, next) => {
        cards.find({

        })
            .exec((err, result) => {
                if (err) return res.status(500).send(err);
                res.status(200).json(result);
                var data = result;
                return data
            })
    });

    app.delete('/api/v1/cards/:cardid', (req, res, next) => {
        const deleteCard = req.params.cardid;
        console.log(deleteCard);
        cards.deleteOne({
            _id: deleteCard
        }, (err, resp) => {
            if (err) return res.status(500).send(err);
            res.sendStatus(204);
        })
    });

}