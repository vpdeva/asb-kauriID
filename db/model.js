const Mongoose = require('./connect');

const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    isKycVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    kyc: {
        hash: {
            type: String,
            required: false
        },
        files: {
            type: String,
            required: false
        },
    },
    chits: {
        type: Array,
        maxlength: 5
    },
});

const ChitSchema = new Mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true
    },
    period: {
        type: Number,
        required: true,
    },
    investment_per_sme: {
        type: Number,
        required: true
    },
    sme_count: {
        type: Number,
    },
    status: {
        type: String,
    },
    address: {
        type: String,
        minlength: 42,
        maxlength: 42,
    },
})

// Have to change the model name to dynamic
const userModel = Mongoose.model('user', UserSchema);
const chitModel = Mongoose.model('chit', ChitSchema);

module.exports = {
    userModel: userModel,
    chitModel: chitModel
}
