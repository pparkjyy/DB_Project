export default async (app, connection) => {
    app.use("/viewdisbytid", async (req, res, next) => {
      const { t_id } = req.query;
      console.log("t_id : " + t_id);
      await connection.query(
        "SELECT * FROM U_BOARD WHERE t_id = ?",
        [t_id],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          return res.send(result);
        }
      );
    });
  };