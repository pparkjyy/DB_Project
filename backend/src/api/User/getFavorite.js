import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/getFavorite", auth);
  app.use("/getFavorite", async (req, res, next) => {
    const { stockcode } = req.query;
    const { id } = req.query;
    await connection.query(
      "SELECT code FROM STOCK_UZ WHERE id = ?;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        for (var i = 0; i < data.length; i++)
          if (data[i].code == stockcode) return res.send(true);
        return res.send(false);
      }
    );
  });
};
