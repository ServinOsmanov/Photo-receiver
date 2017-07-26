function showSerialNumber(event) {
	alert(event.target.innerHTML);
}

var serialNumberOfNewRect = 10;

var myRectangulars = document.getElementById("blockWithRect");
myRectangulars.addEventListener("click", showSerialNumber);

function newRect() {
    var parentElement = document.getElementById('blockWithRect');
    var childElement = document.createElement('div');
    var serialNumber = document.createTextNode(serialNumberOfNewRect++);
    childElement.classList.add("item-wrap")
	childElement.style.margin = "2px 4px 2px 0px";
	childElement.appendChild(serialNumber);
    parentElement.appendChild(childElement);
}

function separator() {
	makeCounter();
	if(count % 3 === 0) {
		var parentElement = document.getElementById('blockWithRect');
		var childElement = document.createElement('p');
		parentElement.appendChild(childElement);
	}
}

var count = 0;
function counter() {
	return function() {
		return count++;
	}
}
var makeCounter = counter();

var addRect = document.getElementById("firstBtn")
addRect.addEventListener("click", newRect);
addRect.addEventListener("click", separator);

var numActiveItem = 0;
function navigateThrough(e) {
var arrayWithDiv = document.getElementsByClassName("item-wrap");
	if(e.keyCode === 39) {
		numActiveItem++;
		if(numActiveItem >= arrayWithDiv.length) {
			numActiveItem = arrayWithDiv.length-1;
			} 
		arrayWithDiv[numActiveItem] = arrayWithDiv[numActiveItem].classList.add("highlight");
		arrayWithDiv[numActiveItem] = arrayWithDiv[numActiveItem - 1].classList.remove("highlight");
	} else if(e.keyCode === 37) {
		numActiveItem--;
		if(numActiveItem < 0) {
			numActiveItem = 0;
		}
		arrayWithDiv[numActiveItem] = arrayWithDiv[numActiveItem].classList.add("highlight");
		arrayWithDiv[numActiveItem] = arrayWithDiv[numActiveItem + 1].classList.remove("highlight");
	} else if(e.keyCode === 40){
		numActiveItem += 3;
			if(numActiveItem > arrayWithDiv.length-1) {
			numActiveItem -= 3;
		}	
		arrayWithDiv[numActiveItem] = arrayWithDiv[numActiveItem].classList.add("highlight");
		arrayWithDiv[numActiveItem] = arrayWithDiv[numActiveItem - 3].classList.remove("highlight");
	} else if(e.keyCode === 38){
		numActiveItem -= 3;
			if(numActiveItem < 0) {
			numActiveItem += 3;
		}
		arrayWithDiv[numActiveItem] = arrayWithDiv[numActiveItem].classList.add("highlight");		
		arrayWithDiv[numActiveItem] = arrayWithDiv[numActiveItem + 3].classList.remove("highlight");	
	}
}

addEventListener("keydown", navigateThrough);

function loadPhotos(tag) {
	var method = "flickr.photos.getRecent";
	if(tag.tag.value != false) {
		method = 'flickr.photos.search';
	} 
	var xhr = new XMLHttpRequest();
	xhr.open(`GET`, `https://api.flickr.com/services/rest/?method=${method}&api_key=86760811be8963cf6ba64ff389effbb6&tags=${tag.tag.value}&format=json&nojsoncallback=1`, true);
	xhr.send();
	xhr.onreadystatechange = function() { 
  	if (xhr.readyState != 4) return;
	if (xhr.status != 200) {
    	alert(xhr.status + ': ' + xhr.statusText);
  	} else {
  		var myPhotos = JSON.parse(xhr.responseText);
  		var classItems = document.getElementsByClassName("item-wrap");
		var arrayWithPhotos = myPhotos.photos.photo;
		for(var i = 0; i < classItems.length; i++) {
			var url = "<img background-size = cover height="+"120px "+"width="+"220px"+" src=http://farm" + arrayWithPhotos[i].farm + ".staticflickr.com/" + arrayWithPhotos[i].server + "/" +arrayWithPhotos[i].id + "_" + arrayWithPhotos[i].secret + ".jpg>";
			classItems[i].innerHTML = url;
		}
   		}
	}
}	



