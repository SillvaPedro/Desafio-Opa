const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://pedrodev:Paraiba123456@cluster0.khypl.mongodb.net/api-nodejs-mongodb?retryWrites=true&w=majority&appName=Cluster0", {
        });
        console.log('Mongodb Conectado');
    }   catch (err) {
        console.error("falha ao autenticar com mongodb", err);
    }
}

connectToDatabase();

mongoose.Promise = global.Promise;

module.exports = mongoose;