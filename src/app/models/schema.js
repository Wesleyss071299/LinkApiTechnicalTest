const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    idRequest: { type: String, required: true, unique: true },
    seller: { type: String, required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    description: { type: String, required: true },
    idProduct: { type: String, required: true },
    quantity: { type: Number, required: true },
    value: { type: Number, get: getValue, set: setValue, required: true },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

function getValue(num) {
    return (num / 100).toFixed(2);
}
function setValue(num) {
    return num * 100;
}

module.exports = mongoose.model('Opportunity', schema);
