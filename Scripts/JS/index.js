document.getElementById('loadRandommemesButton').addEventListener('click', loadRandomMeme);
document.getElementById('loadMemeButton').addEventListener('click', loadMemeButtonFunc);
screen.orientation.lock('portrait');

const memesImage = document.getElementById('memesImage');
const memesVideo = document.getElementById('memesVideo');
const memeIdText = document.getElementById('memeIdText');
const downloadButton = document.getElementById('downloadButton');
const memesContainer = document.getElementById('memesContainer');
const shareButton = document.getElementById('shareButton');
shareButton.addEventListener('click', shareMeme);

let previosmeme = 0;
async function fetchMemesList() {
    const response = await fetch('memes/meme-list.json');
    memesList = await response.json();
    return memesList;
}
let  memesList = fetchMemesList();

function displayMeme(memeFilename) {
    const isImage = /\.(jpg|png|webp|PNG|gif|GIF)$/i.test(memeFilename);
    const isVideo = /\.(mp4|webm|mov|webmp)$/i.test(memeFilename);

    if (isImage) {
        memesImage.src = `memes/${memeFilename}`;
        memesImage.style.display = 'block';
        memesVideo.style.display = 'none';
    } else if (isVideo) {
        memesVideo.src = `memes/${memeFilename}`;
        memesVideo.style.display = 'block';
        memesImage.style.display = 'none';
    } else {
        console.error('Unsupported meme format:', memeFilename);
    }
}

async function loadRandomMeme() {
    try {
        await fetchMemesList();
        memesVideo.pause();
        memesVideo.src = '';

        if (memesList.length === 0) {
            alert('No memes available.');
            return;
        }

        const randomIndex = Math.floor(Math.random() * memesList.length);
        memeIdText.textContent = `Meme ID: ${randomIndex}`;
        const randomMemeFilename = memesList[randomIndex];

        previosmeme = randomIndex;
        downloadButton.href = `memes/${randomMemeFilename}`;
        downloadButton.setAttribute('download', randomMemeFilename);
        displayMeme(randomMemeFilename);

    } catch (error) {
        console.error('Error loading memes:', error);
    }
}

async function loadMemeButtonFunc() {
    const id = prompt('Please Enter Meme ID:', '0');

    if (!id) {
        return;
    }

    const memeIndex = parseInt(id);
    if (!isNaN(memeIndex)) {
        loadMeme(memeIndex);
    }
}

async function loadMeme(memeIndex) {
    try {
        memesVideo.pause();
        memesVideo.src = '';

        if (memesList.length === 0) {
            alert('No memes available.');
            return;
        }

        if (memeIndex >= memesList.length || memeIndex < 0) {
            memeIdText.innerHTML = `Meme ID: <span style="color: red; font-weight: bold;">INVALID ID</span>`;
            memesImage.src = 'internalimages/missingmeme.jpg';
            return;
        }

        const randomMemeFilename = memesList[memeIndex];
        memeIdText.textContent = `Meme ID: ${memeIndex}`;
        previosmeme = memeIndex;
        downloadButton.href = `memes/${randomMemeFilename}`;
        downloadButton.setAttribute('download', randomMemeFilename);
        displayMeme(randomMemeFilename);

    } catch (error) {
        console.error('Error loading memes:', error);
    }
}
async function shareMeme() {
    try {        
        if (memesList.length === 0) {
            alert('No memes available.');
            return;
        }
        
        const memeFilename = memesList[previosmeme]; // Using the index of the previously loaded meme
        const memeUrl = `memes/${memeFilename}`;

        const response = await fetch(memeUrl);
        const blob = await response.blob();

        if (navigator.share) {
            await navigator.share({
                files: [new File([blob], memeFilename, { type: blob.type })],
                title: 'Check out this meme!',
                text: 'Enjoy this hilarious meme from Memesite!',
            });
        } else {
            alert('Web Share API is not supported in this browser.');
        }
    } catch (error) {
        console.error('Error sharing meme:', error);
    }
}


loadRandomMeme();

const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    
    // Toggle SVG fill color by modifying the style attribute
    if (body.classList.contains("light-mode")) {
        body.style.setProperty("--svg-fill", "var(--svg-fill-light)");
    } else {
        body.style.setProperty("--svg-fill", "var(--svg-fill-dark)");
    }
});
