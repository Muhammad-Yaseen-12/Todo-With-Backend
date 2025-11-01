import mongoose from "mongoose";
import 'dotenv/config'
// import 'dotenv'
const url = `${process.env.MONGO_URL}`

mongoose.connect(url);

export default mongoose;