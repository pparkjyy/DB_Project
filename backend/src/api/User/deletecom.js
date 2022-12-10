export default (app, connection) => {
    app.post("/deletecom", (req, res, next) => {
      const { t_id } = req.body;
      connection.query(
        "DELETE FROM D_BOARD WHERE t_id = ?",
        [t_id],
        (error, data) => {
          if (error) res.send(false);
          else res.send(true);
        }
      );
    });
  };