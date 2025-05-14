const SafePlace = require('../models/SafePlace');

exports.getAllSafePlaces = async (req, res) => {
    try {
        const safePlaces = await SafePlace.find({ isApproved: true });
        res.json(safePlaces);
    } catch (error) {
        console.error("Error fetching safe places:", error);
        res.status(500).json({ message: "Server error" });
    }
};