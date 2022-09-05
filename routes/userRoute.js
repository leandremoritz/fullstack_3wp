const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const jwt = require("jsonwebtoken")
const middleware = require("../middleware/auth");
require("dotenv").config();

router.get("/users",(req, res) => {
  try {
    let mysql ="SELECT * FROM users";
    con.query(mysql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
// delete user
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM users WHERE id = "${req.params.id}" `,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
// update user
router.patch("/:id", (req, res) => {
  try {

    const {
      fullname,
      dob,
      age,
      gender,
      image,
    email} = req.body;
   
    con.query(
      `UPDATE users set fullname="${fullname}",dob="${dob}",age="${age}", gender="${gender}", image="${image}", email="${email}"  WHERE id = "${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Add user /regiter
const bcrypt = require('bcryptjs');

router.post("/add", (req, res) => {
  try {
    let sql = "INSERT INTO users SET ?";
    const {
      fullname,
      dob,
      age,
      gender,
      image,
      password,
      email,
     
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let user = {
      fullname,
      dob,
      age,
      gender,
      image,
      password: hash,
      email,
      
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json({
        status: 'ok',
        data: "User added"
      })
    });
  } catch (error) {
    console.log(error);
  }
});
// login
// Login
router.post("/login", (req, res) => {
  console.log(req.body)
  try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        if (!isMatch) {
          res.send("Password incorrect");
        } else {
          // The information the should be stored inside token
          const payload = {
            user: {
              id:result[0].id,
              email:result[0].email,
              fullname: result[0].fullname,
              dob: result[0].dob,
              age: result[0].age,
              gender: result[0].gender,
              image: result[0].image,
              
            },
          };
          // Creating a token and setting expiry date
          jwt.sign(
            payload,
            process.env.jwtSecret,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});
// Verify
router.get("/users/verify", (req, res) => {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        msg: "Unauthorized Access!",
      });
    } else {
      res.status(200);
      res.send(decodedToken);
    }
  });
});
// DELETE
// delete product
router.delete("/delete/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM users WHERE id = "${req.params.id}" `,
      (err, result) => {
        if (err) throw err;
        res.send("User was successfully deleted.");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
