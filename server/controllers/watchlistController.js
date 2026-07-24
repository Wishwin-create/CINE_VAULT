import User from '../models/User.js';

export const getWatchlist = async(req , res)=>{

try{
    const user = await User.findById(req.user._id).populate('watchlist');
    res.json(user.watchlist);
}catch(err){
    console.error('Get watchlist error:',err);
    res.status(500).json({error: 'Failed to fetch watchlist'});
}
};

export const addToWatchlist = async(req,res) =>{
    try{
        const {mediaId} = req.params;
        const user = await User.findById(req.user._id);

    if(user.watchlist.includes(mediaId)){
        return res.status(409).json({error: 'Already in watchlist'});
    }

    user.watchlist.push(mediaId);
    await user.save();

    res.status(201).json({message: 'Added to watchlist'});
    } catch(err){
        console.error('Add to watchlist error:',err);
        res.status(500).json({error: 'Failed to add to watchlist'});
    }
};

export const removeFromWatchlist = async (req, res) => {
    try{
        const {mediaId} = req.params;
        const user = await User.findById(req.user._id);

        user.watchlist = user.watchlist.filter((id) => id.toString() !== mediaId);
        await user.save();

        res.json({message : 'Removed from watchlist'});
    }catch(err){
        console.error('Remove from watchlist error : ', err);
        res.status(500).json({error: 'Failed to remove from watchlist'});
    }
};