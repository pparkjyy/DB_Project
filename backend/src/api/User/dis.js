export default async (app, connection) => {
    app.get("/dis", async (req, res, next) => {
      await connection.query(
        "SELECT t_id, title, ID, num from u_board",
        (err, data) => {
            if (err) console.log(err);
            else console.log(data);
            
            return res.send(data);
        }
    )}
)};