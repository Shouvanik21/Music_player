// const music_player=document.querySelector(".player");
// const main_element=document.querySelector(".main");
const toggle_player1=document.querySelector(".toggle1");
const toggle_player2=document.querySelector(".toggle2");
const track_art=document.querySelector(".track-pic");
const track_name=document.querySelector(".track-name");
const track_artist=document.querySelector(".track-artist");
// const track_art2=document.querySelector(".pic");
// const track_name2=document.querySelector(".name");
// const track_artist2=document.querySelector(".artist");

const playpause_btn=document.querySelector(".playpause-btn");
const prev_btn=document.querySelector(".prev-btn");
const next_btn=document.querySelector(".next-btn");
// const playpause_btn2=document.querySelector(".playpause-btn2");
// const prev_btn2=document.querySelector(".prev-btn2");
// const next_btn2=document.querySelector(".next-btn2");

const seek_slider=document.querySelector(".seek-slider");
const curr_time=document.querySelector(".current-time");
const total_duration=document.querySelector(".total-duration");
// const seek_slider2=document.querySelector(".seek-slider2");
// const curr_time2=document.querySelector(".current-time2");
// const total_duration2=document.querySelector(".total-duration2");
const randomIcon=document.querySelector(".ri-shuffle-line");
const curr_track=document.createElement("audio");
// const curr_track2=document.createElement("audio");

let track_index=0;
let isPlaying=false;
let isRandom=false;
let updateTimer;
let isHidden=false;

// toggle_player.addEventListener("click", function(){
//     (isHidden=!isHidden),
//     isHidden
//         ?(music_player.classList.remove("container2"),
//         (music_player.appendChild(main_element)))
//         :(music_player.classList.add("player2"),
//         (main_element.remove()));
// });

toggle_player1.addEventListener("click",function(){
    const container1=document.getElementById("container1");
    const container2=document.getElementById("container2");

    if (container1.style.display === 'flex' || container1.style.display === '') {
        container1.style.display = 'none';
        container2.style.display = 'flex';
      } else if(container2.style.display === 'flex' || container2.style.display === '') {
        container1.style.display = 'flex';
        container2.style.display = 'none';
      }
      else{
        console.log("no such cases found");
      }
});
toggle_player2.addEventListener("click",function(){
    const container1=document.getElementById("container1");
    const container2=document.getElementById("container2");

    if (container1.style.display === 'flex' || container1.style.display === '') {
        container1.style.display = 'none';
        container2.style.display = 'flex';
      } else if(container2.style.display === 'flex' || container2.style.display === '') {
        container1.style.display = 'flex';
        container2.style.display = 'none';
      }
      else{
        console.log("no such cases found");
      }
});

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src=music_list[track_index].music;
    // curr_track2.src=music_list[track_index].music;
    curr_track.load();
    // curr_track2.load();

    track_art.style.backgroundImage="url("+music_list[track_index].img+")";
    track_art.style.backgroundSize="cover";
    track_name.innerHTML=music_list[track_index].name;
    track_artist.innerHTML=music_list[track_index].artist;
    // track_art2.style.backgroundImage="url("+music_list[track_index].img+")";
    // track_art2.style.backgroundSize="cover";
    // track_name2.innerHTML=music_list[track_index].name;
    // track_artist2.innerHTML=music_list[track_index].artist;

    updateTimer=setInterval(setUpdateTimer,1000);
    // updateTimer=setInterval(setUpdateTimer2,1000);

    curr_track.addEventListener("ended",nextTrack);
    // curr_track2.addEventListener("ended",nextTrack);
}

function reset(){
    curr_time.innerHTML="00:00";
    total_duration.innerHTML="00:00";
    seek_slider.value=0;
    // curr_time2.innerHTML="00:00";
    // total_duration2.innerHTML="00:00";
    // seek_slider2.value=0;
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
    // curr_track2.play();
    isPlaying=true;
    playpause_btn.innerHTML='<i class="ri-pause-large-line"></i>';
    // playpause_btn2.innerHTML='<i class="ri-pause-large-line"></i>';
}
function pauseTrack(){
    curr_track.pause();
    // curr_track2.pause();
    isPlaying=false;
    playpause_btn.innerHTML='<i class="ri-play-large-fill"></i>';
    // playpause_btn2.innerHTML='<i class="ri-play-large-fill"></i>';
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
    // let seekto2 = curr_track2.duration * (seek_slider2.value / 100);
    // curr_track2.currentTime = seekto2;
}

function setUpdateTimer(){
    let seekPosition=0;
    if(!isNaN(curr_track.duration)){
        seekPosition=curr_track.currentTime*(100/curr_track.duration);
        seek_slider.value=seekPosition;

        let currentMinutes=Math.floor(curr_track.currentTime/60);
        let currentSeconds=Math.floor(curr_track.currentTime-currentMinutes*60);
        let totalMinutes=Math.floor(curr_track.duration/60);
        let totalSeconds=Math.floor(curr_track.duration-totalMinutes*60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(totalSeconds < 10) { totalSeconds = "0" + totalSeconds; }
        if(totalMinutes < 10) { totalMinutes = "0" + totalMinutes; }

        curr_time.textContent=currentMinutes+":"+currentSeconds;
        total_duration.textContent=totalMinutes+":"+totalSeconds;
    }
}
// function setUpdateTimer2(){
//     let seekPosition2=0;
//     if(!isNaN(curr_track2.duration)){
//         seekPosition=curr_track2.currentTime*(100/curr_track2.duration);
//         seek_slider2.value=seekPosition;

//         let currentMinutes=Math.floor(curr_track2.currentTime/60);
//         let currentSeconds=Math.floor(curr_track2.currentTime-currentMinutes*60);
//         let totalMinutes=Math.floor(curr_track2.duration/60);
//         let totalSeconds=Math.floor(curr_track2.duration-totalMinutes*60);

//         if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
//         if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
//         if(totalSeconds < 10) { totalSeconds = "0" + totalSeconds; }
//         if(totalMinutes < 10) { totalMinutes = "0" + totalMinutes; }

//         curr_time2.textContent=currentMinutes+":"+currentSeconds;
//         total_duration2.textContent=totalMinutes+":"+totalSeconds;
//     }
// }