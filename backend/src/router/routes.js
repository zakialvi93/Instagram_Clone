const routes = require("express").Router();
const { authenticate } = require("../controller/jwt.controller");
const userController = require("../controller/user.controller");

routes.post("/signup", userController.signup);
routes.post("/signin", userController.signin);

routes.use("/actions", authenticate);

routes.post("/actions/follow", userController.follow);
routes.post("/actions/unfollow", userController.unfollow);
routes.post("/actions/getfollowers", userController.getfollowers);
routes.post("/actions/getfollowing", userController.getfollowing);
routes.post("/actions/search", userController.search);




module.exports = routes;
