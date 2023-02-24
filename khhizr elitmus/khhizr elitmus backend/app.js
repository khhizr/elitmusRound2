const express = require('express');
const app = express();
const mongoose = require('mongoose');

MONGO_URI="mongodb+srv://khhizr:asdf1234@cluster0.lkqdd68.mongodb.net/?retryWrites=true&w=majority"

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  id: String,
  photo: String,
  timestamp: Date,
});

// Define user model
const UserModel = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Endpoint to receive user data
app.post('/user/add', (req, res) => {
  const { name, email, id } = req.body;
  const photo = req.body.screenshot.split(',')[1]; // to get the encoded image string 
  const timestamp = new Date().toISOString();
  const data = { name, email, id, photo, timestamp };
 
  const user = new UserModel(data);
  user.save()
    .then(() => {
      console.log('User data saved successfully');
      res.send('User data saved successfully');
    })
    .catch((err) => {
      console.log('Error saving user data:', err);
      res.status(500).send('Internal server error');
    });
});

// endpoint to return the user data
app.get('/user/:name', (req, res) => {
  const name = req.params.name;
  UserModel.find({ name }, (err, users) => {
    if (err) {
      console.log('Error retrieving user data:', err);
      res.status(500).send('Internal server error');
    } else {
      console.log('Retrieved user data:', users);
      res.send(users);
    }
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
