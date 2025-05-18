const express = require("express");
const path = require("path");
const { auth } = require("../middlewares/auth");
const { ToyModel } = require("../models/toyModel");
// פונקציה מיוחדת שהכנתי שמקצרת את כל תהליך העלאת הקובץ
const {monkeyUpload} = require("../functions/fileupload")
const router = express.Router();

router.get("/", async(req,res) => {
  res.json({msg:"upload work!"})
})

router.post("/test", async(req,res) => {
  try{
    // השם של הקיי שיכיל את הקובץ שנשלח
    const myFile = req.files?.myFile;
    if(!myFile){
     return res.status(400).json({err:"you need to send file with the key 'myFile' "})
    } 
    console.log(myFile);
    // משתנה שיכיל את הסיומת של הקובץ שהעאלנו
    let extFile = path.extname(myFile.name)
    // סיומות שמאפשר לעלות אותם
    let allowes_exts = [".jpg",".jpeg",".png",".svg",".gif",".psd"]
    // בודק אם הסיומת לא מופיעה ברשימה
    if(!allowes_exts.includes(extFile)){
      return res.status(400).json({err:"try upload valid file of image like jpg , png , gif or svg"})
    }
    // בודק שמשקל הקובץ לא גבוה מ5 מב
    if(myFile.size >= 1024 * 1024 * 5){
      return res.status(400).json({err:"file too big, max 5 mb"})
    }
    let newFileName = Date.now()+extFile
    let domainFile = `toys_images/${newFileName}`

    // mv -> פקודת העלאת קובץ שקיבלנו מהצד לקוח
    // פרמטר ראשון לאן לעלות בשרת
    // פרמטר שני פונקציית קול בק שמקבל פרמטר אירור
    myFile.mv("public/"+domainFile, (err) => {
      if(err){return res.status(400).json(err)}
      res.json({msg:"file uploaded"})
    })
    // myFile.mv("public/toys_images")
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})



router.post("/toys/:toys_id", auth, async(req,res) => {
  try{
    // אם האיי די של הרשומה שאני רוצה לעלות אליה קובץ 
    // אכן שייכת למשתמש
    let toys_id = req.params.toys_id;
    let toy = await ToyModel.findOne({_id:toys_id,user_id:req.tokenData._id})
    // בודק שגם האיי די בכלל קיים וגם שהאיי די שייך למשתמש שמנסה לעלות את הקובץ
    if(!toy){
      return res.status(400).json({err:"Toy id not found"})
    }

    // השם של הקיי שיכיל את הקובץ שנשלח
    const myFile = req.files?.myFile;
    if(!myFile){
     return res.status(400).json({err:"you need to send file with the key 'myFile' "})
    } 
    console.log(myFile);
    // משתנה שיכיל את הסיומת של הקובץ שהעאלנו
    let extFile = path.extname(myFile.name)
    // סיומות שמאפשר לעלות אותם
    let allowes_exts = [".jpg",".jpeg",".png",".svg",".gif",".psd"]
    // בודק אם הסיומת לא מופיעה ברשימה
    if(!allowes_exts.includes(extFile)){
      return res.status(400).json({err:"try upload valid file of image like jpg , png , gif or svg"})
    }
    // בודק שמשקל הקובץ לא גבוה מ5 מב
    if(myFile.size >= 1024 * 1024 * 5){
      return res.status(400).json({err:"file too big, max 5 mb"})
    }
    let newFileName = Date.now()+extFile
    let domainFile = `toys_images/${newFileName}`

    // mv -> פקודת העלאת קובץ שקיבלנו מהצד לקוח
    // פרמטר ראשון לאן לעלות בשרת
    // פרמטר שני פונקציית קול בק שמקבל פרמטר אירור
    myFile.mv("public/"+domainFile, async(err) => {
      if(err){return res.status(400).json(err)}
      let data = await ToyModel.updateOne({_id:toys_id},{img_url:domainFile})
      res.json({msg:"file uploaded",data,domainFile})
    })
    // myFile.mv("public/toys_images")
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


router.post("/monkeys_test", async(req,res) => {
  let domainFile = `toys_images/${Date.now()}`
  try{
    const data = await monkeyUpload(req,"myFile",domainFile,5,[".png",".jpg",".gif"]);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }

})

module.exports = router;