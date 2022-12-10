export default async (app, connection) => {
  app.get("/getAgeStock30", async (req, res, next) => {
    await connection.query(
      "WITH AGE AS (SELECT ID AS ID,( CASE WHEN age >= 20 AND age <= 29 THEN '20' WHEN age >= 30 AND age <= 39 THEN '30' WHEN age >= 40 AND age <= 49 THEN '40' WHEN age >= 50 AND age <= 59 THEN '50' WHEN age >= 60 THEN '60' ELSE '10' END) AS age FROM user) SELECT code, stock_name name, n_price price, n_price-e_price difference, (n_price-e_price)/e_price*100 rate FROM AGE natural join STOCK_U natural join STOCK natural join STOCK_P where age = '30' group by age, code order by sum(stock_num) DESC LIMIT 0, 5;",
      [],
      (error, data) => {
       
        if (error) console.log(error);
    
        return res.send(data);
      }
    );
  });
};
