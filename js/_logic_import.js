$.getJSON("scene/scene_1.json", function(json) {

json.forEach(function(el){

	add_new_Object(el);
});

console.log(objects);
	
	
   // console.log(json);
});