export default async (app, connection) => {
  app.get("/getShareholderInfo", async (req, res, next) => {
    const { stockcode } = req.query;
    await connection.query(
      "SELECT * FROM stock_O WHERE code= ? order by stock_num DESC;",
      [stockcode],
      (error, data) => {
       
        if (error) console.log(error);
        return res.send(data);
      }
    );
  });
};
