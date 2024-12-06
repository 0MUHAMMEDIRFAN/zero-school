// mongoose connection
import mongoose from 'mongoose'

function connectDB(DB_URL: string): void {
    try {
        mongoose.connect(DB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,

        })
        console.log("Database Connected");
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;