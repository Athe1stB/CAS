const mongoose = require('mongoose');
const schema = require('./schema');

mongoose.connect('mongodb://localhost:27017/cas');

let faculty = mongoose.model('faculty', schema.facultySchema);

let addFaculty = (data, res) => {
    let newFaculty = new faculty(data);
    newFaculty.save((err) => {
        if (err)
            res.send("Error: " + JSON.stringify(err));
        else
            res.send("Successfully added new Faculty");
    });
};

let getSelectedPreferences = async (data) => {
    let result = await faculty.find({
        _id: data
    });

    let selectedArr = [];

    if (result.length !== 0)
        for (let i = 0; i < 5; i++)
            selectedArr.push(result[0]['preference_' + i]);

    return selectedArr;
};

let updatePreferences = (data, res) => {
    let id = data._id;

    let newData = JSON.parse(JSON.stringify(data));
    delete newData._id;

    faculty.updateOne({
        _id: id
    }, newData, (err) => {
        if (!err)
            res.send("User updated successfully!");
        else
            res.send("Error: " + JSON.stringify(err));
    });
};

let checkFaculty = async (userName, pass) => {
    console.log(userName, pass);
    let results = await faculty.find({
        _id: userName,
        password: pass
    });
    if (results.length === 0)
        return false;
    else
        return true;
};

//exports
exports.getSelectedPreferences = getSelectedPreferences;
exports.updatePreferences = updatePreferences;
exports.checkFaculty = checkFaculty;
exports.addFaculty = addFaculty;