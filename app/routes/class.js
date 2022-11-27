const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const classeModel = require('../models/classe')

const router = express.Router();
// let classes = [];

// Route pour recuperer toute les classes

router.get('/', async (req, res) => {

  try{
    let classe = await classeModel.find();

    return res.status(200).json(classe);

  }catch (error){
    
    return res.status(500).json({
      msg: error
    });
  }

});

// Route pour recuperer une classe en fonction de son id

router.get('/:id', async (req, res) => {

  const { id } = req.params

  // let find_class = classes.find(item => item.id == id);

  try {
    let classe = await classeModel.findOne({
        _id: id
    });

    return res.status(200).json(classe);

  } catch (error) {

    return res.status(500).json({
      msg: error
    });

  }
});

// Route pour creer une classe

router.post('/', async (req, res) => {

  const { name, NbreEleve } = req.body;

  if(typeof name == "undefined" || name == ""){
    return res.status(500).json({
      msg: "Vous devez donner un nom a votre classe"
    });
  }

  try {
    let classe = await classeModel.create({
      name,
      NbreEleve
    });

    return res.status(200).json(classe);

  } catch (error) {

    return res.status(500).json({
      msg: error
    });

  }
});

// Route pour supprimer une classe en finction de son id

router.delete('/:id', async (req, res) => {

  const { id } = req.params

  try {
    let classe = await classeModel.findOneAndDelete({
        _id: id
    });

    return res.status(200).json({
      classe,
      "statut": "Cette classe a ete supprimer de la base de donnee"
    });

  } catch (error) {

    return res.status(500).json({
      msg: error
    });

  }

  // Route pour mettr a jour une classe

});

router.put('/:id', async (req, res) => {

  const { id } = req.params

  const { name } = req.body;

  try {
    let classe = await classeModel.findOneAndUpdate({
        _id: id                     // pour savoir wuel element on met a jour dans le tableau 
    }, {
      name                         // avec quel element on met a jour
    }, {
      new: true          
    });

    return res.status(200).json(classe);

  } catch (error) {

    return res.status(500).json({
      msg: error
    });

  }

  // let my_classe = classes.find(item => item.id == id);

  // my_classe.name = name;

  // res.status(200).json(my_classe);

});

module.exports = router;