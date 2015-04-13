$(function() {

  /* Sidebar navigation selector */
  var $peopleNav = $('.people-nav');
  var $peopleNavItem = $('.people-nav li');

  $peopleNavItem.on('click', this, function() {
    $peopleNavItem.removeClass('people-nav--selected');
    $(this).addClass('people-nav--selected')
  });


  /* Pikabu navigation drawer */
  var pikabu = new Pikabu({
    widths: {
      right: '20%'
    }
  });

  var maxString = function(string, max) {
    var trimmedString = string.substring(0, max);
    return trimmedString;
  }
  /*Fin*/
});
