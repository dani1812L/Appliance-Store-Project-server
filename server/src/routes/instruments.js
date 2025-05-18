const express = require("express");
const { InstrumentsModel} = require("../models/instrumentsModel");
const {validateInstrumentsModel}=require("../validation/instrumentsValidation");
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    let data = await InstrumentsModel.find({});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

// של מוצר ID מביא לי מוצר ספציפי לפי 
router.get("/single/:id", async(req,res) => {
  try{
    const id = req.params.id
    let data = await InstrumentsModel.findOne({_id:id});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/", async(req,res) => {
  let validBody = validateInstrumentsModel(req.body);
  if(validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let instruments = new InstrumentsModel(req.body);
    await instruments.save();
    res.json(instruments)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

router.put("/:id", async(req,res) => {
  let validBody = validateInstrumentsModel(req.body);
  if(validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
   let id = req.params.id;
   let data = await InstrumentsModel.updateOne({_id:id},req.body);
  res.json(data)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})
router.delete("/:id", async(req,res) => {
  try {
    let id = req.params.id;
    let data = await InstrumentsModel.deleteOne({_id:id} );
    res.json(data)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

module.exports = router;