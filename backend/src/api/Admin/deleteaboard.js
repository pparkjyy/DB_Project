export default (app, connection) => {
  app.post("/deleteaboard", (req, res, next) => {
    const { postnum } = req.body;
    connection.query(
      "DELETE FROM A_BOARD WHERE postnum = ?",
      [postnum],
      (error, data) => {
        if (error) res.send(false);
        else res.send(true);
      }
    );
  });
};
