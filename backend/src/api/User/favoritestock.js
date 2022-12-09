import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/favoritestock", auth);
  app.use("/favoritestock", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "select code, stock_name, n_price, (n_price-e_price)/e_price*100 전일대비비율, price_count from stock_uz natural join stock natural join stock_p natural join company where id = ? and date='2022-12-08' group by code",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};