import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["1.1.1.1"]);//domain name system
export const connectdb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}Canteen`);
    console.log("MongoDb Connect Successful");
  } catch (error) {
    console.log("MongoDb not Connect Successful");
  }
};
