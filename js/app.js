const data = [
    {
        title: "Baby Blue",
        singer: "Badfinger",
        cover: "images/Badfinger - Baby Blue.jpg",
        audio: "audio/Badfinger - Baby Blue.mp3",
    },
    {
        title: "All Gone (No Escape)",
        singer: "Gustavo Santaolalla",
        cover: "images/Gustavo Santaolalla - All Gone (No Escape).jpg",
        audio: "audio/Gustavo Santaolalla - All Gone (No Escape).mp3",
    },
    {
        title: "Zombie",
        singer: "The Cranberries",
        cover: "images/The Cranberries - Zombie.jpg",
        audio: "audio/The Cranberries - Zombie.mp3",
    },
    {
        title: "I Want To Break Free",
        singer: "Queen",
        cover: "images/Queen - I Want To Break Free.jpg",
        audio: "audio/Queen - I Want To Break Free.mp3",
    },
    {
        title: "Way to Fall",
        singer: "Starsailor",
        cover: "images/Starsailor - Way to Fall.jpg",
        audio: "audio/Starsailor - Way to Fall.mp3",
    },
];

const nextBtn = document.querySelector(".next");
const play_pauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector(".prev");
const title = document.querySelector(".title");
const singer = document.querySelector(".singer");
const coverImg = document.querySelector(".cover__img");
const track = document.querySelector(".track");
const timeline = document.querySelector(".timeline");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");

const displayContent = (ind) => {
    title.textContent = data[ind].title;
    singer.textContent = data[ind].singer;
    coverImg.src = data[ind].cover;
    track.src = data[ind].audio;
};

let isPlaying = false;
let counter = 0;
displayContent(counter);

play_pauseBtn.addEventListener("click", () => {
    playMusic(isPlaying);
    isPlaying = !isPlaying;
    handlePlayIcon(isPlaying);
});

nextBtn.addEventListener("click", () => {
    counter++;
    handleNext_PrevBtns();
    displayContent(counter);
    playMusic(!isPlaying);
});

prevBtn.addEventListener("click", () => {
    counter--;
    handleNext_PrevBtns();
    displayContent(counter);
    playMusic(!isPlaying);
});

track.addEventListener("ended", () => {
    counter++;
    if (counter === data.length) {
        counter = 0;
    }
    handleNext_PrevBtns();
    displayContent(counter);
    playMusic(!isPlaying);
});

// Values of timeline
setInterval(() => {
    timeline.max = track.duration;
    duration.textContent = timeFormat(track.duration);
    timeline.value = track.currentTime;
    currentTime.textContent = timeFormat(track.currentTime);
}, 500);

timeline.addEventListener("click", () => {
    track.currentTime = timeline.value;
});

const handlePlayIcon = (status) => {
    play_pauseBtn.classList.remove(`fa-${status ? `play` : `pause`}`);
    play_pauseBtn.classList.add(`fa-${status ? `pause` : `play`}`);
};

const handleNext_PrevBtns = () => {
    if (counter <= 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (counter === data.length - 1) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
};

const playMusic = (status) => {
    if (status) {
        track.pause();
    } else {
        track.play();
    }
};

const timeFormat = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec - minutes * 60);

    return `${numberFormat(minutes)}:${numberFormat(seconds)}`;
};

const numberFormat = (num) => {
    return num < 10 ? `0${num}` : num;
};
