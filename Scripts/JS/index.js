document.getElementById('loadRandommemesButton').addEventListener('click', loadRandomMeme);
document.getElementById('loadMemeButton').addEventListener('click', loadMemeButtonFunc);
screen.orientation.lock('portrait');

const memesImage = document.getElementById('memesImage');
const memesVideo = document.getElementById('memesVideo');
const memeIdText = document.getElementById('memeIdText');
const downloadButton = document.getElementById('downloadButton');
const memesContainer = document.getElementById('memesContainer');

let previosmeme = 0;

async function fetchMemesList() {
    const response = await fetch('memes/meme-list.json');
    const memesList = await response.json();
    return memesList;
}

function displayMeme(memeFilename) {
    const isImage = /\.(jpg|png|webp|PNG)$/i.test(memeFilename);
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
        const memesList = await fetchMemesList();
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
        const memesList = await fetchMemesList();
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

loadRandomMeme();
