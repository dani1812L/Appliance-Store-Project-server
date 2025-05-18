// לבדיקה בלבד והבנה איך קוקיס עובד

const express = require("express");
const router = express.Router();

router.get("/", async(req,res) => {
  res.json({msg:"cookies work!"})
})

router.get("/check", async(req,res) => {
  // בודק אם קיים קוקי בזכרון של המחשב של המשתמש בשם
  // מיי קוקי 3
  if(req.cookies["myCookie3"]){
    return res.cookie("").json({msg:req.cookies["myCookie3"]})
  }
  else{
    return res.status(400).json({msg:"no cookie"})
  }
})

router.get("/test", async(req,res) => {
  // res.cookie - שומר קוקי בצד לקוח
  // מקבל 3 פרמטרים
  // פרמטר א' - השם של הקיי של הקוקי
  // פרמטר ב' - הערך שישמר בתוך הקוקי שחייב להיות סטרינג
  // פרמטר ג' - אופשנס , 
  // httpOnly - שיעבוד בבדיקות בפוסטמן
  // expires- הפג תוקף , הזמן של עכשיו פלוס כמה מילי שניות קדימה
  res.cookie("myCookie3","vanila cake 555",{
    httpOnly:false,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
  }

  ).json({msg:"cookies saved"})
})

router.delete("/delete", async(req,res) => {
  // מחקית קוקי בשיטה כלילה
  res.clearCookie("myCookie3")
  .json({
    msg:"cookie deleted 222222"
  })
  
  // מחקית קוקי על ידי שלחית קוקי עם זמן עבר
  // res.cookie("myCookie3","",{
  //   httpOnly:false,
  //   expires: new Date(Date.now() - 999999 )
  // }

  // ).json({msg:"cookie deleted"})
})

module.exports = router;