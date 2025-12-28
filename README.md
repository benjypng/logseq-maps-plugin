# logseq-maps-plugin
![Version](https://img.shields.io/github/v/release/benjypng/logseq-maps-plugin?style=flat-square&color=0969da) ![Downloads](https://img.shields.io/github/downloads/benjypng/logseq-maps-plugin/total?style=flat-square&color=orange) ![License](https://img.shields.io/github/license/benjypng/logseq-maps-plugin?style=flat-square)

> Add maps to your notes to journal the places you have been.

---

## ✨ Features
- Add maps (courtesy of Open Street Maps) to your notes
- Easily extract coordinate from Google Maps links
- Customise marker colours

## 📸 Screenshots / Demo
![my](https://github.com/user-attachments/assets/bea59ee4-5d10-4158-81b0-bdb49e2a3d7b)


## ⚙️ Installation
1.  Open Logseq.
2.  Go to the **Marketplace** (Plugins > Marketplace).
3.  Search for **logseq-todoist-plugin**.
4.  Click **Install**.

## 🛠 Usage & Settings

#### Setting Up (for Logseq DB)
- Open plugin settings and customise the tag name that will be used to tag your blocks that will appear as markers on the map.
- Open the command palette and run `Create required tag and props`.
- This will create the tag `Location` and add two properties to the tag: `map-url` and `marker-color`

#### Adding Map and Markers
1. Tag your block with the tag `#Location`. This creates two properties: `map-url` and `marker-color`.
2. Add the Google Maps link to your `map-url` property.
3. Add a colour to the `marker-color` property.
4. Go to any block on the same page and insert the map container using the slash command `Add map container`
5. Continue to add in other blocks tagged with `#Location` and the map will pick up these locations and create them as markers

## ☕️ Support
If you enjoy this plugin, please consider supporting the development!

<div align="center">
  <a href="https://github.com/sponsors/benjypng"><img src="https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=for-the-badge&logo=github" alt="Sponsor on Github" /></a>&nbsp;<a href="https://www.buymeacoffee.com/hkgnp.dev"><img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee" /></a>
</div>

## 🤝 Contributing
Issues are welcome. If you find a bug, please open an issue. Pull requests are not accepted at the moment as I am not able to commit to reviewing them in a timely fashion.

## ❤️ Credits
- Open Street Maps.
