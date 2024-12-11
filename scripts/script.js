const now_playing=document.querySelector(".now-playing");
const track_art=document.querySelector(".track-pic");
const track_name=document.querySelector(".track-name");
const track_artist=document.querySelector(".track-artist");

const playpause_btn=document.querySelector(".playpause-btn");
const prev_btn=document.querySelector(".prev-btn");
const next_btn=document.querySelector(".next-btn");

const seek_slider=document.querySelector(".seek-slider");
const curr_time=document.querySelector(".current-time");
const total_duration=document.querySelector(".total-duration");
const randomIcon=document.querySelector(".ri-shuffle-line");
const curr_track=document.createElement("audio");

let track_index=0;
let isPlaying=false;
let isRandom=false;
let updateTimer;

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src=music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage="url("+music_list[track_index].img+")";
    track_art.style.backgroundSize="cover";
    track_name.innerHTML=music_list[track_index].name;
    track_artist.innerHTML=music_list[track_index].artist;

    updateTimer=setInterval(setUpdate,1000);

    curr_track.addEventListener("ended",nextTrack);
}

function reset(){
    curr_time.innerHTML="00:00";
    total_duration.innerHTML="00:00";
    seek_slider.value=0;
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack(){
    isPlaying?pauseTrack():playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying=true;
    playpause_btn.innerHTML='<i class="ri-pause-large-line"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying=false;
    playpause_btn.innerHTML='<i class="ri-play-large-fill"></i>';
}

function prevTrack(){
    if(track_index>0){
        track_index-=1;
    }
    else{
        track_index=music_list.length-1;
    }
    loadTrack(track_index);
    playTrack();
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}