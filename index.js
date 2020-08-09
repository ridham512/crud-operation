const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//ROUTES//

//create a register

app.post("/register", async (req, res) => {
  try {
    const {
      description,
      price,
      contact,
      date_col,
      timestamp_col,
      timestamptz_col,
      data,
    } = req.body;

    const newregister = await pool.query(
      "INSERT INTO register (description, price, contact,date_col, timestamp_col, timestamptz_col,data) VALUES($1, $2, ARRAY[$3]::bigint[], $4, TO_TIMESTAMP($5), TO_TIMESTAMP($6), $7) RETURNING *",
      [
        description,
        price,
        contact.toString(),
        date_col,
        timestamp_col,
        timestamptz_col,
        JSON.stringify(data),
      ]
    );

    res.json(newregister.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all from register

app.get("/register", async (req, res) => {
  try {
    const allregister = await pool.query("SELECT * FROM register");
    res.json(allregister.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a data from register

app.get("/register/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const register = await pool.query(
      "SELECT * FROM register WHERE register_id = $1",
      [id]
    );
    res.json(register.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a register
app.put("/register/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      description,
      price,
      contact,
      date_col,
      timestamp_col,
      timestamptz_col,
      data,
    } = req.body;
    const updateregister = await pool.query(
      "UPDATE register SET description = $1, price =  $2, contact = ARRAY[$3]::bigint[],date_col =  $4, timestamp_col = TO_TIMESTAMP($5), timestamptz_col = TO_TIMESTAMP($6),data = $7 WHERE register_id = $8",
      [
        description,
        price,
        contact.toString(),
        date_col,
        timestamp_col,
        timestamptz_col,
        JSON.stringify(data),
        id,
      ]
    );

    res.json("register was updated!");
  } catch (err) {
    console.error(err.message);
  }
});
//delete a register

app.delete("/register/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteregister = await pool.query(
      "DELETE FROM register WHERE register_id = $1",
      [id]
    );
    res.json("register was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
