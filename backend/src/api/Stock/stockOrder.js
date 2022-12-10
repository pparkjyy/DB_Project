export default async (app, connection) => {
  app.post("/stockOrder", async (req, res, next) => {
    const { id } = req.body;
    const { code } = req.body;
    const { num } = req.body;
    const { price } = req.body;
    const { sell } = req.body;
    if(num<1){
      res.send({ result: false, msg: "수량은 1이상" });
    }
    else if (!sell) {
      connection.query(
        "SELECT stock_num FROM STOCK_U WHERE id=? and code=? and stock_price=?",
        [id, code, price],
        (error, data) => {
          if (error) console.log(error);
          else if(data.length){
            connection.query(
              "UPDATE STOCK_U SET stock_num=? WHERE id=? and code=? and stock_price=?;",
              [Number(num) + Number(data[0].stock_num), id, code, price],
              (error) => {
                if (error) console.log(error);
                res.send({ result: true, msg: "구매 완료" });
              }
            );
          }
          else{
            connection.query(
              "INSERT into STOCK_U(id, code, stock_num, stock_price) values(?,?,?,?);",
              [id, code, num, price],
              (error) => {
                if (error) console.log(error);
                res.send({ result: true, msg: "구매 완료" });
              }
            );
          }
        }
      );
    } else {
      connection.query(
        "SELECT code , sum(stock_num) num, sum(stock_num*stock_price)/sum(stock_num) price FROM STOCK_U natural join STOCK WHERE ID=? and code=? group by code;",
        [id, code],
        (error, data) => {
          if (error) console.log(error);
          else if(!data.length) res.send({ result: false, msg: "보유 수량 보다 많습니다." });
          else if(data[0].num < num) res.send({ result: false, msg: "보유 수량 보다 많습니다." });
          else(
            connection.query(
              "DELETE FROM STOCK_U WHERE id = ? AND code = ?;",
              [id, code],
              (error) => {
                if (error) console.log(error);
                connection.query(
                  "INSERT into STOCK_U(id, code, stock_num, stock_price) values(?,?,?,?);",
                  [id, code, Number(data[0].num)-Number(num), data[0].price],
                  (error) => {
                    if (error) console.log(error);
                    res.send({ result: true, msg: "판매 완료" });
                  }
                );
              }
            )
          )
        }
      );
    }
  });
};
