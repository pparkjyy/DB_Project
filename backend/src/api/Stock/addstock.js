export const code_check = (app, connection) => {
  app.post("/codeCheck", (req, res, next) => {
    const { code } = req.body;
    connection.query(
      "SELECT * FROM STOCK WHERE code = ?",
      [code],
      async (error, data) => {
        console.log('check')
        if (error) {
          throw error;
        } else if (data.length == 0) {
          res.send({ result: true, msg: "OK" });
        } else {
          res.send({ result: true, msg: "EXIST" });
        }
      }
    );
  });
};

export default async(app, connection) => {
  app.post("/addstock", (req, res, next) => {
    const { code, stock_name, stock_count, company_name, company_info, num, stock_owner, stock_num, stock_owner1, stock_num1, stock_owner2, stock_num2, stock_owner3, stock_num3, stock_owner4, stock_num4} = req.body;
    connection.query(
      "INSERT into STOCK(code, stock_name) values(?,?)",
      [code, stock_name],
      (error) => {
        if (error) throw error;
        connection.query(
          "INSERT into COMPANY(code, company_name, stock_count, company_info) values(?,?,?,?)",
          [code, company_name, stock_count, company_info],
          (error) => {
            if (error) throw error;
            connection.query(
              "INSERT into stock_O(code, stock_owner, stock_num, stock_p) values(?,?,?,?)",
              [code, stock_owner, stock_num, (Number(stock_num)/Number(stock_count)*100).toFixed(2)],
              (error) => {
                if (error) throw error;
                if(num>0){
                  connection.query(
                    "INSERT into stock_O(code, stock_owner, stock_num, stock_p) values(?,?,?,?)",
                    [code, stock_owner1, stock_num1, (Number(stock_num1)/Number(stock_count)*100).toFixed(2)],
                    (error) => {
                      if (error) throw error;
                      if(num>1){
                        connection.query(
                          "INSERT into stock_O(code, stock_owner, stock_num, stock_p) values(?,?,?,?)",
                          [code, stock_owner2, stock_num2, (Number(stock_num2)/Number(stock_count)*100).toFixed(2)],
                          (error) => {
                            if (error) throw error;
                            if(num>2){
                              connection.query(
                                "INSERT into stock_O(code, stock_owner, stock_num, stock_p) values(?,?,?,?)",
                                [code, stock_owner3, stock_num3, (Number(stock_num3)/Number(stock_count)*100).toFixed(2)],
                                (error) => {
                                  if (error) throw error;
                                  if(num>3){
                                    connection.query(
                                      "INSERT into stock_O(code, stock_owner, stock_num, stock_p) values(?,?,?,?)",
                                      [code, stock_owner4, stock_num4, (Number(stock_num4)/Number(stock_count)*100).toFixed(2)],
                                      (error) => {
                                        if (error) throw error;
                                        else res.send({ result: true, msg: "종목추가에 성공하였습니다."});
                                      }
                                    );
                                  }
                                  else res.send({ result: true, msg: "종목추가에 성공하였습니다."});
                                }
                              );
                            }
                            else res.send({ result: true, msg: "종목추가에 성공하였습니다."});
                          }
                        );
                      }
                      else res.send({ result: true, msg: "종목추가에 성공하였습니다."});
                    }
                  );
                }
                else res.send({ result: true, msg: "종목추가에 성공하였습니다."});
              }
            );
          }
        );
      }
    );
  });
};