import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/usermoneydata", auth);
  app.use("/usermoneydata", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "select (sum(stock_num*n_price)-sum(stock_num*e_price))/sum(stock_num*e_price)*100 당일실현손익, sum(stock_num*stock_price) 총매입금액, sum(stock_num*n_price)총평가금액 from stock_u natural join stock_p natural join stock where id=? and date='2022-12-08' group by id;",
      [id],
      (error, data) => {
        console.log(id);
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};