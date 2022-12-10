export default (app, connection) => {
  app.post("/deletedis", (req, res, next) => {
    const { t_id } = req.body;
    connection.query(
      "DELETE FROM U_BOARD WHERE t_id = ?",
      [t_id],
      (error, data) => {
        if (error) res.send(false);
        else res.send(true);
      }
    );
  });
};
