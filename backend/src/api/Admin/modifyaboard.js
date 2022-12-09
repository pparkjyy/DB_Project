import { toSqlDatetime } from "../modules/util.js";
export default (app, connection) => {
  app.post("/modifyaboard", (req, res, next) => {
    const { title, text, postnum } = req.body;
    var date = toSqlDatetime(new Date());
    if (title === "" || text === "") {
      res.send(false);
      return;
    }
    connection.query(
      "UPDATE A_BOARD SET title=?, text=?, date = ? WHERE postnum = ?",
      [title, text, date, postnum],
      (error, data) => {
        console.log(title, text, date, postnum);
        if (error) res.send(false);
        else res.send(true);
      }
    );
  });
};
