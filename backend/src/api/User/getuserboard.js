import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/getuserboard", auth);
  app.use("/getuserboard", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "select * from U_BOARD where id = ?",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};