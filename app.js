const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

mongoose.set('strictQuery', false);
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DEV_DATABASE), { useUnifiedTopology: true, useNewUrlParser: true };
}

const app = express();

app.use(cors());

app.listen(process.env.PORT, () => 
    console.log(`Listening on port ${process.env.PORT}`),
);