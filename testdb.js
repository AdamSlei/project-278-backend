import { connect } from "pg";
var connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;

connect(connectionString, function (err, client, done) {
  client.query("SELECT * FROM APPS", function (err, result) {
    done();
    if (err) return console.error(err);
    console.log(result.rows);
  });
});
