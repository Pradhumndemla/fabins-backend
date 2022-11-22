import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path'
import cors from 'cors'
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import indexRoute from './routes/index.js';
import "./mongoDb.js"

const app = express();
// process.env.NODE_ENV = "production"
// dotenv.config();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: '.env.prod' })
}
else {
    dotenv.config({ path: '.env.dev' })
}
console.log(process.env.MONGO_URL);

const port = process.env.PORT || 4000


// middleware

app.use(cors());
app.use("/assets", express.static(path.join(process.cwd(), "/public/assets")))
app.use(express.static(path.join(process.cwd(), "/public/assets")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);


app.get('/', (req, res) => {
    res.send("api is working");
});

app.get('*', (req, res) => {
    res.send("<h1>404 Error</h1><p>Page Not Found</p>");
})

app.listen(port, () => { console.log(`server is running on ${port}`) })