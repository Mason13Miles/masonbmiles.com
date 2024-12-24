// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Get all app icons
    const appIcons = document.querySelectorAll(".app-icon");
    // Get the video container and iframe
    const videoContainer = document.getElementById("video-container");
    const videoFrame = document.getElementById("video-frame");

    // Add click event listener to each app icon
    appIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            // Get the video URL from the clicked icon's data-video attribute
            const videoURL = icon.getAttribute("data-video");

            // Update the iframe's src with the video URL
            videoFrame.src = videoURL;

            // Show the video container
            videoContainer.style.display = "block";
        });
    });

    // Optional: Close the video container when clicking outside of it
    videoContainer.addEventListener("click", (event) => {
        if (event.target === videoContainer) {
            videoFrame.src = ""; // Clear the video source to stop playback
            videoContainer.style.display = "none"; // Hide the container
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const calendarGrid = document.getElementById("calendar-grid");
    const eventInfo = document.getElementById("event-info");
  
    // Sample events
    const events = {
      "2024-12-25": "Christmas Celebration",
      "2024-01-01": "New Year Party",
      "2025-07-04": "Independence Day Event",
      "2025-01-20": "FamLinked Launch"
    };
  
    // Get the current date and find the most recent Sunday
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDayOfWeek); // Start at the most recent Sunday
  
    // Create 52 weeks (7 days each)
    for (let weekIndex = 0; weekIndex < 52; weekIndex++) {
        const weekDiv = document.createElement("div");
        weekDiv.classList.add("week");
    
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const cellDate = new Date(startDate);
        cellDate.setDate(startDate.getDate() + weekIndex * 7 + dayIndex); // Calculate the current day
  
        const cell = document.createElement("div");
        cell.classList.add("calendar-cell");
        cell.setAttribute("data-date", cellDate.toISOString().split("T")[0]);
  
        if (events[cellDate.toISOString().split("T")[0]]) {
          cell.setAttribute("data-event", "true");
        }
  
        const dayNumber = document.createElement("span");
        dayNumber.classList.add("day-number");
        dayNumber.textContent = cellDate.getDate(); // Display the day of the month
        cell.appendChild(dayNumber);
  
        // Click event to display event or default message
        cell.addEventListener("click", function () {
            document
              .querySelectorAll(".calendar-cell")
              .forEach((c) => c.classList.remove("selected"));
            cell.classList.add("selected");
          
            const selectedDate = cell.getAttribute("data-date");
          
            if (events[selectedDate]) {
              const eventDate = new Date(selectedDate);
              const options = { month: "long", day: "numeric" };
              const formattedDate = eventDate.toLocaleDateString("en-US", options);
          
              eventInfo.textContent = `${formattedDate}: ${events[selectedDate]}`;
            } else {
              eventInfo.textContent = "No event selected";
            }
          });
        weekDiv.appendChild(cell);
    }
        calendarGrid.appendChild(weekDiv); 
      }
    
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Get the current month index (0 = January, 11 = December)
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
  
    // Rearrange the months starting with the current month
    const reorderedMonths = [];
    for (let i = 0; i < months.length; i++) {
      reorderedMonths.push(months[(currentMonthIndex + i) % months.length]);
    }
  
    // Update the HTML content dynamically
    reorderedMonths.forEach((month, index) => {
      const monthDiv = document.getElementById(`month${index}`);
      if (monthDiv) {
        const monthHeader = monthDiv.querySelector("h3");
        if (monthHeader) {
          monthHeader.textContent = month;
        }
      }
    });
  });
  
  
  