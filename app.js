// jshint esversion: 6

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const faculty = require('./js/faculty');
const admin = require('./js/admin');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.set("view engine", "ejs");


/*********      Home route        **********/
app.get('/', (req, res) => {
    res.send('hi');
});

/*********      Faculty routes        **********/

// login
app.route('/faculty/login')
    .get(faculty.facultyLoginGet)
    .post(faculty.facultyLoginPost);

// signup
app.route('/faculty/signup')
    .get(faculty.facultySignUpGet)
    .post(faculty.facultySignupPost);

// fill preference
app.route('/faculty/preference')
    .get(faculty.preferenceGet)
    .post(faculty.preferencePost);



/*********      Admin routes        **********/

// login
app.route('/admin/login')
    .get(faculty.facultyLoginGet)
    .post(faculty.facultyLoginPost);

// signup
app.route('/admin/signup')
    .get(faculty.facultySignUpGet)
    .post(faculty.facultySignupPost);

// manage
app.route('/admin/manage')
    .get(faculty.preferenceGet)
    .post(faculty.preferencePost);

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});