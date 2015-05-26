// grab the nerd model we just created
var Train = require('./model/train');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/trains', function (req, res) {
        // use mongoose to get all trains in the database
        Train.find(function (err, trains) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(trains); // return all nerds in JSON format
        });
    });
    // Get Train By id
    app.get('/api/trains/:id', function (req, res) {

        Train.findById(req.params.id, function (err, train) {
            if (err)
                res.send(err);
            res.json(train);

        });
    });
    // Update Trains 
    app.put('/api/trains/:id', function (req, res) {
        Train.findByIdAndUpdate(req.params.id, req.body, function (err, train) {
            if (err)
                res.send(err);

            res.json(train);

        });
    });

    // route to handle creating trains goes here (app.post)
    app.post('/api/trains', function (req, res) {
        //Create Trains
        Train.create(req.body, function (err, train) {
            if (err)
                res.send(err);

            res.json(train);

        });

    });



    // route to handle delete goes here (app.delete)
    app.delete('/api/trains/:id', function (req, res) {
        Train.findByIdAndRemove(req.params.id, req.body, function (err, train) {
            if (err)
                res.send(err);

            res.json(train);

        });

    });
    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};