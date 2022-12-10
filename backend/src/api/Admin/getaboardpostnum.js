export default async (app, connection) => {
    app.use("/getaboardpostnum", async (req, res, next) => {
      const { postnum } = req.query;
      console.log("postnum : " + postnum);
      await connection.query(
        "SELECT * FROM a_board WHERE postnum = ?;",
        [postnum],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          return res.send(result);
        }
      );
    });
  };
  