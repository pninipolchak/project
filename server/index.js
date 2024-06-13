import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import  cors  from "cors"

import connectingDB from "./config/configDB.js"
import { catchErrors } from "./middelwares/catchErorrs.js";
import productRouter from "./routes/product.js"
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";



const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


const app = express();

config();

connectingDB();

app.use(morgan("common"));

app.use(express.json());

app.use(cors(corsOptions))
// app.use(cors({ origin: "http://localhost:3000", methods: "*" }))

app.use("/api/products", productRouter);

app.use("/api/users", userRouter);

app.use("/api/orders", orderRouter);


app.use(catchErrors);

let PORT=process.env.PORT||5000;
app.listen(PORT,()=>{console.log(`app is listening on port: ${PORT}`);});