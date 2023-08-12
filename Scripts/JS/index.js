let previosmeme = 0;
document.getElementById('loadRandommemesButton').addEventListener('click', loadRandomMeme);
document.getElementById("loadMemeButton").addEventListener('click', loadMemeButtonFunc)
screen.orientation.lock("portrait");
async function loadRandomMeme() {
    try {
        const memesImage = document.getElementById('memesImage');
        const memesVideo = document.getElementById('memesVideo');
        memesVideo.currentTime = 0;
        memesVideo.pause();
        memesVideo.setAttribute('src', null);
        const response = await fetch('memes/meme-list.json'); // Fetch the list of meme filenames
        const memesList = await response.json();

        if (memesList.length === 0) {
            alert('No memes available.');
            return;
        }

        // Choose a random meme filename
        const randomIndex = Math.floor(Math.random() * memesList.length);
        document.getElementById('memeIdText').textContent = `Meme ID: ${randomIndex}`;
        const randomMemeFilename = memesList[randomIndex];

        previosmeme = randomIndex;
        // Display the meme (image or video)
        const memesContainer = document.getElementById('memesContainer');


        // Update the download button's href attribute
        const downloadButton = document.getElementById('downloadButton');
        downloadButton.href = `memes/${randomMemeFilename}`;
        downloadButton.setAttribute('download', randomMemeFilename);

        // Determine whether the random meme is an image or video
        if (randomMemeFilename.endsWith('.jpg') || randomMemeFilename.endsWith('.png') || randomMemeFilename.endsWith('.webp')) {
            memesImage.src = `memes/${randomMemeFilename}`;
            memesImage.style.display = 'block';
            memesVideo.style.display = 'none';
        } else if (randomMemeFilename.endsWith('.mp4') || randomMemeFilename.endsWith('.webm') || randomMemeFilename.endsWith('.mov') || randomMemeFilename.endsWith('.webmp')) {
            memesVideo.src = `memes/${randomMemeFilename}`;
            memesVideo.style.display = 'block';
            memesImage.style.display = 'none';
        } else {
            console.error('Unsupported meme format:', randomMemeFilename);
            return;
        }
    } catch (error) {
        console.error('Error loading memes:', error);
    }
}
async function loadMemeButtonFunc() {
    let text;
    let id = prompt("Please Enter Meme ID:", "0");
    if (id == null || id == "") {
        return;
    } else {
        loadMeme(parseInt(id))
    }
}
async function loadMeme(memeIndex) {
    try {

        const memesImage = document.getElementById('memesImage');
        const memesVideo = document.getElementById('memesVideo');
        memesVideo.currentTime = 0;
        memesVideo.pause();
        memesVideo.setAttribute('src', null);

        const response = await fetch('memes/meme-list.json'); // Fetch the list of meme filenames
        const memesList = await response.json();

        if (memesList.length === 0) {
            alert('No memes available.');
            return;
        }
        if (memeIndex >= memesList.length || memeIndex < 0) {
            document.getElementById('memeIdText').innerHTML = `Meme ID: <span style="color: red; font-weight: bold;">INVALID ID</span>`;
            memesImage.src = 'internalimages/missingmeme.jpg';
            return;
        }
        // Choose a random meme filename
        const randomMemeFilename = memesList[memeIndex];
        document.getElementById('memeIdText').textContent = `Meme ID: ${memeIndex}`;
        previosmeme = memeIndex;
        // Display the meme (image or video)
        const memesContainer = document.getElementById('memesContainer');


        // Update the download button's href attribute
        const downloadButton = document.getElementById('downloadButton');
        downloadButton.href = `memes/${randomMemeFilename}`;
        downloadButton.setAttribute('download', randomMemeFilename);

        // Determine whether the random meme is an image or video
        if (randomMemeFilename.endsWith('.jpg') || randomMemeFilename.endsWith('.png') || randomMemeFilename.endsWith('.webp')) {
            memesImage.src = `memes/${randomMemeFilename}`;
            memesImage.style.display = 'block';
            memesVideo.style.display = 'none';
        } else if (randomMemeFilename.endsWith('.mp4') || randomMemeFilename.endsWith('.webm') || randomMemeFilename.endsWith('.mov') || randomMemeFilename.endsWith('.webmp')) {
            memesVideo.src = `memes/${randomMemeFilename}`;
            memesVideo.style.display = 'block';
            memesImage.style.display = 'none';
        } else {
            console.error('Unsupported meme format:', randomMemeFilename);
            return;
        }

    } catch (error) {
        console.error('Error loading memes:', error);
    }
}


loadRandomMeme();