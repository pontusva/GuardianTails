import express from 'express';
import cors from 'cors';
import dbInitFunction from './models/index';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.routes';
import { userAuthRoutes } from './routes/user.routes';
import { proxyRoutes } from './routes/proxy.routes';
import { aiRoutes } from './routes/ai.routes';

const app = express();
dotenv.config();
var corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors());

app.use(express.json());

const db = dbInitFunction();

db && db.sequelize.sync({ force: false }); // force: true will drop the table if it already exists

authRoutes(app);
userAuthRoutes(app);
aiRoutes(app);
proxyRoutes(app);

/*
  *** IMPORTANT ***
  If all tables are dropped, the script that will reinitialize the roles
  can be found in the devScripts folder.
*/

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*
*** SPECIAL THANKS ***
to BezKoder for the tutorial on how to implement 
JWT authentication in a Node.js Express application.
*/
