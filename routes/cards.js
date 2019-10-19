const cardsRouter = require('express').Router();
// const cards = require('../data/cards.json');
const { createCard, getAddCards, deleteCard } = require('../controllers/cards');

cardsRouter.get('/', getAddCards);

cardsRouter.post('/', createCard);

cardsRouter.delete('/:id', deleteCard);

module.exports = cardsRouter;