var express = require('express');
var router = express.Router();
const db = require("../models");
const Author = db.Author;
/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  Author.findAll().then((data) => {
    res.render("authors/index", {
      authors: data,
    });
  });
});

router.get("/authors/create", function (req, res, next) {
  Author.findByPk(req.params.id)
  .then((data) => {
    res.render("authors/create", {
      data: data,
    });
  })

});

router.post("/authors", function (req, res, next) {
  if (req.body.name) 
  {
    if (req.body.adress) 
    {
      if (req.body.telephon) 
      {
        const author = {
          name: req.body.name,
          adress: req.body.adress,
          telephon: req.body.telephon,
        };

        Author.create(author)
          .then((data) => {
            res.redirect("/authors");
          })
          .catch((err) => {
            res.render("authors/create", {
              type: "danger",
              message:
                err.message || "Some error occurred while creating the author.",
            });
          });
          
      }
      else
      {
        res.render("authors/create", {
          type: "danger",
          message: "telephon author is required !",
        });
        return;
      }
    }
    else
    {
      res.render("authors/create", {
        type: "danger",
        message: "adress author is required !",
      });
      return;
    }
  }
  else
  {
    res.render("authors/create", {
      type: "danger",
      message: "Name author is required !",
    });
    return;
  }

});


router.get("/authors/edit/:id", function (req, res, next) {
  Author.findByPk(req.params.id)
    .then((data) => {
      res.render("authors/edit", {
        data: data,
      });
    })
    .catch((err) => {
      res.render("authors/edit", {
        type: "danger",
        message: "Author doesn't exist.",
      });
    });
});

router.post("/authors/edit/:id", function (req, res, next) {
  const id = req.params.id;
  if (req.body.name) 
  {
    if (req.body.adress) 
    {
      if (req.body.telephon) 
      {
        Author.update(req.body, {
          where: { id: id },
        })
       
        Author.findByPk(null)
        .then((data) => {
          res.render("authors/create", {
            type: "success",
            message: "Author successfull updated !",
          });
        });
        
      }
      else
      {
        res.render("authors/create", {
          type: "danger",
          message: "telephon author is required !",
        });
        return;
      }
    }
    else
    {
      res.render("authors/create", {
        type: "danger",
        message: "adress author is required !",
      });
      return;
    }
  }
  else
  {
    res.render("authors/create", {
      type: "danger",
      message: "Name author is required !",
    });
    return;
  }
});


router.post("/authors/delete/:id", function (req, res, next) {
  const id = req.params.id;

  Author.destroy({
    where: { id: id },
  })
    res.redirect("/authors");
});
module.exports = router;
