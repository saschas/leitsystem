function export_scene(objects){
	var scene_export_array = [];
	objects.forEach(function(el){
		el.options.edges = null;
		el.options.rot = el.options.rot;
		el.options.parent = (function(){
			if(el.parent.type != 'Scene'){
				return el.parent.uuid;
			}
			else{
				return false;
			};
		})();
		el.options.position = (function(){
			if(el.parent.type != 'Scene'){
				el.options.parent_position = el.parent.position;
			}
			else{
				
			};
			return el.position;
		})();
		scene_export_array.push(el.options);
	});
	(function(console){

	    console.save = function(data, filename){

	        if(!data) {
	            console.error('Console.save: No data')
	            return;
	        }

	        if(!filename) filename = 'console.json'

	        if(typeof data === "object"){
	            data = JSON.stringify(data, undefined, 4)
	        }

	        var blob = new Blob([data], {type: 'text/json'}),
	            e    = document.createEvent('MouseEvents'),
	            a    = document.createElement('a')

	        a.download = filename
	        a.href = window.URL.createObjectURL(blob)
	        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
	        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	        a.dispatchEvent(e)
	    }
	})(console);

	console.log(scene_export_array);
	console.save(scene_export_array);
}