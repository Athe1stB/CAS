let courseList = require('../constants').courseList;
let db = require('../db/db');

let currentUser = null;

function makeUserNameFromEmail(email) {
    for (let i = 0; i < email.length; i++)
        if (email[i] == '@')
            return email.substring(0, i);
}

let preferencePost = async (req, res) => {
    req.body._id = currentUser;

    if (currentUser === null)
        res.render('faculty/login');

    // check for no duplicates
    let found = false;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < i; j++)
            if (req.body['preference_' + j] === req.body['preference_' + i])
                found = true;
        for (let j = i + 1; j < 5; j++)
            if (req.body['preference_' + j] === req.body['preference_' + i])
                found = true;
    }
    if (found) {
        res.render('faculty/preference', {
            user: currentUser,
            courseList: courseList,
            errorMsg: "Error : Murltiple preferences with same value. Try again",
            selectedPreferences: await db.getSelectedPreferences(currentUser)
        });
    } else {
        db.updatePreferences(req.body, res);
    }
}

let preferenceGet = async (req, res) => {
    if (currentUser === null)
        res.render('faculty/login');
    else
        res.render('faculty/preference', {
            user: currentUser,
            courseList: courseList,
            errorMsg: "",
            selectedPreferences: await db.getSelectedPreferences(currentUser)
        });
};

let facultyLoginPost = async (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;

    // check if authenticated or not
    let result = await db.checkFaculty(userName, password);
    if (result) {
        currentUser = userName;
        res.render('faculty/preference', {
            user: userName,
            courseList: courseList,
            errorMsg: "",
            selectedPreferences: await db.getSelectedPreferences(userName)
        });
    } else
        res.redirect('signup');
};

let facultyLoginGet = (req, res) => {
    res.render('faculty/login');
}

let facultySignUpGet = (req, res) => {
    res.render('faculty/signup');
};

let facultySignupPost = (req, res) => {
    let obj = JSON.parse(JSON.stringify(req.body));
    obj._id = makeUserNameFromEmail(obj.email);
    db.addFaculty(obj, res);
};

//exports
exports.preferencePost = preferencePost;
exports.preferenceGet = preferenceGet;
exports.facultyLoginPost = facultyLoginPost;
exports.facultyLoginGet = facultyLoginGet;
exports.facultySignUpGet = facultySignUpGet;
exports.facultySignupPost = facultySignupPost;