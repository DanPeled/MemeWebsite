import os
import json

meme_directory = 'memes'
filenames = [filename for filename in os.listdir(meme_directory) if os.path.isfile(os.path.join(meme_directory, filename))]
filenames.remove("meme-list.json")
with open('memes/meme-list.json', 'w') as json_file:
    json.dump(filenames, json_file)
print("Done.")