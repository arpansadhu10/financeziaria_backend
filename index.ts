import  express from "express";
import 'dotenv/config'
import router from "./src/routes";
import connect from "./src/createMongooseConnection";

const app=express();
connect();
app.listen(process.env.PORT,()=>{console.log(
  `Server is running at port ${process.env.PORT}`
)});

app.use('/api', router);
