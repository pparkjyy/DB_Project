export default async (app, connection) => {
  app.get("/risingRate", async (req, res, next) => {
    const date = '2022-12-08'
    await connection.query(
      "SELECT code, stock_name name, n_price price, n_price - e_price difference, (n_price - e_price)/n_price * 100 rate FROM STOCK_P NATURAL JOIN STOCK WHERE date = ? ORDER BY (n_price - e_price)/n_price DESC LIMIT 0,10;",
      [date],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        
        return res.send(result);
      }
    );
  });
};