const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");


router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
// Gets one products
router.get("/:id", (req, res) => {
    try {
      con.query(
        `SELECT * FROM products WHERE id = ${req.params.id}`,
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
  router.post('/addproduct', (req, res)=>{
    {
     const {id,image,descriptions,category,color,price} = req.body
     try{
       con.query(`INSERT INTO  products (id,image,descriptions,category,color,price) values ('${id}','${image}','${descriptions}','${category}','${color}','${price}')`, (err, result) => {
         if (err) throw err;
         res.send(result);
       });
     
     } catch(error){
       console.log(error)
     }
    }
    // else {
    //  res.send('Not Allowed')
    // }
});
 
     // delete product
     router.delete("/:id", (req, res) => {
       try {
         con.query(
           `DELETE FROM products WHERE id = "${req.params.id}" `,
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
 

    
    module.exports = router;