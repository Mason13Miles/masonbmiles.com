document.addEventListener("DOMContentLoaded", function () {
  // App Icon Functionality
  const appIcons = document.querySelectorAll(".app-icon");
  const videoContainer = document.getElementById("video-container");
  const videoFrame = document.getElementById("video-frame");

  appIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
          const videoURL = icon.getAttribute("data-video");
          videoFrame.src = videoURL;
          videoContainer.style.display = "block";
      });
  });

  videoContainer.addEventListener("click", (event) => {
      if (event.target === videoContainer) {
          videoFrame.src = ""; 
          videoContainer.style.display = "none"; 
      }
  });

  // Calendar Functionality
  const calendarGrid = document.getElementById("calendar-grid");
  const eventInfo = document.getElementById("event-info");

  const events = {
      "2024-12-25": "Christmas Celebration",
      "2024-01-01": "New Year Party",
      "2025-07-04": "Independence Day Event",
      "2025-01-20": "FamLinked Launch" 
  };

  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - currentDayOfWeek); 

  // Calculate the day of the week for the 1st of the month
const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1).getDay(); 

// Add empty cells before the 1st of the month
for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-cell", "empty-cell"); // Add an "empty-cell" class for styling if needed
    weekDiv.appendChild(emptyCell);
}

  for (let weekIndex = 0; weekIndex < 52; weekIndex++) {
      const weekDiv = document.createElement("div");
      weekDiv.classList.add("week");

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
          const cellDate = new Date(startDate);
          cellDate.setDate(startDate.getDate() + weekIndex * 7 + dayIndex);

          const cell = document.createElement("div");
          cell.classList.add("calendar-cell");
          cell.setAttribute("data-date", cellDate.toISOString().split("T")[0]);
          cell.setAttribute("data-month", cellDate.getMonth()); // Add data-month attribute

          if (events[cellDate.toISOString().split("T")[0]]) {
              cell.setAttribute("data-event", "true");
          }

          const dayNumber = document.createElement("span");
          dayNumber.classList.add("day-number");
          dayNumber.textContent = cellDate.getDate();
          cell.appendChild(dayNumber);

          cell.addEventListener("click", function () {
              document.querySelectorAll(".calendar-cell").forEach((c) => c.classList.remove("selected"));
              cell.classList.add("selected");

              const selectedDate = cell.getAttribute("data-date");

              if (events[selectedDate]) {
                  const eventDate = new Date(selectedDate);
                  const options = { month: "long", day: "numeric" };
                  const formattedDate = eventDate.toLocaleDateString("en-US", options);
                  eventInfo.textContent = `${formattedDate}: ${events[selectedDate]}`;
              } else {
                  eventInfo.textContent = "No event scheduled";
              }
          });
          weekDiv.appendChild(cell);
      }
      calendarGrid.appendChild(weekDiv); 
  }

  // Month Headers
  const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const currentMonthIndex = currentDate.getMonth();
  const reorderedMonths = [];
  for (let i = 0; i < months.length; i++) {
      reorderedMonths.push(months[(currentMonthIndex + i) % months.length]);
  }

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
  

  
  