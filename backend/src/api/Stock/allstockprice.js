export default async (app, connection) => {
    app.get("/allstockprice", async (req, res, next) => {
      await connection.query(
        "SELECT * FROM STOCK_P",
        [],
        (error, data) => {
            if (error) console.log(error);
            return res.send(data);
        }
      );
    });
  };