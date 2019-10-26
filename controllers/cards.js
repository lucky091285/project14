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
  Card.findById(req.params.id)
  .then((card) => {
    if (!card) return Promise.reject(new Error(`Такой карты нет -- ${err}`));
    if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) return Promise.reject(new Error(`Удалять можно только свои карточки! -- ${err}`));
    Card.remove(card)
      .then((cardToDelete) => res.send(cardToDelete !== null ? { data: card } : { data: 'Нечего удалять' }))
      .catch(() => res.status(500).send({ message: `Произошла ошибка при удалении карточки -- ${err}` }));
  })
  .catch(() => res.status(500).send({ message: `Произошла ошибка при удалении карточки -- ${err}` }));
};

