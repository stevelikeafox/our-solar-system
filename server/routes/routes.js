module.exports = function (app, passport) {


    // process the login form
    // app.post('/login', do all our passport stuff here);
    app.post('/login', passport.authenticate('local-login'), function (req, res) {
        const user = req.user;
        if (!user) return res.sendStatus(404);
        return res.status(200).send(user);
    });

    // =====================================
    // SIGNUP ==============================
    // =====================================

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    app.post('/signup', // save user);

        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', function (req, res) {
            req.logout();
            res.redirect('/login');
        }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    //local-----------------------------------
    app.get('/unlink/local', isLoggedIn, function (req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function (err) {
            res.redirect('/login');
        });
    });
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}