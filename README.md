# MemeWebsite
A meme website

# Javascript (index.js)
## loadRandomMeme()
This function loads a random meme when the "Load Random Meme" button is clicked. It fetches the list of available meme filenames, selects a random filename, and displays the corresponding meme (image or video). It updates the meme ID, download link, and enables sharing for the displayed meme.

## loadMemeButtonFunc()
Triggered by the "Load Specific Meme" button, this function prompts the user to enter a meme ID. If a valid ID is provided, it attempts to load the corresponding meme.

## loadMeme(memeIndex)
Loads a meme with a specific index. It fetches the meme list, verifies the index's validity, and displays the chosen meme. If the index is invalid, it shows an error message and a placeholder image.

## shareMeme()
Handles sharing functionality. Clicking the "Share" button tries to share the current meme using the Web Share API. If supported, a share dialog appears; otherwise, an error message displays.

## fetchMemesList()
An asynchronous function fetching the list of available meme filenames from memes/meme-list.json and returning it.

## displayMeme(memeFilename)
Displays memes (images or videos) based on provided filenames. Determines the content type and updates the memesContainer section accordingly.

# Python (generate_filenames.py)
This script updates the meme list stored in memes/meme-list.json.

## Work Process : 
1.Reads existing filenames from the JSON file (if it exists).
1.Retrieves a list of all filenames in the memes directory.
1.Combines existing and new filenames (excluding meme-list.json).
1.Writes the updated list back to the JSON file, ensuring the meme list remains up to date.
