export default async (app, connection) => {
    app.get("/allstockdata", async (req, res, next) => {
      await connection.query(
        "SELECT * FROM COMPANY",
        [],
        (error, data) => {
            if (error) console.log(error);
            return res.send(data);
        }
      );
    });
  };
  