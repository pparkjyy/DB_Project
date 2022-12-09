import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/getusercomment", auth);
  app.use("/getusercomment", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "select * from d_board where id = ?",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};