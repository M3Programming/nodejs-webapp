const express = require("express")
const router = express.Router();
const conn = require('../lib/database')
const parseUrl = require('body-parser');


let encodeUrl = parseUrl.urlencoded({ extended: false });

router.get('/register', function (req, res, next) {
    res.render('register',{
       
            title: 'Registration Page',
            name: '',
            email: '',
            password: ''     
        
    })
})

router.post('/register', encodeUrl, (req, res) => {

      //No errors were found.  Passed Validation!
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let userName = req.body.userName;
        let password = req.body.password;

        conn.connect(function (err) {
            if (err) {
                console.log(err);
            };
            // checking user already registered or no
           conn.query(`SELECT * FROM user_details WHERE username = '${userName}' AND password  = '${password}'`, function (err, result) {
                if (err) {
                    console.log(err);
                };
                if (Object.keys(result).length > 0) {
                    res.sendFile(__dirname + '/failreg.html');
                } else {
                    //creating user page in userPage function
                    function userPage() {
                        // We create a session for the dashboard (user page) page and save the user data to this session:
                        req.session.user = {
                            firstname: firstName,
                            lastname: lastName,
                            emailadd: email,
                            username: userName,
                            userpassword: password
                        };

                        res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <title>Login and register form with Node.js, Express.js and MySQL</title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body>
                    <div class="container">
                        <h3>Hi, ${req.session.user.firstname} ${req.session.user.lastname}</h3>
                        <a href="/">Log out</a>
                    </div>
                </body>
                </html>
                `);
                    }
                    // inserting new user data
                    let sql = `INSERT INTO user_details (email_add, first_name,last_name, username, password) VALUES ('${email}', '${firstName}','${lastName}', '${userName}', '${password}')`;
                    conn.query(sql, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            // using userPage function for creating user page
                            userPage();
                        };
                    });

                }

            });
        });
});

module.exports = router;