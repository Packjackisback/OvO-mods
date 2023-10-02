(function () {
  // Check if the autosplitter is already running
  if (window.autosplitterRunning) {
    alert('Autosplitter is already running.');
    return;
  }

  // Function to get the current layout name
  function getCurrentLayoutName() {
    const runtime = cr_getC2Runtime();
    return runtime.running_layout.name;
  }

  let previousLayoutName = getCurrentLayoutName();
  let timerStart = 0; // Timestamp when the timer started
  let currentSection = 'Basics'; // Initialize with the first section name
  let previousSection = 'Basics';

  // Function to add a timestamp in milliseconds to the log with animation
  function addTimestampWithAnimation(section) {
    const currentTime = new Date().getTime();
    const logElement = document.getElementById('split-log');

    if (logElement) {
      const splitTime = currentTime - timerStart;
      const timestampItem = document.createElement('li');
      timestampItem.style.color = '#FFD700'; // Set text color to gold
      timestampItem.style.fontFamily = 'Helvetica'; // Set the font
      timestampItem.textContent = `${section}: ${splitTime} ms`;

      // Apply CSS style for animation
      timestampItem.style.transform = 'translateY(-100%)';
      timestampItem.style.transition = 'transform 1s ease-in-out';

      // Insert the new split at the top
      logElement.insertBefore(timestampItem, logElement.firstChild);

      // Trigger the animation
      requestAnimationFrame(function () {
        timestampItem.style.transform = 'translateY(0)';
      });

      // Remove the animation after 1 second
      setTimeout(function () {
        timestampItem.style.transition = '';
      }, 1000);
    }
  }

  function extractLastNumberFromLevelName(levelName) {
    // Use a regular expression to extract the last number from the level name
    const matches = levelName.match(/\d+$/);
  
    // Check if there is a match (a number at the end of the string)
    if (matches && matches.length > 0) {
      // Convert the matched string to an integer
      const lastNumber = parseInt(matches[0], 10);
      return lastNumber;
    }
  
    // Return a default value or handle the case where no number is found
    return -1; // You can choose a suitable default value
  }
  // Function to check for layout name changes and trigger a split
  function checkLayoutChange() {
    const currentLayoutName = getCurrentLayoutName();

    if (currentLayoutName !== previousLayoutName) {
      // Layout name has changed
      let levelNum = extractLastNumberFromLevelName(currentLayoutName);

      if (levelNum >= 1 && levelNum <= 8) {
        currentSection = 'Basics';
        console.log("SET TO BASICS");
      } else if (levelNum >= 9 && levelNum <= 16) {
        currentSection = 'Getting Serious';
        console.log("SET TO GS");
      } else if (levelNum >= 17 && levelNum <= 24) {
        currentSection = 'Higher Order';
        console.log("SET TO HO");
      } else if (levelNum >= 25 && levelNum <= 32) {
        currentSection = 'Mechanics';
        console.log("SET TO MECHANICS");
      } else if (levelNum >= 33 && levelNum <= 40) {
        currentSection = 'OvO Space Program';
        console.log("SET TO OSP");
      } else if (levelNum >= 41 && levelNum <= 48) {
        currentSection = 'Journey Through the Portal';
        console.log("SET TO JTTP");
      } else if (levelNum >= 49 && levelNum <= 52) {
        currentSection = 'Community Levels';
      } else {
        // For other layouts, trigger a split with animation
        addTimestampWithAnimation(currentSection);
      }

      // Update the previous layout name
      previousLayoutName = currentLayoutName;
      console.log("Well men this is i we've reached the if statement");
      // Reset the timer
      if (previousSection !== currentSection)   {
        console.log("Well IDK IT WORKED UP TO HERE");
        timerStart = new Date().getTime();
        previousSection = currentSection;
        addTimestampWithAnimation(currentSection);
      }
    }
    previousSection = currentSection;

    // Continue checking for layout changes
    setTimeout(checkLayoutChange, 100); // Check every 100 milliseconds
  }

  // Function to handle keydown events
  function handleKeyDown(event) {
    const currentLayoutName = getCurrentLayoutName();

    // Check if the key 'r' is pressed and the current layout is "Level 1"
    if (event.key === 'r' && currentLayoutName === 'Level 1') {
      // Restart the timer
      timerStart = new Date().getTime();
    }
  }

  // Add an event listener for keydown events
  document.addEventListener('keydown', handleKeyDown);

  // Create a button for manual splitting
  const splitButton = document.createElement('button');
  splitButton.id = 'split-button';
  splitButton.textContent = 'Split';
  splitButton.style.position = 'fixed';
  splitButton.style.top = '20px';
  splitButton.style.right = '10px';
  splitButton.style.padding = '10px 20px'; // Add padding for a larger button
  splitButton.style.backgroundColor = '#FFD700'; // Set background color to gold
  splitButton.style.color = '#000'; // Set text color to black
  splitButton.style.border = 'none'; // Remove border
  splitButton.style.borderRadius = '5px'; // Add rounded corners
  splitButton.style.cursor = 'pointer'; // Change cursor on hover
  document.body.appendChild(splitButton);

  // Create a log for timestamps
  const splitLog = document.createElement('ul');
  splitLog.id = 'split-log';
  splitLog.style.position = 'fixed';
  splitLog.style.top = '70px';
  splitLog.style.right = '10px';
  splitLog.style.listStyleType = 'none';
  splitLog.style.padding = '10px'; // Add padding to the log
  splitLog.style.backgroundColor = '#333'; // Set background color to dark gray
  splitLog.style.border = '2px solid #FFD700'; // Add a gold border
  splitLog.style.borderRadius = '5px'; // Add rounded corners
  document.body.appendChild(splitLog);

  // Attach an event listener to the split button
  splitButton.addEventListener('click', function () {
    addTimestampWithAnimation(currentSection);
  });

  // Start checking for layout changes
  checkLayoutChange();

  // Mark the autosplitter as running
  window.autosplitterRunning = true;
})();
