const mongoose = require('mongoose')

const database_url = process.env.DB_CONNECTION_URI;

 const connect = () => {
    mongoose.connect(database_url, {
        useNewUrlPArser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB CONNECTED successfully");
    })
        .catch((error:any) => {

            console.log("DB connection failure");
            console.log(error);
            process.exit(1);
        })
} 

export default connect;