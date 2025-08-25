import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            console.log("MongoDB already connected");
            return;
        }
        
        const mongoUri = process.env.MONGODB_URI;  
      
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
       
        console.log("App will continue without database connection");
    }
};

export default dbConnect;
