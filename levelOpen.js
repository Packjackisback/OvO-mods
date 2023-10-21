//code HEAVILY based on Awesomeguy's. (https://arjun99ab.github.io) assumes you have a folder to source .json files from. WILL NOT WORK BY ITSELF, YOU NEED TO HOST AND MODIFY THE CODE. (This is mainly for me to base other things on)
(function() {
    let loadLevelFromFile = async (levelFileName) => {
        // Load the level data from a JSON file
        let levelData = await fetch('../src/communitylevels/' + levelFileName)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error loading level data:', error);
            });

        if (levelData) {
            if (typeof ovoLevelEditor !== 'undefined') {
                ovoLevelEditor.startLevel(levelData);
            } else {
                console.error('ovoLevelEditor is not defined. Make sure you are in the game environment.');
            }
        }
    };

    loadLevelFromFile('Beyond.json'); // Change the filename as needed
})();
