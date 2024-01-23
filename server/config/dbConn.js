import mongoose from 'mongoose';

const ConnectDB = async () => {
    const URL = process.env.DATABASE_URI;
    try {
        await mongoose.connect(URL);
    } catch (error) {
        console.log('Error from connection', error.message)
    }
}

export default ConnectDB;