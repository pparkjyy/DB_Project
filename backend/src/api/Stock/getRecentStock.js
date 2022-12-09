import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/getRecentStock", auth);
  app.use("/getRecentStock", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "select code, stock_name name , n_price price, (n_price-e_price)/e_price*100 rate from STOCK_UC natural join stock_p natural join stock where id =? and date='2022-12-08' order by time DESC LIMIT 0, 5;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};