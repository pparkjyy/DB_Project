export default async (app, connection) => {
  app.post("/getMemberList", async (req, res, next) => {
    await connection.query(
      "SELECT * FROM user",
      [],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        return res.send(result);
      }
    );
  });
};
