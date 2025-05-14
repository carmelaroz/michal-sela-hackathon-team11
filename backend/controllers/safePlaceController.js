const SafePlace = require('../models/SafePlace');

const getId = (id) => {
    return id? new mongoose.Types.ObjectId(id): '';
}
const deletePlace = async (req, res) => {
    const {id, userId} = req.params
    const updatedId = getId(id)
    if (!mongoose.Types.ObjectId.isValid(updatedId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
    try {
        const result = await SafePlace.deleteOne({ _id: updatedId, submittedBy: userId})
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Place not found or already deleted.' });
        }
    
        return res.status(200).json({ message: 'Place deleted successfully.' });
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting Place', error: error.message });
      }

    }


const getPlace = async (req, res) => {
        const { id } = req.params;
        const updatedId = getId();
        if (!mongoose.Types.ObjectId.isValid(updatedId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
          }
          
        try {
          const result = await SafePlace.findById(updatedId);
      
          if (!result) {
            return res.status(404).json({ message: 'Place not found or already deleted.' });
          }
      
          return res.json(result);
        } catch (error) {
          return res.status(500).json({ message: 'Error retrieving Place', error: error.message });
        }
};


//patch/post
const updatePlace = async(req, res) => {
    const {id, userId} = req.params
    const updatedId = getId(id)
    const { data } = req.data

     
    if(mongoose.Types.ObjectId.isValid(updatedId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }

    try {
        const result = await SafePlace.findOneAndUpdate({ _id: updatedId, submittedBy: userId }, data,  { new: true })
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Place not found or already deleted.' });
        }
        return res.status(200).json({ message: 'Place deleted successfully.' });
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting Place', error: error.message });
      }
      
   }


module.exports = {
    updatePlace,
    deletePlace,
    getPlace,
  };