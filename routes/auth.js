const express = require("express")
const router = express.Router();
const conn = require('../lib/database')
const parseUrl = require('body-parser');


let encodeUrl = parseUrl.urlencoded({ extended: false });

router.get('/register', function (req, res, next) {
    res.render('register', {

        title: 'Registration Page',
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        password: ''

    })
});

router.post('/register', encodeUrl, (req, res) => {

    //No errors were found.  Passed Validation!
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let userName = req.body.userName;
    let password = req.body.password;


    if (err) {
        console.log(err);
    };
    // checking user already registered or not
    conn.query(`SELECT * FROM user_details WHERE username = '${userName}' AND password  = '${password}'`, function (err, result) {
        if (err) {
            console.log(err);
        };
        if (Object.keys(result).length > 0) {
            res.sendFile(__dirname + '/failreg.html');
        } else {
            // inserting new user data
            let sql = `INSERT INTO user_details (email_add, first_name,last_name, username, password) VALUES ('${email}', '${firstName}','${lastName}', '${userName}', '${password}')`;
            conn.query(sql, function (err, result) {
                if (err) {
                    req.flash('error', err)

                    res.render('auth/register', {
                        title: 'Registration Page',
                        email: '',
                        firstName: '',
                        lastName: '',
                        userName: '',
                        password: ''
                    })
                } else {
                    req.flash('success', 'You have successfully signup!');
                    res.redirect('/login');
                    
                                };
            });

        }

    });

});

//display login page
router.get('/login', function(req, res,next){    
    res.render('login', {
        title: 'Login',
        userName: '',
        password: ''     
    })
});

//authenticate user
router.post('/authentication', function(req, res,next) {
      
    let user_name = req.body.userName;
    let user_password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM user_details WHERE username = ? AND password = ?', [user_name, user_password], function(err, rows, fields) {
            if(err) throw err;
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Please enter the correct username and Password!')
                res.redirect('/login')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                req.session.loggedin = true;
                req.session.name = rows[0].name;
                res.redirect('/home');

            }   
                     
       
        })
    }else {
            response.send('Please enter Username and Password!');
            response.end();
        }
 
});

router.get('/home', function(req, res, next) {
    if (req.session.loggedin) {
        
        res.render('auth/home', {
            title:"Dashboard",
            name: req.session.name,     
        });

    } else {

        req.flash('success', 'Please login first!');
        res.redirect('/login');
    }
});

// Logout user
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.clearCookie('session');
  res.redirect('/login');
});


module.exports = router;