import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';


// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

const posts = [

]

app.get('/posts', authenticationToken, (req, res) => {
    res.json(posts.filter(post => post.name === req.user.name));
})

app.post('/posts', async (req, res) => {
    try {
        //const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {name : req.body.name, password : hashedPassword };
        posts.push(user);
        res.status(201).send();
    } catch (error) {
        res.status(500).send();
    }

})

app.post('/login', async (req, res) => {
    //user authentication
    const user = posts.find(user => user.name = req.body.name)
    if(user == null){
        return res.status(400).send("Cannot find user")
    }

    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            //res.send('Success');
        }
        else{
            //res.send('Not allowed');
        }
    } catch {
        res.status(500).send()
    }

    //JWT Authorisation
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})

function authenticationToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null)
        return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.get('/', (req, res) => res.send("API Working"));

app.listen(port, ()=> console.log(`Server started on port ${port}`));