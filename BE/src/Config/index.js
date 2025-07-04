import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed', error);
    }
}

export default connect;