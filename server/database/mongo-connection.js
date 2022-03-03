import mongoose from 'mongoose';

const dbUri =
    process.env.NODE_ENV === 'development' ? process.env.DATABASE_URL_LOCAL : process.env.DATABASE_URL_PRODUCTION;

const provenDB = await mongoose.createConnection(dbUri, {
    useUnifiedTopology: true
});

export { provenDB };
