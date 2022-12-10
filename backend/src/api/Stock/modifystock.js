export default async(app, connection) => {
  app.post("/modifystock", (req, res, next) => {
    const { code, stock_name, stock_count, company_name, company_info} = req.body;
    connection.query(
      "UPDATE COMPANY SET company_name=?, stock_count=?, company_info = ? WHERE code = ?",
      [company_name, stock_count, company_info, code],
      (error) => {
        if (error) throw error;
        connection.query(
          "UPDATE STOCK SET stock_name=? WHERE code = ?",
          [stock_name, code],
          (error) => {
            if (error) throw error;
            res.send({ result: true, msg: "종목수정에 성공하였습니다."});
          }
        );
      }
    );
  });
};