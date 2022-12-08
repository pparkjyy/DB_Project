import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/usermoneypercent", auth);
  app.use("/usermoneypercent", async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      "WITH temp AS (SELECT ID, code, sum(stock_num) num, sum(stock_num*stock_price)/sum(stock_num) price, n_price cur_price FROM STOCK_U natural join STOCK_P natural join STOCK WHERE ID=? and date='2022-12-08' group by code ) SELECT id, (SUM(num*cur_price)-SUM(num*price))/SUM(num*price)*100 총평가손익 FROM temp group by ID",
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};