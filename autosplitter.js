//quick and dirty autosplitter, poc, shows time per level in milliseconds. As of now just restarts timer when level 1 is loaded
(function() {
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

  // Function to add a timestamp in milliseconds to the log
  function addTimestamp() {
    const currentTime = new Date().getTime();
    const logElement = document.getElementById('split-log');

    if (logElement) {
      const splitTime = currentTime - timerStart;
      const timestampItem = document.createElement('li');
      timestampItem.style.color = 'black'; // Set text color to black
      timestampItem.textContent = `Split: ${splitTime} ms`;
      logElement.appendChild(timestampItem);
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
        // For other layouts, trigger a split
        addTimestamp();
      }

      // Update the previous layout name
      previousLayoutName = currentLayoutName;
    }

    // Continue checking for layout changes
    setTimeout(checkLayoutChange, 100); // Check every 100 milliseconds
  }

  // Create a button for manual splitting
  const splitButton = document.createElement('button');
  splitButton.id = 'split-button';
  splitButton.textContent = 'Split';
  splitButton.style.position = 'fixed';
  splitButton.style.top = '10px';
  splitButton.style.right = '10px';
  document.body.appendChild(splitButton);

  // Create a log for timestamps
  const splitLog = document.createElement('ul');
  splitLog.id = 'split-log';
  splitLog.style.position = 'fixed';
  splitLog.style.top = '50px';
  splitLog.style.right = '10px';
  splitLog.style.listStyleType = 'none';
  document.body.appendChild(splitLog);

  // Attach an event listener to the split button
  splitButton.addEventListener('click', addTimestamp);

  // Start checking for layout changes
  checkLayoutChange();

  // Mark the autosplitter as running
  window.autosplitterRunning = true;
})();
