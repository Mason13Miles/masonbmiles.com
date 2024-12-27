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

  const calendarContainer = document.getElementById('calendar-container');
  const calendarGrid = document.getElementById('calendar-grid');

  // Sample events data (replace with your actual data)
   const events = {
      '2025-11-28': 'Demo',
      '2025-01-05': 'Project Kickoff',
      '2025-01-10': 'Meeting with Team',
      '2025-01-15': 'Code Review Session',
      '2025-01-22': 'Presentation Preparation',
      '2025-01-30': 'Presentation Day',
      '2025-02-05': 'Sprint Retrospective',
      '2025-02-10': 'Code Review Session',
      '2025-02-22': 'Sprint Planning',
      '2025-02-28': 'UI design changes',
      '2025-12-05': 'Demo day',
      '2025-03-07': 'Testing session',
      '2025-11-01': 'Code Review Session',
      '2025-04-15': 'Meeting with Team',
      '2025-05-01': 'Project End',
      '2025-05-03': 'Code Review Session',
      '2025-05-15': 'New Project',
  };

  // Get today's date and calculate start date of the first column
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const numberOfWeeks = 52; // fixed 52 weeks
  let currentDate = new Date(startOfWeek);
   let monthHeaderContainer = document.createElement('div');
   monthHeaderContainer.classList.add('month-header-container');
   let currentMonth = null;

  for (let week = 0; week < numberOfWeeks; week++) {
      const weekDiv = document.createElement('div');
      weekDiv.classList.add('calendar-week');

      for (let day = 0; day < 7; day++) {
          const dayBox = document.createElement('div');
          dayBox.classList.add('day-box');

          // Format the date for the cell and tooltip
          const dateString = currentDate.toISOString().split('T')[0];
          const formattedDate = currentDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
          });

          let tooltipText = `No events for ${formattedDate}`;
          if (events[dateString]) {
              dayBox.setAttribute('data-event', events[dateString]);
               tooltipText = `${events[dateString]} on ${formattedDate}`;
          }

          dayBox.addEventListener('mousemove', (event) => showTooltip(event, tooltipText, event));
           dayBox.addEventListener('mouseout', hideTooltip);


          weekDiv.appendChild(dayBox);

          // Check if we need a month header
         if (currentMonth === null || currentMonth !== currentDate.getMonth()){
               currentMonth = currentDate.getMonth();
              const monthHeader = document.createElement('div');
               monthHeader.classList.add('month-header');
               monthHeader.textContent = currentDate.toLocaleDateString('en-US', { month: 'short' });
               monthHeaderContainer.appendChild(monthHeader);
              }


          currentDate.setDate(currentDate.getDate() + 1);
      }
       calendarGrid.appendChild(weekDiv);
   }

      calendarContainer.insertBefore(monthHeaderContainer, calendarContainer.firstChild);



  // Tooltip functions
  function showTooltip(event, eventDescription, mouseEvent) {
      let tooltip = document.getElementById('tooltip');
      if (!tooltip) {
          tooltip = document.createElement('div');
          tooltip.id = 'tooltip';
          tooltip.classList.add('tooltip');
           document.body.appendChild(tooltip);
       }
      tooltip.textContent = eventDescription;
      tooltip.style.display = 'block';
        tooltip.style.top = `${mouseEvent.pageY + 10}px`;
        tooltip.style.left = `${mouseEvent.pageX + 10}px`;
}

  function hideTooltip() {
     const tooltip = document.getElementById('tooltip');
      if (tooltip) {
          tooltip.style.display = 'none';
      }
  }
});