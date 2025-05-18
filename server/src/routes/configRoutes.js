const indexR = require("./index");
const usersR = require("./users");
//const cookiesR = require("./cookies");
const instrumentsR = require("./instruments");
const shoppingBasketR = require("./shoppingBasket");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR); //משתמשים
  //app.use("/categories", categoriesR);
  //app.use("/cookies", cookiesR);
  //app.use("/upload", uploadR);
  app.use("/instruments", instrumentsR);//מוצרים
  app.use("/shopping_basket", shoppingBasketR);//סל קניות
};
