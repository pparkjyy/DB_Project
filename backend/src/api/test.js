export default async (app, connection) => {
  app.get("/test", async (req, res, next) => {
    await connection.query(
      "SELECT ID, PW, name, age, phone, email, money FROM USER",
      [],
      (error, data) => {
        // var dataList = [];
        // if (error) console.log(error);
        // for(var data of datas){
        //   dataList.push(data)
        // }
        //console.log(data);
        return res.send(data);
      }
    );
  });
};
