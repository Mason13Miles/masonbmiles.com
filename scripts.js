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
  const eventsContainer = document.getElementById('events');

  // Sample events data (replace with your actual data)
  const events = {
    '2025-11-28': { title: 'Demo', description: 'Demo of the new project' },
    '2025-01-05': { title: 'Project Kickoff', description: 'Kickoff meeting for the new project' },
    '2025-01-10': { title: 'Meeting with Team', description: 'Team meeting to discuss progress' },
    '2025-01-15': { title: 'Code Review Session', description: 'Reviewing the codebase' },
    '2025-01-22': { title: 'Presentation Preparation', description: 'Preparing for the presentation' },
    '2025-01-30': { title: 'Presentation Day', description: 'Presenting the project' },
    '2025-02-05': { title: 'Sprint Retrospective', description: 'Retrospective meeting for the sprint' },
    '2025-02-10': { title: 'Code Review Session', description: 'Reviewing the codebase' },
    '2025-02-22': { title: 'Sprint Planning', description: 'Planning the next sprint' },
    '2025-02-28': { title: 'UI design changes', description: 'Implementing UI design changes' },
    '2025-12-05': { title: 'Demo day', description: 'Demo of the final product' },
    '2025-03-07': { title: 'Testing session', description: 'Testing the application' },
    '2025-11-01': { title: 'Code Review Session', description: 'Reviewing the codebase' },
    '2025-04-15': { title: 'Meeting with Team', description: 'Team meeting to discuss progress' },
    '2025-05-01': { title: 'Project End', description: 'End of the project' },
    '2025-05-03': { title: 'Code Review Session', description: 'Reviewing the codebase' },
    '2025-05-15': { title: 'New Project', description: 'Starting a new project' },
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
              dayBox.setAttribute('data-event', events[dateString].title);
               tooltipText = `${events[dateString].title} on ${formattedDate}`;
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

  // Filter and sort events to get the next 5 events from today
  const upcomingEvents = Object.entries(events)
    .map(([date, details]) => ({ date: new Date(date), ...details }))
    .filter(event => event.date >= today)
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);

  // Display the next 5 events
  upcomingEvents.forEach(event => {
    const eventColumn = document.createElement('div');
    eventColumn.classList.add('event-column');

    const eventTitle = document.createElement('div');
    eventTitle.classList.add('event-title');
    eventTitle.textContent = event.title;

    const eventDate = document.createElement('div');
    eventDate.classList.add('event-date');
    eventDate.textContent = event.date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const eventDescription = document.createElement('div');
    eventDescription.classList.add('event-description');
    eventDescription.textContent = event.description;

    eventColumn.appendChild(eventTitle);
    eventColumn.appendChild(eventDate);
    eventColumn.appendChild(eventDescription);

    eventsContainer.appendChild(eventColumn);
  });

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