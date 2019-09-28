const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    requests: [{
        request: { type: Schema.Types.ObjectId, ref: 'Requests' }
    }],
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['Client', 'Operator', 'Worker'],
        default: 'Client'
    },
    phone: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

// exporting the schema
module.exports = mongoose.model('User', schema);