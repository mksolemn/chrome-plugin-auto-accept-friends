var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/enjoyerdb');

var Enjoyer = require('./app/models/enjoyer');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/enjoyer')

.post(function(req, res) {

    var enjoyer = new Enjoyer();
    
    enjoyer.nameId = req.body.nameId;
    enjoyer.inviteTime = req.body.inviteTime;
    enjoyer.lastLogin = req.body.lastLogin;
    enjoyer.userImage = req.body.userImage;
    enjoyer.username = req.body.username;
    enjoyer.password = req.body.password;
    enjoyer.userState = req.body.userState;


    // save the bear and check for errors
    enjoyer.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Enjoyer created!' });
    });

})


.get(function(req, res) {
    Enjoyer.find(function(err, enjoyers) {
        if (err)
            res.send(err);

        res.json(enjoyers);
    });
});


// on routes that end in /bears/:bear_id
// ----------------------------------------------------

router.route('/enjoyer/:enjoyer_id')


.get(function(req, res) {
    Enjoyer.findById(req.params.enjoyer_id, function(err, enjoyer) {
        if (err)
            res.send(err);
        res.json(enjoyer);
    });
})


.put(function(req, res) {

    // use our bear model to find the bear we want
    Enjoyer.findById(req.params.enjoyer_id, function(err, enjoyer) {

        if (err)
            res.send(err);

        enjoyer.nameId = req.body.nameId;           // update the bears info
        enjoyer.inviteTime = req.body.inviteTime;   // update last invite time
        enjoyer.lastLogin = req.body.lastLogin;     // last time user logged in
        enjoyer.userImage = req.body.userImage;     // users profile image
        enjoyer.username = req.body.username;       // login username
        enjoyer.password = req.body.password;       // login password
        enjoyer.userState = req.body.userState;     // 1 - registered (has password and username), 2 - registered (has all information)

        enjoyer.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Enjoyer updated!' });
        });

    });
})


.delete(function(req, res) {
    Enjoyer.remove({
        _id: req.params.enjoyer_id
    }, function(err, enjoyer) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

// scheduler



app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);