require('dotenv').config()
console.log(process.env.MONGO_URL);
const express = require("express");
const app = express();
const PORT = 5000;
const dbConnect = require("./dbConnect");
const userRouter = require("./routes/User.js");
const ExpressError = require("./Utils/ExpressError");
const cookieParser = require("cookie-parser");
const notesRouter = require("./routes/notes.js");
const cors = require('cors');
dbConnect().then(()=>{console.log("connected to db successfully");}).catch(err=>{console.log("error in connecting to db: "+err)})


app.listen(PORT,()=>{
    console.log(`app is listening to PORT ${PORT}`);
})
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser());
app.use("/auth",userRouter);
app.use("/notes",notesRouter);


app.use((req,res,next)=>{
    throw new ExpressError(404,"page not found");
})

app.use((err,req,res,next)=>{
    let {statusCode=500, message="Some error occcurred"} = err;
    console.log("err: "+err);
    res.status(statusCode).send({errors:{message}});
})