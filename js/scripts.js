
var language = 'de';

var last_foundation = '';

var stulle_id = [];

var poetic_titles = [];

var randomize = false;

$(document).ready(function () {

	$('#new-stulle').click(function() {
	
		randomize = true;

		stulle_id = [];

		poetic_titles = [];

		build_stulle();

	})
	
	function add_ingredient(ingredient_pos, ingredient_category, delay, offset) {
	
		if (ingredient_category == 'foundation' && last_foundation != '') {

			ingredient = last_foundation;

		} else {

			ingredient = get_ingredient(ingredient_pos, ingredient_category);

			if (ingredient_category == 'foundation') {last_foundation = ingredient;}

		}
	
		poetic_title_pos = ingredient.poetic_title.pos;
		
		poetic_title = ingredient.poetic_title.text;

		poetic_titles[poetic_title_pos] = poetic_title;

		if (ingredient.slug in locals && language in locals[ingredient.slug]) {

			title = locals[ingredient.slug][language];

		} else {

			title = locals['no_translation'][language] + '`' + ingredient.slug + '`';
		}
		
		$('#stulle').prepend('<div class="'+ ingredient.style +'"><p class="text-muted mb-0">' + title + '</p></div>');

		ingredient_element = $('#stulle').children().first();

		dh = ingredient_element.outerHeight();	
		
		ingredient_element.css({
				top: $(window).scrollTop() - dh,
				opacity: 0,
				display: 'block'
			}).delay(delay)
			.animate({
				top: offset - dh,
				opacity: 1
			}, 500, 'easeOutBounce');
	
		return (offset - dh);

	}

	function add_badge(description, delay) {

		$('#badge-container').append('<span>'+description+'</span>');

	}

	function reset_badge() {

		$('#badge-container').empty();
	}

	function build_stulle() {

		reset_badge();	

		var offset = $('#stulle').outerHeight();

		var delay = 0;

		// get a style

		if (randomize === false) {
	
			stulle_id = stulle_id_str.split('');

		} else {

			stulle_id.push(Math.floor((Math.random() * Object.keys(stulle.styles).length) + 1).toString());

		}

		console.log(stulle_id);

		console.log('Creating stulle style #' + stulle_id[0]);

		// reset layout

		reset_stulle(stulle.styles[stulle_id[0]].order.length);

		// build the poetic title

		poetic_titles[stulle.styles[stulle_id[0]].poetic_title.pos] = stulle.styles[stulle_id[0]].poetic_title.text;

		// poetic_title_pos = stulle.styles[stulle_id[0]].poetic_title.pos;
		
		// poetic_title = stulle.styles[stulle_id[0]].poetic_title.text;

		// poetic_titles[poetic_title_pos] = poetic_title;

		// get ingredients

		var stulle_style = stulle.styles[stulle_id[0]].order;

		$.each(stulle_style, function(ingredient_pos, ingredient_category) {

			console.log('Filling stulle at position ' + (ingredient_pos + 1)+ ' with ' + ingredient_category);

			offset = add_ingredient(ingredient_pos + 1, ingredient_category, delay, offset);

			delay += 250;
		  
		}); 
				
		console.log(poetic_titles);

		var share_stulle = '<a href="https://freecoffee.de/?id=' + stulle_id.join('') + '">' + poetic_titles.join(' ') + '</a>';
		// add full poetic title to layout
		// add_badge('Stulle #' + Math.floor((Math.random() * 100000)) + ': "' + poetic_titles[1] + ' ' + poetic_titles[2] + '"');
		add_badge(share_stulle);

	}

	function reset_stulle(height) {
		
		$('#stulle').empty();
		// $('#stulle').height('10em');

		last_foundation = '';

	}
	
	function get_ingredient(ingredient_pos, ingredient_category) {
		
		if (randomize === false) {

			var ingredient_id =	stulle_id[ingredient_pos];
		
		} else {

			var ingredient_id =	Math.floor((Math.random() * Object.keys(stulle.ingredients[ingredient_category]).length) + 1);

			stulle_id.push(ingredient_id);

		}
		
		return stulle.ingredients[ingredient_category][ingredient_id];
		
	}

	var stulle_id_str = window.location.search.split('id=')[1];

	if (typeof(stulle_id_str) !== 'undefined' ) {

		randomize = false;

	} else {

		randomize = true;

	}

	build_stulle()

})