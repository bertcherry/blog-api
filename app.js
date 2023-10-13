const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');

mongoose.set('strictQuery', false);
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DEV_DATABASE), { useUnifiedTopology: true, useNewUrlParser: true };
}

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', routes.public);
app.use('/admin', routes.admin);

app.listen(process.env.PORT, () => 
    console.log(`Listening on port ${process.env.PORT}`),
);