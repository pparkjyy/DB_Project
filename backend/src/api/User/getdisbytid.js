export default async (app, connection) => {
    app.use("/getdisbytid", async (req, res, next) => {
      const { t_id } = req.query;
      console.log("t_id : " + t_id);
      await connection.query(
        "SELECT * FROM U_BOARD WHERE t_id = ?;",
        [t_id],
        (error, data) => {
          if (error) console.log(error);
          console.log(data);
          const result = data;
          return res.send(result);
        }
      );
    });
  };