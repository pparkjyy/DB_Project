import { sign } from "../modules/jwt.js";

export default (app, connection) => {
  app.post("/login", (req, res, next) => {
    const { id, pw } = req.body;
    connection.query(
      "SELECT id, name, ban FROM user WHERE id = ? and pw = ?",
      [id, pw],
      async (error, data) => {
        if (error) throw error;
        const result = data[0] && data[0].id && !data[0].ban ? true : false;
        console.log("r : " + result);
        if (result === true) {
          const jwtToken = await sign(id, pw);
          jwtToken.name = data[0].name;
          jwtToken.type = "user";
          console.log(jwtToken);
          res.send(jwtToken);
        } else {
          console.log("fail");
          if(data[0]){
            if(data[0].ban)
              res.send('isBanned');
            else
              res.send(null);
          }
          else
            res.send(null);
        }
      }
    );
  });
};
