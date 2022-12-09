import express, { application } from "express";
import cors from "cors";
import { init } from "./config/db.js";
import test from "./api/test.js";
import dis from "./api/User/dis.js";
import login from "./api/User/login.js";
import adminLogin from "./api/Admin/adminLogin.js";
import register, { id_check } from "./api/User/register.js";
import risingRate from "./api/stock/risingRate.js";
import fallingRate from "./api/stock/fallingRate.js";
import volume from "./api/Stock/volume.js";
import marketCap from "./api/Stock/marketCap.js";
import getStockInfo from "./api/Stock/getStockInfo.js";
import getCompanyInfo from "./api/Stock/getCompanyInfo.js";
import getShareholderInfo from "./api/Stock/getShareholderInfo.js";
import getbankacc from "./api/User/getbankacc.js";
import calculatestock from "./api/User/calculatestock.js";
import favoritestock from "./api/User/favoritestock.js";
import usermoneydata from "./api/User/usermoneydata.js";
import usermoneypercent from "./api/User/usermoneypercent.js";
import getuserboard from "./api/User/getuserboard.js";
import getusercomment from "./api/User/getusercomment.js";
import getuserdata from "./api/User/getuserdata.js";
import updateRecentStock from "./api/User/updateRecentStock.js";
import {
  passwordUpdate,
  privateUpdate,
} from "./api/User/userUpdate.js";
import getaboard from "./api/Admin/getaboard.js";
import getaboardpostnum from "./api/Admin/getaboardpostnum.js";
import uploadaboard from "./api/Admin/uploadaboard.js";
import modifyaboard from "./api/Admin/modifyaboard.js";
import getaboardbypostnum from "./api/Admin/getaboardbypostnum.js";
import updateaboardview from "./api/Admin/updateaboardview.js";
import getRecentStock from "./api/Stock/getRecentStock.js";
import getFavorite from "./api/User/getFavorite.js";
import setFavorite from "./api/User/setFavorite.js";
import getStocknum from "./api/User/getStocknum.js";

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
getStockInfo(app,connection);
getCompanyInfo(app, connection);
getShareholderInfo(app, connection);
calculatestock(app, connection);
favoritestock(app, connection);
usermoneydata(app, connection);
usermoneypercent(app, connection);
getbankacc(app, connection);
getuserboard(app, connection);
getusercomment(app, connection);
getuserdata(app, connection);
privateUpdate(app, connection);
passwordUpdate(app, connection);
getaboard(app, connection);
getaboardpostnum(app, connection);
uploadaboard(app, connection);
modifyaboard(app, connection);
getaboardbypostnum(app, connection);
updateRecentStock(app, connection);
updateaboardview(app, connection);
getRecentStock(app, connection);
getFavorite(app, connection);
setFavorite(app, connection);
getStocknum(app, connection);

app.listen(app.get("port"), () => {
  console.log("Port : " + app.get("port"));
});
