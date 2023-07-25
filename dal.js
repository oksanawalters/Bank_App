const { MongoClient } = require('mongodb');
const url = "mongodb+srv://owalters2015:qiPnNvjiBwB19LYu@cluster0.wy15pea.mongodb.net/?retryWrites=true&w=majority";
let db = null;
const jwt = require('jsonwebtoken');

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log("Connected successfully to db server");
  // connect to myproject database
  db = client.db('myproject');

  // Create the 'users' collection if it doesn't exist
  db.createCollection('users', function (err, result) {
    if (err) {
      console.error('Error creating collection:', err);
      return;
    }
    console.log("Collection 'users' created successfully!");
  });
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}


// make deposit
function makeDeposit(email, deposit) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        collection.findOneAndUpdate(
            { email: email },
            { $inc: { balance: deposit } },
            { returnOriginal: false },
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.value);
                }
            }
        );
    });
}

// make withdraw
function makeWithdraw(email, withdraw) {
    return new Promise((resolve, reject) =>{
        const collection = db.collection('users');
        collection.findOneAndUpdate(
            { email: email },
            { $inc: { balance: withdraw } },
            { returnOriginal: false },
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.value);
                }
            }
        );
    });
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


// check if loggedIN
function checkLogin(email, password) {
    return new Promise((resolve, reject) => {
        const userInfo = db.collection('users');
        const loginDetails = { email, password };
        userInfo.findOne(loginDetails, (error, user) => {
            if (error) {
                reject(error);
            } else if (user) {
                const { name: userName, balance: userBalance, email: userEmail, password: userPassword } = user;
                const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '2h' });
                resolve({token, userName, userBalance, userEmail, userPassword});
            } else {
                reject(new Error('login failed'));
            }
        });
    });
}


module.exports = {create, makeDeposit, makeWithdraw, all, checkLogin};
