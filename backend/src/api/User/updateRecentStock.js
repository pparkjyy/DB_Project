import auth from "../modules/auth.js";
export default async (app, connection) => {
  app.get("/updateRecentStock", auth);
  app.use("/updateRecentStock", async (req, res, next) => {
    const { id } = req.query;
    const { code } = req.query;

    const dateWithOffest = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    );
    const viewDate = dateWithOffest
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    console.log(viewDate);

    connection.query(
      "SELECT * FROM STOCK_UC WHERE id = ?;",
      [id],
      (error, data) => {
        if (error) console.log(error);
        else {
          for (var i = 0; i < data.length; i++) {
            if (data[i].code == code) {
              connection.query(
                "DELETE FROM STOCK_UC WHERE id = ? AND code = ?;",
                [id, code]
              );
            }
          }
          connection.query(
            "INSERT into STOCK_UC(id, code, time) VALUES(?,?,?);",
            [id, code, viewDate],
            (error, data) => {
              if (error) console.log(error);
            }
          );
          res.send({ result: true });
        }
      }
    );
  });
};
