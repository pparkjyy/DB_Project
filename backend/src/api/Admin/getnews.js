export default async (app, connection) => {
    app.get("/getnews", async (req, res, next) => {
      await connection.query(
        "SELECT * FROM N_BOARD",
        [],
        (error, data) => {
          console.log(data);
          return res.send(data);
        }
      );
    });
  };
  
  