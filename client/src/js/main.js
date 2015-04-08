$(function() {
	/* Sidebar navigation selector */
  var $peopleNav = $('.people-nav');
  var $peopleNavItem = $('.people-nav li');

  $peopleNavItem.on('click', this, function(e) {
    e.preventDefault();
    $peopleNavItem.removeClass('people-nav--selected');
    $(this).addClass('people-nav--selected')
    console.log(this, 'clicked!');
	});

  /*Fin*/
});
