import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import serverless from 'serverless-http';
import userRoute from '../routes/users.js';
import authRoute from '../routes/auth.js';
import postRoute from '../routes/posts.js';
import indexRoute from '../routes/index.js';
import "../mongoDb.js";
import "../config.js";


const app = express();
// const port = process.env.PORT || 4000;
const router = express.Router();


// middleware

app.use(cors());
app.use("/assets", express.static(path.join(process.cwd(), "/public/assets")));
app.use(express.static(path.join(process.cwd(), "/public/assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);       
app.use("/posts", postRoute);


router.get('/', (req, res) => {
    res.send("api is working");
});

router.get('*', (req, res) => {
    res.send("<h1>404 Error</h1><p>Page Not Found</p>");
})

app.use('/.netlify/functions/server', router);  // path must route to lambda (express/server.js)
module.exports = app;
module.exports.handler = serverless(app);