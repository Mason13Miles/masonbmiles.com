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
    '2025-01-10': { title: 'this.page DevLog #2', description: 'DevLog #2 of masonbmiles.com will cover lots the bulk of this sites development' },
    '2025-01-17': { title: 'FamLinked DevLog #2', description: 'Covering the backend development of FamlLinked' },
    '2025-01-15': { title: 'FamLinked API Testing', description: 'Testing multiple endpoints with backend hosted in cloud/AWS' },
    '2025-01-20': { title: 'FamLinked Frontend IOS', description: 'Finish MLP for FamLinked frontend on IOS' },
    '2025-01-24': { title: 'FamLinked DevLog #3', description: 'Walk through the SwiftUI code and development' },
    '2025-01-30': { title: 'FamLinked Frontend Android', description: 'Finish MLP for FamLinked frontend on Android' },
    '2025-02-01': { title: 'FamLinked DevLog #4', description: 'Walk through the Java/Kotlin code and development' },
    '2025-02-03': { title: 'Web Frontend FamLinked', description: 'Start building frontend for FamLinked on the web' },
    '2025-02-05': { title: 'Build Clutter Challenge', description: 'Attempt to build Clutter in one 16hr day' },
    '2025-02-07': { title: 'Test Clutter & Submit', description: 'Submit Clutter to the IOS app store' },
    '2025-02-08': { title: 'DevLog #2 Clutter', description: 'Walk throught the development and discourse about building quick' },
    '2025-02-10': { title: 'Finish Famlinked MLP', description: 'Finish and Test all MLP functionalities' },
    '2025-02-11': { title: 'Submit FamLinked', description: 'Submit FamLinked to the app store on IOS and Android' },
    '2025-02-13': { title: 'DevLog #5 FamLinked', description: 'Walkthrough the web frontend and all of the hosting' },
    '2025-02-15': { title: 'Practice Data Structures', description: 'Spend some time practicing data structures in Java, Swift and JS' },
    '2025-03-01': { title: 'MindStone AI Mind Map', description: 'Create game plan for how MindStone AI will work and its core functionality' },
    '2025-03-02': { title: 'DevLog #2 MindStone AI', description: 'Upload the mind map video going over the pre-build details of MindStone AI' },
    '2025-04-05': { title: 'Finish MindStone (estimate)', description: 'Goal to finish MindStone be May' },
    '2025-05-04': { title: 'Strengthen FamLinked Foundation', description: 'Strengthen API and foundation for FamLinked' },
    '2025-05-10': { title: 'FamLinked E-Com', description: 'Build out e-com functionality for FamLinked' },
    '2025-06-05': { title: 'Start Service Expanision of FamLinked', description: 'Walkthrough additional services for phase two of FamLinked' },
    '2025-07-04': { title: 'Independence Day', description: 'Firework Party' },
    '2025-08-01': { title: 'Build Challenge', description: 'Details will come soon' },
    '2025-08-04': { title: 'X-Marks the spot app', description: 'Walkthrough the mind map and development of Scavenger Hunt game' },
    '2025-10-15': { title: 'CS for FamLinked', description: 'Develop and build out Customer Service for FamLinked' },
    '2025-12-25': { title: 'Christmas', description: 'Family Time' },


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
// Feedback Form
  const form = document.getElementById('feedbackForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const feedbackType = document.querySelector('input[name="feedbackType"]:checked').value;
    const feedback = document.getElementById('feedback').value;
    const email = document.getElementById('email').value;

    // Create JSON object
    const formData = {
      feedbackType: feedbackType,
      feedback: feedback,
      email: email
    };

    // Convert to JSON string
    const jsonData = JSON.stringify(formData);

    // Send data to backend (replace with your backend URL)
    fetch('/your-backend-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then(response => {
      // Handle response from backend
      console.log('Response:', response);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
  });

  document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    grecaptcha.ready(function() {
        grecaptcha.execute('6Leu4q8qAAAAAEeNBgJCmM3LG6ge9mJh2Tm1JY6z', {action: 'submit'}).then(function(token) {
            const form = document.getElementById('feedback-form');
            const recaptchaInput = document.createElement('input');
            recaptchaInput.setAttribute('type', 'hidden');
            recaptchaInput.setAttribute('name', 'g-recaptcha-response');
            recaptchaInput.setAttribute('value', token);
            form.appendChild(recaptchaInput);
            form.submit();
        });
    });
  });
});