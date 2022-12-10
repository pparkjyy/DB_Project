export const setBan = async (app, connection) => {
  app.post("/setBan", async (req, res, next) => {
      const {id,ban} = req.body;
      await connection.query(
          "UPDATE user SET ban = ? WHERE id = ?",
          [ban,id],
          (error, data) => {
          if (error) console.log(error);
          const result = data;
          return res.send(result);
          }
      );
  });
};