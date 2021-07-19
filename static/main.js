// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector('audio');
const playIcon = document.querySelector('#play');
const pauseIcon = document.querySelector('#pause');
const genre = document.querySelector('#genre');

const genre_tune_table = {
                            classical: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -7.1, -7.1, -7.1, 9.6],
                            blues    : [4.8, 1.6, 0.0, -2.4, 3.9, 7.9, 9.6, -7.1, 11.1, 11.9], //used soft here
                            raggae   : [0.0, 0.0, 0.0, -5.5, 0.0, 6.4, 0.0, 0.0, 0.0, 0.0],
                            rock     : [7.9, 4.8, -5.5, -7.9, -3.2, -3.9, 8.8, 11.1, 11.1, 11.1],
                            metal    : [7.1, 5.5, 0.0, -7.1, -4.8, 1.6, 7.9, 11.1, 11.9, 11.9], // used fullbassand treble
                            disco    : [7.1, 7.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -7.1, -7.1], // used party
                            jazz     : [-4.8, 0.0, 3.9, 5.5, 5.5, 5.5, 3.9, 2.4, 2.4, 2.4], // used live
                            hiphop   : [7.1, 5.5, 0.0, -7.1, -4.8, 1.6, 7.9, 11.1, 11.9, 11.9],// used fullbassand treble
                            country  : [7.1, 5.5, 0.0, -7.1, -4.8, 1.6, 7.9, 11.1, 11.9, 11.9],// used fullbassand treble
                            pop      : [-1.6, 4.8, 7.1, 7.9, 5.5, 0.0, -2.4, -2.4, -1.6,- 1.6],
                        }

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

var gainNode = audioContext.createGain();
var filterNode = audioContext.createBiquadFilter();

filterNode.type = 'bandpass';

track.connect(audioContext.destination);
track.connect(filterNode);

filterNode.connect(gainNode);
gainNode.connect(audioContext.destination);

filterNode.connect(audioContext.destination);

// select our play button
const playButton = document.querySelector('#button');

playButton.addEventListener('click', function() {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
        setPause();
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
        setPlay();
    }
}, false);

audioElement.addEventListener('ended', () => {
  playButton.dataset.playing = 'false';
}, false);

const setPlay = (()=>{
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
})

const setPause = (()=>{
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
})

var biquadFilterFrequencySlider = document.querySelector('#biquadFilterFrequencySlider');
var biquadFilterDetuneSlider = document.querySelector('#biquadFilterDetuneSlider');
var biquadFilterQSlider = document.querySelector('#biquadFilterQSlider');

biquadFilterFrequencySlider.oninput = function(evt){
    filterNode.frequency.value = parseFloat(evt.target.value);
    console.log(evt.target.value)
};

biquadFilterDetuneSlider.oninput = function(evt){
    filterNode.detune.value = parseFloat(evt.target.value);
    console.log(evt.target.value)
};

biquadFilterQSlider.oninput = function(evt){
    filterNode.Q.value = parseFloat(evt.target.value);
    console.log(evt.target.value)
};


var equalizeTrack = (tune_list)=>{
    
        filterNode.frequency.value = 60;
        filterNode.gain.value = tune_list[0];
        document.querySelector('#metric1').innerHTML = tune_list[0];
        
        filterNode.frequency.value = 170;
        filterNode.gain.value = tune_list[1];
        document.querySelector('#metric2').innerHTML = tune_list[1];
        
        filterNode.frequency.value = 310;
        filterNode.gain.value = tune_list[2];
        document.querySelector('#metric3').innerHTML = tune_list[2];
        
        filterNode.frequency.value = 600;
        filterNode.gain.value = tune_list[3];
        document.querySelector('#metric4').innerHTML = tune_list[3];
        
        filterNode.frequency.value = 1000;
        filterNode.gain.value = tune_list[4];
        document.querySelector('#metric5').innerHTML = tune_list[4];
        
        filterNode.frequency.value = 3000;
        filterNode.gain.value = tune_list[5];
        document.querySelector('#metric6').innerHTML = tune_list[5];
        
        filterNode.frequency.value = 6000;
        filterNode.gain.value = tune_list[6];
        document.querySelector('#metric7').innerHTML = tune_list[6];
        
        filterNode.frequency.value = 12000;
        filterNode.gain.value = tune_list[7];
        document.querySelector('#metric8').innerHTML = tune_list[7];
        
        filterNode.frequency.value = 14000;
        filterNode.gain.value = tune_list[8];
        document.querySelector('#metric9').innerHTML = tune_list[8];
        
        filterNode.frequency.value = 16000;
        filterNode.gain.value = tune_list[9];
        document.querySelector('#metric10').innerHTML = tune_list[9];

        filterNode.Q.value = parseFloat(0.5);
        console.log("optimized..!!!")
        
    }

var equalizeButton = document.querySelector('#equalize');
var heartButton = document.querySelector('#heart');
var optimizationDiv = document.querySelector('#equalize');

setTimeout(() => {
    let tune_list = genre_tune_table[genre.innerHTML]
    equalizeTrack(tune_list);
    optimizationDiv.innerHTML = `Sound optimized for - ${genre.innerHTML} genre`
}, 10000);

equalizeButton.addEventListener('click', ()=>{
    let tune_list = genre_tune_table[genre.innerHTML]
    equalizeTrack(tune_list);
    console.log("uptimized up")
})
heartButton.addEventListener('click', ()=>{
    let tune_list = genre_tune_table[genre.innerHTML]
    equalizeTrack2(tune_list);
    console.log("uptimized down")
})