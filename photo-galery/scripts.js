//photo details
import { photos } from './images.js'; //importing array with the main images and details
let currentphoto = 0;

//change picture to the next one
$("#forward").on("click", function () {
    if (currentphoto < 10) {
        currentphoto++
        if (currentphoto == 10) {
            currentphoto = 0
        }
    }
    showphoto();
    showthumbnails();
    pausesample();
    update_audio_details();
});

//change picture to the previous one
$("#back").on("click", function () {
    if (currentphoto > -1) {
        currentphoto--
        if (currentphoto == -1) {
            currentphoto = photos.length - 1
        }
    }
    showphoto();
    showthumbnails();
    pausesample();
    update_audio_details();
});

//show the chosen or default images and details
function showphoto() {
    $('#photo').attr('src', photos[currentphoto].photo);
    $('#photo-title').text(photos[currentphoto].title);
    $('#photo-description').text(photos[currentphoto].description);
}
showphoto();

//list thumbnails
function showthumbnails() {
    let container = document.querySelector(".small-container")
    container.innerHTML = ("")
    photos.forEach((element, index) => {
        if (index == currentphoto) {
            container.innerHTML += (`<img id="${index}" class="thumbnail current" src="${element.photo}">`)

        } else {
            container.innerHTML += (`<img id="${index}" class="thumbnail" src="${element.photo}">`)
        }
    });
}
showthumbnails();

//change highlighted picture based on which thumbnail the user chose
$(document).on("click", ".thumbnail", function () {
    let ID = jQuery(this).attr("id")
    currentphoto = ID
    showphoto();
    showthumbnails();
    pausesample();
    update_audio_details();
});

//handling of starting and stopping songs with icon changes
let audio = document.querySelector(".audio")
let songofband = photos[currentphoto].song //initial load
let song = new Audio(songofband)

function update_audio_details() {
    audio = document.querySelector(".audio")
    songofband = photos[currentphoto].song
    song = new Audio(songofband)
}

$(document).on("click", "#play", function playsample() {
    song.play();
    jQuery(audio).attr("id", "pause")
    jQuery(audio).attr("src", "images/pause.png")
});

function pausesample() {
    song.pause();
    jQuery(audio).attr("id", "play")
    jQuery(audio).attr("src", "images/playbutton.png")
}

$(document).on("click", "#pause", function () {
    pausesample();
});