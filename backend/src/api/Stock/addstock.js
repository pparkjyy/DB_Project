// export const code_check = (app, connection) => {
//   app.post("/codeCheck", (req, res, next) => {
//     const { code } = req.body;
//     connection.query(
//       "SELECT * FROM STOCK WHERE code = ?",
//       [code],
//       async (error, data) => {
//         console.log('check')
//         if (error) {
//           throw error;
//         } else if (data.length == 0) {
//           res.send({ result: true, msg: "OK" });
//         } else {
//           res.send({ result: true, msg: "EXIST" });
//         }
//       }
//     );
//   });
// };

// export default (app, connection) => {
//   app.post("/addstock", (req, res, next) => {
//     const { code, stock_name, stock_count, company_name, company_info } = req.body;
//     connection.query(
//       "INSERT all into STOCK(code, stock_name) values(?,?) into COMPANY(code, company_name, stock_count, company_info)",
//       [code, stock_name],
//       (error, data) => {
//         if (error) {
//           if (error.errno == 1062)
//             res.send({ result: false, msg: "해당 아이디가 이미 존재합니다." });
//           else res.send({ result: false, msg: error.sqlMessage });
//         } else {
//           res.send({
//             result: true,
//             msg: "로그인을 진행해 주세요.",
//           });
//         }
//       }
//     );
//   });
// };