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
 

// Only display necklaces
router.get("/products/necklace", (req,res)=>{
  try{
    let sql = `SELECT * FROM products WHERE category = "necklaces"`
    con.query(sql, (err,result)=>{
      if(err) throw err
      res.send(result)
    })
  } catch(error) {
    console.log(error)
    res.status(400).send(error)
  }
})
// Only display bracelet
router.get("/products/bracelet", (req,res)=>{
  try{
    let sql = `SELECT * FROM products WHERE category = "bracelet"`
    con.query(sql, (err,result)=>{
      if(err) throw err
      res.send(result)
    })
  } catch(error) {
    console.log(error)
    res.status(400).send(error)
  }
})
// Only display two piece set
router.get("/products/2pc", (req,res)=>{
  try{
    let sql = `SELECT * FROM products WHERE category = "two piece set"`
    con.query(sql, (err,result)=>{
      if(err) throw err
      res.send(result)
    })
  } catch(error) {
    console.log(error)
    res.status(400).send(error)
  }
})
// Only display rings
router.get("/products/rings", (req,res)=>{
  try{
    let sql = `SELECT * FROM products WHERE category = "rings"`
    con.query(sql, (err,result)=>{
      if(err) throw err
      res.send(result)
    })
  } catch(error) {
    console.log(error)
    res.status(400).send(error)
  }
})
// Only display earrings
router.get("/products/earrings", (req,res)=>{
  try{
    let sql = `SELECT * FROM products WHERE category = "earrings"`
    con.query(sql, (err,result)=>{
      if(err) throw err
      res.send(result)
    })
  } catch(error) {
    console.log(error)
    res.status(400).send(error)
  }
})

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
    //  update route
    router.put("/:id", (req, res) => {
      try {
        const {
          image,
          descriptions,
          category,
          color,
          price
          
        } = req.body;
       
        con.query(
          `UPDATE products set image="${image}",descriptions="${descriptions}",category="${category}",color="${color}" price="${price}", WHERE id = "${req.params.id}"`,
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