import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/getStocknum", auth);
  app.use("/getStocknum", async (req, res, next) => {
    const { stockcode } = req.query;
    const { id } = req.query;
    await connection.query(
      "select code, sum(stock_num) stock_num from STOCK_U where id = ? group by code;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        console.log(data, stockcode);
        if(data){
          for (var i = 0; i < data.length; i++)
            if (data[i].code == stockcode) return res.send(data[i]);
        }
        return res.send(null);
      }
    );
  });
};
