import express, { application } from "express";
import cors from "cors";
import { init } from "./config/db.js";
import test from "./api/test.js";
import dis from "./api/User/dis.js";
import login from "./api/User/login.js";
import adminLogin from "./api/Admin/adminLogin.js";
import getuserdata from "./api/User/getuserdata.js";
import register, { id_check } from "./api/User/register.js";
import risingRate from "./api/stock/risingRate.js";
import fallingRate from "./api/stock/fallingRate.js";
import volume from "./api/Stock/volume.js";
import marketCap from "./api/Stock/marketCap.js";
import getbankacc from "./api/User/getbankacc.js";
import getstockdata from "./api/User/getstockdata.js";
import allstockdata from "./api/Stock/allstockdata.js";
import allstockprice from "./api/Stock/allstockprice.js";
import calculatestock from "./api/User/calculatestock.js";
import favoritestock from "./api/User/favoritestock.js";

const connection = init();
const app = express();

let corsOption = {
  origin: "http://localhost:3000", // 허락하는 요청 주소
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};
app.use(cors(corsOption)); // CORS 미들웨어 추가
app.use(
  express.json({
    limit: "1000mb",
  })
);

app.use(express.static("public"));

const router = express.Router();

app.set("port", process.env.PORT || 4000);

test(app, connection);
getuserdata(app, connection);
login(app, connection);
adminLogin(app, connection);
register(app, connection);
id_check(app, connection);
risingRate(app, connection);
fallingRate(app, connection);
volume(app, connection);
marketCap(app, connection);
dis(app, connection);
getbankacc(app, connection);
getuserdata(app, connection);
getstockdata(app, connection);
allstockdata(app, connection);
allstockprice(app, connection);
calculatestock(app, connection);
favoritestock(app, connection);

app.listen(app.get("port"), () => {
  console.log("Port : " + app.get("port"));
});
