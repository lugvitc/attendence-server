import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import User from "./models/User.js";
import userRouter from "./routes/auth.js";

import { login,users,register} from "./controllers/auth.js";
/* CONFIGURATIONS */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  next();
})

app.use(express.json());
app.use(userRouter);
/* ROUTES */
// const router = express.Router();
// router.use(express.json());

// router.get("/",(req,res)=>{
  // res.send("helllo localhusr");
// })
// router.post("/users",register)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/attendence');
    console.log('Database connected on port 27017 !');
}
app.listen(PORT,()=>{
  console.log(`Database connected at Port : ${PORT}`);
})



// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

//     // /* ADD DATA ONE TIME */
//     // User.insertMany(users);
//     // Post.insertMany(posts);
//   })
//   .catch((error) => console.log(`${error} did not connect`));

// mongoose
//   .connect("mongodb://127.0.0.1:27017/attendence", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log(`Database connected at Port : ${PORT}`);
//   })
//   .catch(err => {
//     console.log("Could not connect", err);
//   });

  // console.log(`Database connected at Port : ${PORT}`);