export default async (app, connection) => {
    app.use("/getcommentbytid", async (req, res, next) => {
      const { t_id } = req.query;
      await connection.query(
        "SELECT * FROM D_BOARD WHERE t_id = ?;",
        [t_id],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          return res.send(result);
        }
      );
    });
  };