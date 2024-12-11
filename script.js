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

const music_list=[
    {
        img:"./media/mediapic/img1.jpg",
        name:"One Of The Girls",
        artist:"Jennie Kim, Lily-Rose Depp, and The Weeknd",
        music:"./media/mediasong/One-Of-The-Girls.mp3"
    },
    {
        img:"./media/mediapic/img2.jpg",
        name:"Heat Waves",
        artist:"Glass Animals",
        music:"./media/mediasong/Heat-Waves.mp3"
    },
    {
        img:"./media/mediapic/img3.jpg",
        name:"Summertime Sadness",
        artist:"Lana Del Rey",
        music:"./media/mediasong/Summertime-Sadness.mp3"
    },
    {
        img:"./media/mediapic/img4.jpg",
        name:"Best of Me",
        artist:"NEFFEX",
        music:"./media/mediasong/NEFFEX - Best of Me.mp3"
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src=music_list[track_index].music;
    curr_track.load();

    
}