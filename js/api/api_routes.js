(function() {
  'use strict';

  module.exports = {

    authorsPath: function () {
      return "http://demo4758158.mockable.io/authors";
    },

    booksPath: function (authorId) {
      return "http://demo4758158.mockable.io/books/" + authorId;
    }


   };
})();
