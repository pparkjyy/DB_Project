import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/checkuser", auth);
  app.use("/checkuser", async (req, res, next) => {
    const { id } = req.query;
    const { t_id } = req.query;
    await connection.query(
      "SELECT t_id FROM u_board WHERE id = ?",
      [id],
      (error, data) => {
        if (error) console.log(error);
        for (var i = 0; i < data.length; i++)
          if (data[i].t_id == t_id) return res.send(true);
        return res.send(false);
      }
    );
  });
};
