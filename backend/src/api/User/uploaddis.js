import { toSqlDatetime } from "../modules/util.js";
export default (app, connection) => {
  app.post("/uploaddis", (req, res, next) => {
    const { id, code, title, text } = req.body;
    var date = toSqlDatetime(new Date());
    if (title === "" || text === "") {
      res.send(false);
      return;
    }
    connection.query(
      "INSERT into U_BOARD(id, code, title, text, time) values(?,?,?,?,?)",
      [id, code, title, text, date],
      (error, data) => {
        if (error) res.send(false);
        else res.send(true);
      }
    );
  });
};