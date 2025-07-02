const express=require('express');
const router=express.Router();
const user=require('../models/user');

router.post('/', async(req,res) => {

    try{
         
        const data=new user(req.body);
        const saveData=data.save();

        res.status(201).json(saveData);
       
    }
    catch(err){
        res.status(500).json({error:err.message});
    }


});

router.get('/', async(req,res) => {

    try{
         const users=await user.find();
         res.json(users);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }

});

router.put('/:id',async(req,res) => {
    try{

        const UpdatedUser= await user.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(UpdatedUser);
    }
    catch(err)
    {
        res.status(400).json({error:err.message});
    }
})

router.delete('/:id',async(req,res) => {
    try{
        await user.findByIdAndDelete(req.params.id);
        res.json({message:'User Deleted'});
    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }
    
})


module.exports=router;