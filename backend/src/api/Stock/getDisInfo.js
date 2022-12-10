export default async (app, connection) => {
  app.get("/getDisInfo", async (req, res, next) => {
    const { stockcode } = req.query;
    await connection.query(
      "select title, count(*) num from u_board join D_BOARD on u_board.t_id = D_BOARD.t_id where code = ? group by u_board.t_id order by u_board.time DESC;",
      [stockcode],
      (error, data) => {
       
        if (error) console.log(error);

        return res.send(data);
      }
    );
  });
};
