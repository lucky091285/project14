const Card = require('../models/card');

module.exports.createCard = (req, res) => {
    const { name, link } = req.body;
    const owner = (req.user._id);

    Card.create({ name, link, owner })
        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: `Произошла ошибка добавлении карточки -- ${err}` }));
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
        .populate('owner')
        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: `Произошла ошибка при загрузке карточек -- ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  User.findByIdAndRemove(req.params.id)
      .then(card => res.send({ data: card }))
      .catch(err => res.status(500).send({ message: `Произошла ошибка при удалении карточки -- ${err}` }));
};

