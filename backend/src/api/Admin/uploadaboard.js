import { toSqlDatetime } from "../modules/util.js";
export default (app, connection) => {
  app.post("/uploadaboard", (req, res, next) => {
    const { title, text } = req.body;
    var date = toSqlDatetime(new Date());
    if (title === "" || text === "") {
      res.send(false);
      return;
    }
    connection.query(
      "INSERT into A_BOARD(title, text, date) values(?,?,?)",
      [title, text, date],
      (error, data) => {
        if (error) res.send(false);
        else res.send(true);
      }
    );
  });
};
