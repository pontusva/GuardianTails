import express from 'express';
import cors from 'cors';
import dbInitFunction from './models/index';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.routes';
import { userAuthRoutes } from './routes/user.routes';
const app = express();
dotenv.config();
var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
const db = dbInitFunction();
const Role = db && db.role;

db && db.sequelize.sync();
db && db.sequelize.sync();

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

authRoutes(app);
userAuthRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
