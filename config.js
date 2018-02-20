const DB_TYPE = "mongodb"
const DB_NAME = "lending";
const DB_HOST = "localhost";
const DB_PORT = 27017;

const DB_CONN_URL = DB_TYPE+"://"+DB_HOST+":"+DB_PORT+"/"+DB_NAME;

// Period in months
const CHIT_MIN_PERIOD = 12;
// Min amount SME invest 
const CHIT_MIN_AMOUNT = 50000;

module.exports = {
    mongo_url: DB_CONN_URL,
    chit: {
        CHIT_MIN_PERIOD: CHIT_MIN_PERIOD,
        CHIT_MIN_AMOUNT: CHIT_MIN_AMOUNT,
    },
};
