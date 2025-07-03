import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/', {
            dbName:"Movies",
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed', error);
    }
}

export default connect;