export default async (app, connection) => {
    app.use("/getaboard", async (req, res, next) => {
      await connection.query(
        "SELECT * FROM A_BOARD;",
        [],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          return res.send(result);
        }
      );
    });
  };
  