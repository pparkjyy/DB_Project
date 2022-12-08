import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/calculatestock", auth);
  app.use("/calculatestock", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "select (n_price-stock_price)/stock_price * 100 as res from stock_u natural join stock_p where id = ?",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};