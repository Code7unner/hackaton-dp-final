const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    worker: { type: Schema.Types.ObjectId, ref: 'User', default: '5d8f5b01e55c24690cefdf5f' },
    address: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Рассматривается', 'Ожидается', 'Выполняется', 'Выполнено'],
        default: 'Рассматривается'
    },
    request: {
        category: { type: String },
        kind: { type: String }
    },
    feedback: {
        rating: { type: Number, default: 0 },
        review: { type: String, default: "" }
    },
    date: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

// exporting the schema
module.exports = mongoose.model('Requests', schema);