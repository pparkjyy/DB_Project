import { toSqlDatetime } from "../modules/util.js";
export default (app, connection) => {
  app.post("/uploadcomment", (req, res, next) => {
    const { id, t_id, text } = req.body;
    var time = toSqlDatetime(new Date());
    if ( text === "") {
      res.send(false);
      return;
    }
    connection.query(
      "INSERT into D_BOARD(id, t_id, text, time) values(?,?,?,?)",
      [id, t_id, text, time],
      (error, data) => {
        if (error) res.send(false);
        else res.send(true);
      }
    );
  });
};
