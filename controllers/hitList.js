const HitList = require('../models/hitlist')
const User = require('../models/User')


module.exports = {
  
    createHitList: async (req)=>{
        try{
            console.log('is user known from createHitlist:')
            console.log(req.user)
            await HitList.create({
                current: 60,
                userId: req.user.id})
            // const createdHitlist = await HitList.find({userId: req.user.id})
            
            // console.log('Hitlist has been created!', createdHitlist)
            // res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },

    hitListUp: async (req, res)=>{

        try{
            await HitList.findOneAndUpdate({userId:req.user.id},{$inc : {'current' : 1}})
                
            console.log('HitList Count Up')
            res.json('HitList count Up')
        }catch(err){
            console.log(err)
        }
    },
    hitListDown: async (req, res)=>{
        try{
            await HitList.findOneAndUpdate({userId:req.user.id},{$inc : {'current' : -1}})
            
            console.log('HitList decrease')
            res.json('HitList decrease')
        }catch(err){
            console.log(err)
        }
    },

}