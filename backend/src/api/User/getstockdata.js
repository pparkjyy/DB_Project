import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/getstockdata", auth);
  app.use("/getstockdata", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "SELECT * FROM stock_u WHERE id = ?;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};