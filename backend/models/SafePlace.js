const mongoose = require('mongoose');
const { Schema } = mongoose;

const safePlaceSchema = new Schema({
    hotelName: String,
    address: String,
    contactName: String,
    contactPhone: String,
    bookingLink: String,
    offeredRoomDescription: String,
    submittedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    isApproved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('SafePlace', safePlaceSchema);