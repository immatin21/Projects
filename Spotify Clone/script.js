let currentSong = new Audio();
let Songs, track;
let songs;
let currFolder;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

const playmusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + track

    if (!pause) {
        currentSong.play();
        play.src = "pause.svg";
    }

    document.querySelector(".songName").innerHTML = decodeURI(track);
    document.querySelector(".songTime").innerHTML = "00:00/00:00";
}

async function GetSongs(folder) {
    currFolder = folder;
    let a = await fetch(`/${currFolder}/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }

    let SongUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    SongUL.innerHTML = ""
    for (const song of songs) {
        SongUL.innerHTML = SongUL.innerHTML + `<li>
        <img class="invert" src="music.svg" alt="" srcset="">
        <div class="info">
        <div>${song.replace(/%20/g, " ")}</div>
        <div></div>
        </div>
        <div><img id="playnow" src="play.svg" alt="" srcset=""></div>
        </li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })
}

async function displayAlbums() {
    let a = await fetch(`/Songs/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".CardContainer")
    // console.log(anchors)
    let array = Array.from(anchors)
        for (let index = 0; index < array.length; index++) {
            const e = array[index];
            
            if (e.href.includes("/Songs")) {
                let folder = e.href.split("/").slice(-2)[0]
                //accessing folder information
                let a = await fetch(`/Songs/${folder}/info.json`);
                let response = await a.json();
    
                cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="Card">
                <div class="Play_button">
                  <svg class="play-button" width="100" height="100" viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" fill="#1fd164" />
                    <polygon points="40,30 40,70 70,50" fill="black" />
                  </svg>
                </div>
                <img src="/Songs/${folder}/cover.jpg" alt="" srcset="">
                <h3>${response.title}</h3>
                <p>${response.description}</p>
                </div>`
            }
        }
        // An event for load playlist when clicked
        Array.from(document.getElementsByClassName("Card")).forEach(e => {
            e.addEventListener("click", async items => {
                await GetSongs(`Songs/${items.currentTarget.dataset.folder}`);
                playmusic(songs[0]);
            })
        })
    }

async function main() {
    await GetSongs("Songs/ncs");

    playmusic(songs[0], true)

    displayAlbums()

    // when clicks on play.svg it replace with pause.svg
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").pop())
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1])
        }
    })

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").pop())
        if ((index + 1) <= songs.length) {
            playmusic(songs[index + 1])
        }
    })

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })

    hamburger.addEventListener("click", () => {
        document.querySelector(".left-box").style.left = "0"
    })

    cross.addEventListener("click", () => {
        document.querySelector(".left-box").style.left = "-100%"
    })

    // Volume event
    document.querySelector(".range").addEventListener("change", (e) => {
        currentSong.volume = e.target.value / 100
    })

    // Mute event
    document.querySelector("#vol").addEventListener("click",e=>{
        let volIcon = e.target.src.split("/").pop()
        // if(e.target.src.split("/").pop()=="volume.svg"){
        //     e.target.src = volIcon.replace("volume.svg","mute.svg")
            
        //     currentSong.volume = 0;
        // }
        // else{
        //     e.target.src = volIcon.replace("mute.svg","volume.svg")
        //     currentSong.volume = 10/100;
        // }
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg","mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0;
        }
        else{
            e.target.src = e.target.src.replace("mute.svg","volume.svg")
            document.querySelector(".range").getElementsByTagName("input")[0].value=10;
            currentSong.volume = 10/100;
        }
    })

}
main();