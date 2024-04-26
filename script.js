const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiKey = 'jOMUnqYHbOgG8DtToqpOduPCASX5VV27mF763sqDOww';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// check if all images were loaded 
function imageLoaded() {
imagesLoaded++;

if(imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
    count = 30;
}
}

// Helper function to set attributes on Dom elements 
function setAttributes(element, attributes){
    for(const key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}
// create elements for links and photos, add to DOM 
function displayPhotos(){
    imagesLoaded= 0;
    totalImages = photosArray.length;

    //run function for each object in photos array
    photosArray.forEach((photo) => {
        //create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //Create image for photo  
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event Lisneter, check when each is finished loading 
        img.addEventListener('load', imageLoaded);
        // put img inside <a>, then puth both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from Unsplash Api 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch (error){
    }
}
// Check to see if scrolling near bottom of page, Load more photos 
window.addEventListener('scroll', () => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
     getPhotos();
   }
});
// on load 
getPhotos();