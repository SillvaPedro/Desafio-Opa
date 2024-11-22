const mongoose = require("../database");

const bcryptjs = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    }
});

UserSchema.pre("save", async function(next) {
    const hash = await bcryptjs.hash(this.password, 15);
    this.password = hash;
})


const User = mongoose.model("User", UserSchema);

module.exports = User;