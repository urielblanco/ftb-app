import mongoose from 'mongoose';

const dbUri =
    process.env.NODE_ENV === 'development' ? process.env.DATABASE_URL_LOCAL : process.env.DATABASE_URL_PRODUCTION;

const provenDB = await mongoose.createConnection(
    dbUri,
    {
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log(`ProvenDB: ${err}`);
            return;
        }

        console.log('Connected with DB...');
    }
);

export { provenDB };
