import dotenv from "dotenv";
dotenv.config(); //loading ke liye use hota hai
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { connectdb } from "./config/db.js";
import UserRouter from "./User/Route/UserRoute.js";
import ProductRouter from "./ProductManagement/Route/ProductRoute.js";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json()); //text ko json mai contvert karta hai
app.use(express.urlencoded({ extended: true })); //yaha image
app.get("/", (req, res) => {
  res.send("hello");
});
//  API
app.use('/',UserRouter)
app.use("/",ProductRouter)
const port = process.env.PORT || 3000; //agar env load nhi hu tau

connectdb().then(()=>{
  app.listen(5000, () => {
  console.log(`server running: ${port}`);
});

})