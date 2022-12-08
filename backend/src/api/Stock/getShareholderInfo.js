export default async (app, connection) => {
  app.get("/getShareholderInfo", async (req, res, next) => {
    const { stockcode } = req.query;
    await connection.query(
      "SELECT * FROM stock_O WHERE code= ?;",
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
