$('#search_panel a').each(function(){
	$(this).attr('data-search',$(this).text());
});
$('#search_panel a').click(function(){
	search($(this).attr('data-search'));
});


function search(needle){
	objects.forEach(function(el){
		var curr = el.options.bestand;
		if(needle ==curr){
			el.material = active_material;
		}
		else{
			el.material = basic_material;
		}
		console.log();
	});
}