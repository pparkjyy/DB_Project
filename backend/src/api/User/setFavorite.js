export default async (app, connection) => {
  app.post("/setFavorite", async (req, res, next) => {
    const { id } = req.body;
    const { code } = req.body;
    const { isFavorite } = req.body;

    if (isFavorite) {
      connection.query(
        "DELETE FROM STOCK_UZ WHERE id = ? AND code = ?;",
        [id, code],
        (error) => {
          if (error) console.log(error);
          res.send({ result: true, msg: "찜 목록에서 해제되었습니다." });
        }
      );
    } else {
      connection.query(
        "INSERT into STOCK_UZ(id, code) values(?,?);",
        [id, code],
        (error) => {
          if (error) console.log(error);
          res.send({ result: true, msg: "찜 목록에 추가되었습니다." });
        }
      );
    }
  });
};
