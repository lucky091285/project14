const mongoose = require('mongoose');
const validator  = require ('validator') ;
require('mongoose-type-url');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    about: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    avatar: {
        type: String,
        required: true,
      },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);