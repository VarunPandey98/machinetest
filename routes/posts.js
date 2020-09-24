var mongoose = require('mongoose');
const express= require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const Testscore = require('../models/Testscore');


// To add testscore
router.post('/testscore/add', async (req,res)=>{
    //console.log("The data is ", req.body);
    const post =new Testscore({
        testscore_uuid:req.body.testscore_uuid,
        candidate_uuid:req.body.candidate_uuid,
        testscore_round_name:req.body.testscore_round_name,
        testscore_score:req.body.testscore_score
    });
    try{
       const savedPost = await post.save();
       console.log(savedPost);
       res.json(savedPost);
    }catch (err){
       res.json({"message":err});
    }
})
// To add candidate

router.post('/candidate/add', async (req,res)=>{
    const post =new Candidate({
        candidate_uuid:req.body.candidate_uuid,
        candidate_name:req.body.candidate_name,
        candidate_email:req.body.candidate_email,
        candidate_address:req.body.candidate_address
    });
    try{
       const savedPost = await post.save();
       console.log(savedPost);
       res.json(savedPost);
    }catch (err){
       res.json({"message":err});
    }
});

//List of studentscore
router.get('/testscore/list',async (req,res)=>{
    try{
        const posts = await Testscore.find();
        console.log(posts);
        res.json(posts);
    }catch (err){
        res.json({"message":err});
    }
});


//Get Highest Mark
router.get('/testscore/highest', (req,res)=>{
    findQuery = Testscore.find().sort({testscore_score : -1}).limit(1);
   
    findQuery.exec(function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log(findQuery);
            res.json(data);
        }
    }) 
});


//Get Average Mark
router.get('/testscore/average', (req,res)=>{
    findQuery = Testscore.aggregate(
    [{
        $group:
            {
            _id: "$candidate_uuid",
            average_score: { $avg: "$testscore_score" }
            }
        }]
    )
   
    findQuery.exec(function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log(findQuery);
            res.json(data);
        }
    }) 
});


//Update student Record
router.post('/testscore/update', (req,res)=>{

    const query =  Testscore.findByIdAndUpdate({_id:req.body._id}, req.body, {new:true});
    query.exec(function(err,updatedData){
        if(err){
            console.log(err);
        }else{
            res.json(updatedData);
        }
    })
    
});


router.get('/testscore/:postId', (req,res)=>{

    const query = Testscore.findOne({candidate_uuid:req.params.postId})
    query.exec(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.json(data);
        }
    }) 
    
});

module.exports=router;