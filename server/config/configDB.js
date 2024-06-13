import mongoose from "mongoose";


const connectingDB =async () => {
    let URI = process.env.DB_CONECTTION || "mongodb://0.0.0.0:27017";
    let DB_NAME = process.env.DB_NAME || "Nursery";
    try{
        let connect= await  mongoose.connect(`${URI}/${DB_NAME}`);
        console.log(`conecting to mongoDB on host ${connect.connection.host} :)`)
    }
    
        catch{(err) => {
            console.log("can not connect :(")
            console.error(err);
            process.exit(1);
        }}
}

export default connectingDB;