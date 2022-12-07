import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/getbankacc", auth);
  app.use("/getbankacc", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "SELECT A_NUM FROM USER_A WHERE id = ?;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};
