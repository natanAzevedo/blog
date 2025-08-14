import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            console.log("MongoDB already connected");
            return;
        }
        
        const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://natanaelfreitas:bnfreitas2025@cluster0.mqkipaj.mongodb.net/blog-app1';
        
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        // Don't throw error to prevent app crash
        console.log("App will continue without database connection");
    }
};

export default dbConnect;
