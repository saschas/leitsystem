##Leitsystem - Editor
###Working Draft

####Überblick
ContextMenu
- Add Item
    - Type
    - Link

```js
var object_options = {
  type : null, // Schrank,Tisch, -> String
  position : { 
    vec : null,// new THREE.Vec3();
    x:null, //number
    y:null, 
    z:null
  },
  clickable : true, // edit| object mode?
  active_material : new THREE.MeshBasicMaterial({color:0x00ff00}), //selected
  geometry: new THREE.BoxGeometry(10,10,10), // Maybe change to function return
  extra : { // Objekt Einstellungen
    href : 'http://www.google.de/', 
    description : 'Dieser Gegenstand hat eine Beschreibung',
  }
}
```


####SVG Import (Grundriss)


#### Todo
- Object Menu
  + Rotate
  + Link
  + Type
  + Clone
    * Fläche markieren und


