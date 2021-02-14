var SELECTOR_SCREEN_ELEMENT = '.screen';
var SELECTOR_SWITCHER_TV = '#switcher-tv';
var timeline;
var money = 500000;

// Initialize
$(document).ready(buildTimeline);

var sawMusic = new Audio('media/sawmusic.mp3');
var sawMessage = new Audio('media/sawmessage.mp3');

function start() {
    document.getElementById("clickMe").style.display = "none";
    document.getElementById("info").style.display = "none";
    document.getElementsByClassName("screen")[0].style.backgroundImage = 'url("media/static.gif")';
    var audio = new Audio('media/transition.mp3');
    audio.play();
    setTimeout( function() { 
        sawMusic.play();
        sawMusic.loop = true; 
        sawMessage.play();
        changeGif();
        setInterval(changeGif, 1000);
        setTimeout( function() { 
            // sawMusic.pause();
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
                  duration: 500,
                  // Any option (other than auto and selector) can be passed in here
                  format: '(,ddd).dd',
                  theme: 'digital'
                });
                el.style.color = "red";
                setInterval(runClock, 1000);
                el.style.backgroundSize = "0%";
            }, 600);
        }, 38163);
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
  money = money - 1666;
  od.update(money);
}

function changeGif () {
  document.getElementsByClassName("screen")[0].style.backgroundImage = 'url("media/gifs/jigsaw' + (Math.floor(Math.random()*5) + 1) + '.gif")';
}