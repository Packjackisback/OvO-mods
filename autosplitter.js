//still poc, added cool ui
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

  // Function to add a timestamp in milliseconds to the log with animation
  function addTimestampWithAnimation() {
    const currentTime = new Date().getTime();
    const logElement = document.getElementById('split-log');

    if (logElement) {
      const splitTime = currentTime - timerStart;
      const timestampItem = document.createElement('li');
      timestampItem.style.color = '#FFD700'; // Set text color to gold
      timestampItem.style.fontFamily = 'Helvetica'; // Set the font
      timestampItem.textContent = `Split: ${splitTime} ms`;

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

  // Function to check for layout name changes and trigger a split
  function checkLayoutChange() {
    const currentLayoutName = getCurrentLayoutName();

    if (currentLayoutName !== previousLayoutName) {
      // Layout name has changed
      if (currentLayoutName === 'Level 1') {
        // Restart the timer when "Level 1" is loaded
        timerStart = new Date().getTime();
      } else {
        // For other layouts, trigger a split with animation
        addTimestampWithAnimation();
      }

      // Update the previous layout name
      previousLayoutName = currentLayoutName;
    }

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
  splitButton.addEventListener('click', addTimestampWithAnimation);

  // Start checking for layout changes
  checkLayoutChange();

  // Mark the autosplitter as running
  window.autosplitterRunning = true;
})();
