export default async (app, connection) => {
    app.post("/updatedisview", async (req, res, next) => {
      const { num } = req.body;
      const { t_id } = req.body;
      connection.query(
        "UPDATE u_board SET num = ? WHERE t_id = ?;",
        [num + 1, t_id],
        (error, data) => {
          if (error) console.log(error);
          else return res.send({ result: true });
        }
      );
    });
  };
  