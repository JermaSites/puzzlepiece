var SELECTOR_SCREEN_ELEMENT = '.screen';
var SELECTOR_SWITCHER_TV = '#switcher-tv';
var timeline;
var money = 500000000;

var refreshIntervalId;
// Initialize
$(document).ready(buildTimeline);

var sawMusic = new Audio('media/sawmusic.mp3');
var sawMessage = new Audio('media/JigsawChallengeNormal.mp3');
var sawFinish = new Audio('media/JigsawCongratsNormal.mp3');

function start() {
    document.getElementById("clickMe").style.display = "none";
    document.getElementsByClassName("screen")[0].style.backgroundImage = 'url("media/static.gif")';
    var audio = new Audio('media/transition.mp3');
    audio.play();
    setTimeout( function() { 
        sawMusic.play();
        sawMusic.loop = true; 
        sawMessage.play();
        sawMusic.volume = 0.5;
        changeGif();
        setInterval(changeGif, 1000);
        setTimeout( function() { 
            // sawMusic.pause();
            sawMusic.volume = 1;
            document.getElementById("content").style.display = 'flex';
            document.getElementsByClassName("screen")[0].style.backgroundImage = 'url("media/static.gif")';
            var audio = new Audio('media/transition.mp3');
            audio.play();
            setTimeout( function() { 
                timeline.restart();
                var el = document.getElementById("timer");
                od = new Odometer({
                  el: el,
                  value: money,
                  duration: 1000,
                  // Any option (other than auto and selector) can be passed in here
                  format: '(,ddd).dd',
                  theme: 'digital'
                });
                el.style.color = "red";
                refreshIntervalId = setInterval(runClock, 1000);
                el.style.backgroundSize = "0%";
                initCube3d();
            }, 600);
        }, 40960);
    }, 600);
}

function buildTimeline() {
    timeline = new TimelineMax({
      paused: true
    });
    
    timeline
    .to(SELECTOR_SCREEN_ELEMENT, .2, {
      width: '100vw',
      height: '2px',
      background: '#ffffff',
      ease: Power2.easeOut
    })
    .to(SELECTOR_SCREEN_ELEMENT, .2, {
      width: '0',
      height: '0',
      background: '#ffffff'
    });
}

function runClock () {
  money = money - 16600;
  od.update(money);
}

function changeGif () {
  document.getElementsByClassName("screen")[0].style.backgroundImage = 'url("media/gifs/jigsaw' + (Math.floor(Math.random()*5) + 1) + '.gif")';
}

function initCube3d() {
  var useLockedControls = true,
    controls = useLockedControls ? ERNO.Locked : ERNO.Freeform;

  var ua = navigator.userAgent,
    isIe = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1;

  window.cube = new ERNO.Cube({
    hideInvisibleFaces: true,
    controls: controls,
    renderer: isIe ? ERNO.renderers.IeCSS3D : null
  });

  var container = document.getElementById( 'cube' );
  container.appendChild( cube.domElement );

  if( controls === ERNO.Locked ){
    var fixedOrientation = new THREE.Euler(  Math.PI * 0.1, Math.PI * -0.25, 0 );
    cube.object3D.lookAt( cube.camera.position );
    cube.rotation.x += fixedOrientation.x;
    cube.rotation.y += fixedOrientation.y;
    cube.rotation.z += fixedOrientation.z;
  }	
  cube.shuffle(10);
  cube.addEventListener('onTwistComplete', function() {
    console.log(cube.isSolved());
    if(cube.isSolved()) {
      jermaDone();
    }
  });
}

function jermaDone() {
  sawFinish.play();
  clearInterval(refreshIntervalId);
  timeline.reverse();
  setTimeout( function() { 
    timeline.restart();
    document.getElementById("cube").remove();
    var winText = document.createElement("div");
    winText.innerHTML = "Final money tally: ";
    winText.id = "winText";
    document.getElementById("content").prepend(winText);
    document.getElementById('timer').style.animationPlayState = 'paused';
  }, 11285);
}