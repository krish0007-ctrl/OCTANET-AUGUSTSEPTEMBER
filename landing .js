// script.js

// Add event listener to the Get Started button
document.querySelector('#hero button').addEventListener('click', function() {
    // Scroll to the features section
    document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
  });
  
  // Add event listener to the navigation links
  document.querySelectorAll('nav a').forEach(function(link) {
    link.addEventListener('click', function(event) {
      // Prevent default link behavior
      event.preventDefault();
      // Scroll to the corresponding section
      document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Add event listener to the form submit button
  document.querySelector('#contact form button').addEventListener('click', function(event) {
    // Prevent default form submission
    event.preventDefault();
    // Get the form data
    const formData = new FormData(document.querySelector('#contact form'));
    // Send the form data to the server (replace with your own API endpoint)
    fetch('/api/contact', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  });