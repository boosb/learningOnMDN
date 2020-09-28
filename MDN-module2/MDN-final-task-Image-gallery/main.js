const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */

for( var i = 1; i <= 5; i++) {
	if (i<5) {
		const newImage = document.createElement('img');
		newImage.setAttribute('src', 'images/i&kris-' + i + '.jpeg');
		thumbBar.appendChild(newImage);
		newImage.onclick = function(e) {
		displayedImage.src = e.target.src
		}
	} else {

		const newImage = document.createElement('img');
		newImage.setAttribute('src', 'images/i&kris-' + i + '.jpeg');
		thumbBar.appendChild(newImage);
		newImage.onclick = function(e) {
		displayedImage.src = e.target.src
		}
		newImage.style.marginRight = '0px';
	}
}

/* Wiring up the Darken/Lighten button */

btn.onclick = function() {
	if (btn.getAttribute('class') === 'dark') {
		btn.setAttribute('class', 'light');
		btn.textContent = 'Осветлить';
		overlay.style.backgroundColor = 'rgba(0,0,80,0.2)';
	} else {
		btn.setAttribute('class', 'dark');
		btn.textContent = 'Затемнить';
		overlay.style.backgroundColor = 'rgba(0,0,0,0)';
	}
}