export default async (app, connection) => {
  app.get("/getStockInfo", async (req, res, next) => {
    const { stockcode } = req.query;
    await connection.query(
      "SELECT * FROM STOCK_P natural join STOCK WHERE code= ? and date='2022-12-08';",
      [stockcode],
      (error, data) => {
       
        if (error) console.log(error);
        // const result = data;
        // for (var i = 0; i < result.length; i++) {
        //   result[i].photo =
        //     req.protocol + "://" + req.get("host") + result[i].photo;
        // }
        console.log("data: "+ stockcode)
        return res.send(data);
      }
    );
  });
};
