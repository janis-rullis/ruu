// Note: Using legacy notation like `var` (and not `let`) for compatibility reasons.

var elem = document.documentElement;
var is_fullscreen=false;
function toggleFullscreen(){
  if(is_fullscreen){
    closeFullscreen();				
  }else{
    openFullscreen();				
  }			
}
function openFullscreen() {
  is_fullscreen = true;
  document.getElementById('fullscreen-btn').style.background = "#d3d3d366";
  if (elem.requestFullscreen) {
  elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
  elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
  elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
  elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
   is_fullscreen = false;
   document.getElementById('fullscreen-btn').style.background = "initial";
  if (document.exitFullscreen) {
  document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
  document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
  document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
  document.msExitFullscreen();
  }
}		

// Activate an image by setting it's target.
function loadLazyPic(lazyPic){		

  // Define used variables.		   
   var sources, source, img;

  // In `source` element.
  sources = lazyPic.querySelectorAll("source")
  var srcCnt = sources.length;			
  for(var j = 0; j < srcCnt; j++){
    source = sources[j];				
    source.srcset = source.dataset.srcset;
  }		

  // In `img` element.
  img = lazyPic.querySelector("img");			

  // https://davidwalsh.name/lazyload-image-fade
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = function() {
    img.removeAttribute('data-src');
  };

  // Mark the image as processed;				
  lazyPic.classList.remove("lazy");			
}

// Activate images by setting their targets.
function loadLazyPics(){

  // Find all images than needs to be loaded with a delay.
   var lazyPics = document.querySelectorAll(".lazy")

  for(var i = 0; i < lazyPics.length; i++){	

    // Execture this every 0,7s. Note, the `* i`, otherwise everything is executed exactly after 0.7s.
    setTimeout(loadLazyPic, 700 * 	i, lazyPics[i]);
  }
}

document.addEventListener("DOMContentLoaded", function() {		   
  loadLazyPics();		   
});
