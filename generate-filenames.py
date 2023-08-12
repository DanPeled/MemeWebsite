import os
import json

meme_directory = 'memes'
existing_filenames = []

# Load existing list of filenames from meme-list.json if it exists
if os.path.exists('memes/meme-list.json'):
    with open('memes/meme-list.json', 'r') as json_file:
        existing_filenames = json.load(json_file)

# Get a list of all filenames in the meme_directory
all_filenames = [filename for filename in os.listdir(meme_directory) if os.path.isfile(os.path.join(meme_directory, filename))]

# Remove meme-list.json from the list of filenames
all_filenames = [filename for filename in all_filenames if filename != "meme-list.json"]

# Combine existing filenames with new filenames (in their original order)
updated_filenames = existing_filenames + [filename for filename in all_filenames if filename not in existing_filenames]

# Write the updated list of filenames back to meme-list.json
with open('memes/meme-list.json', 'w') as json_file:
    json.dump(updated_filenames, json_file, indent=4)

print("Done.")
