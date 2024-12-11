const now_playing=document.querySelector(".now-playing");
const track_art=document.querySelector(".track-pic");
const track_name=document.querySelector(".track-name");
const track_artist=document.querySelector(".track-artist");

const playpause_btn=document.querySelector(".playpause-btn");
const prev_btn=document.querySelector(".prev-btn");
const next_btn=document.querySelector(".next-btn");

const seek_slider=document.querySelector(".now-playing");
const curr_time=document.querySelector(".now-playing");
const total_duration=document.querySelector(".now-playing");
const randomIcon=document.querySelector(".ri-shuffle-line");
const curr_track=document.createElement("audio");

let track_index=0;
let isPlaying=false;
let isRandom=false;
let updateTimer;