let facultySchema = {
    _id: {
        type: String,
        required: [true, 'id not provided'],
    },
    password: {
        type: String,
        required: [true, 'password not provided']
    },
    name: String,
    preference_0: String,
    preference_1: String,
    preference_2: String,
    preference_3: String,
    preference_4: String,
};

let userSchema = {name: String};

exports.facultySchema = facultySchema;
exports.userSchema = userSchema;