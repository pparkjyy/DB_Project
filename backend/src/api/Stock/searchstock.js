export default async (app, connection) => {
    app.get("/searchstock", async (req, res, next) => {
      const { searchWord } = req.query;
      await connection.query(
        "SELECT * FROM stock natural join stock_p WHERE date = '2022-12-08' and stock_name like " + connection.escape("%" + searchWord + "%") +";",
        [],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          return res.send(result);
        }
      );
    });
  };
  