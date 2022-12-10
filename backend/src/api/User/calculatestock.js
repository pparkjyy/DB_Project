import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/calculatestock", auth);
  app.use("/calculatestock", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "SELECT code, stock_name 종목명, n_price 현재가격, sum(stock_num*stock_price)/sum(stock_num) 구매가격, (n_price-(sum(stock_num*stock_price)/sum(stock_num)))/(sum(stock_num*stock_price)/sum(stock_num))*100 평가손익, n_price-e_price 전일대비, (n_price-e_price)/e_price*100 전일대비비율 FROM STOCK_U natural join STOCK_P natural join STOCK WHERE ID=? and date='2022-12-08'group by code;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};