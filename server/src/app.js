// ספריית אקספרס עם כל היכולות
const express = require("express");
// מבצע מינפולציות על כתובות אינטרנט 
const path = require("path");
// ספרייה שיודעת להפעיל שרת
const http = require("http");
// כדי שנוכל לעבוד עם קוקיס ששומר מידע בצד לקוח
const cookieParser = require("cookie-parser");
// קורס מאפשר לכל דומיין לגשת לשרת שלי
const cors = require("cors")
// מאפשר העלאת קבצים על ידי משתמשים
const fileUpload = require("express-fileupload");

const {routesInit} = require("./routes/configRoutes")
require("./db/mongoConnect");

const app = express();

// origin:true,
  // credentials:true - שידע לתמוך בקוקיס מדומיין אחר
app.use(cors({
  origin:true,
  credentials:true
}))

// מאפשר העלאת קבצים
app.use(fileUpload({
  // מגביל שקבצים לא יוכלו להיות גדולים מ5 מב
  limits:{fileSize: 1024 * 1024 * 5}
}))

// שאקספרס יכיר את היכולת להשתמש בקוקיס
app.use(cookieParser());

app.use(express.json());
// מגדיר שתקיית פאבליק וכל הקבצים בה יהיו ציבוריים
app.use(express.static(path.join(__dirname, "public")));
// פונקציה שאחראית להגדיר את כל הרואטים שנייצר באפלקציית שרת
routesInit(app);


const server = http.createServer(app);
// בודק באיזה פורט להריץ את השרת  , אם בשרת אמיתי אוסף
// את המשתנה פורט מהסביבת עבודה שלו ואם לא 3001
const port =  3001;
server.listen(port, () => { console.log(`Server is running and listening on port ${port}`); });