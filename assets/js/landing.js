// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the menu toggle button and navigation links element
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Add click event listener to the menu toggle button
    menuToggle.addEventListener('click', function() {
        // Toggle the 'active' class on the navigation links element
        navLinks.classList.toggle('active');
        
        // Change the icon based on the menu state
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark'); // X icon when menu is open
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars'); // Bars icon when menu is closed
        }
    });
    
    // Close the menu when a link is clicked
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            
            // Reset icon to bars
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });
});