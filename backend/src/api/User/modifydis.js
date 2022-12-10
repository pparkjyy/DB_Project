import { toSqlDatetime } from "../modules/util.js";
export default (app, connection) => {
  app.post("/modifydis", (req, res, next) => {
    const { title, text, t_id } = req.body;
    var time = toSqlDatetime(new Date());
    if (title === "" || text === "") {
      res.send(false);
      return;
    }
    connection.query(
      "UPDATE U_BOARD SET title=?, text=?, time = ? WHERE t_id = ?",
      [title, text, time, t_id],
      (error, data) => {
        if (error) res.send(false);
        else res.send(true);
      }
    );
  });
};
