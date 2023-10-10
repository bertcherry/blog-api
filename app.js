const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DEV_DATABASE), { useUnifiedTopology: true, useNewUrlParser: true };
}