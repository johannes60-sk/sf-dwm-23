const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
let classes = [];


router.get('/classes', (req, res) => {

  res.status(200).json(classes);

})

router.post('/classes', (req, res) => {

  const {name} = req.body;
  
  let classe = {
    id: uuidv4(),
    name: name
  };

  classes.push(classe)

  res.status(200).json(classes);
});

router.get('/:id', (req, res) => {

  const {id} = req.params

  let find_class = classes.find(item => item.id == id);

  res.status(200).json(find_class);
  // console.log(Object.values(object1));

  // let classe = ;
});

router.delete('/:id', (req, res) => {

  const {id} = req.params

  classes = classes.filter(object => {
    return object.id !== id;
  });

  res.status(200).json(classes);

});

router.put('/:id', (req,res) => {

  const {id} = req.params

  const {name} = req.body;

  let my_classe = classes.find(item => item.id == id);

  my_classe.name = name;

  res.status(200).json(my_classe);

});

module.exports = router;