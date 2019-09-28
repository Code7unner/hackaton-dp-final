const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    address: { type: String, required: true },
    status: { type: String },
    request: { type: String },
    feedback: {
        rating: { type: Number, default: 0 },
        text: { type: String, default: "" }
    },
    date: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

// exporting the schema
module.exports = mongoose.model('Requests', schema);