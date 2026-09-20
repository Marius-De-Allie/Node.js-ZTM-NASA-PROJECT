const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://nodeUser:June526try258%3F@cluster0.looj9yl.mongodb.net/?appName=Cluster0';

mongoose.connection.once("open", () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL, /*{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }*/);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};

