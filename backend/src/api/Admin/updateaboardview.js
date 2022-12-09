export default async (app, connection) => {
    app.post("/updateaboardview", async (req, res, next) => {
      const { num } = req.body;
      const { postnum } = req.body;
      connection.query(
        "UPDATE a_board SET num = ? WHERE postnum = ?;",
        [num + 1, postnum],
        (error, data) => {
          if (error) console.log(error);
          else return res.send({ result: true });
        }
      );
    });
  };
  