// patient-script.js - Patient Dashboard Functionality

// Sidebar Toggle
const initializeSidebar = () => {
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
  
    if (menuIcon && sidebar && mainContent) {
      menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
      });
    }
  };
  
  // Logout Function
  const handleLogout = () => {
    const logoutButtons = document.querySelectorAll('[onclick="logout()"]');
    
    const logout = () => {
      if (confirm('Are you sure you want to logout?')) {
        // Clear patient session data
        localStorage.removeItem('patientToken');
        window.location.href = '../index.html';
      }
    };
  
    logoutButtons.forEach(button => {
      button.addEventListener('click', logout);
    });
  };
  
  // Medical History Expansion
  const initializeMedicalHistory = () => {
    document.querySelectorAll('.view-details').forEach(button => {
      button.addEventListener('click', function() {
        const content = this.parentElement;
        content.classList.toggle('expanded');
        this.textContent = content.classList.contains('expanded') 
          ? 'Collapse Details' 
          : 'View Full Report';
      });
    });
  };
  
  // Store Functionality
  const initializeStore = () => {
    let cart = JSON.parse(localStorage.getItem('patientCart')) || [];
  
    const updateCartDisplay = () => {
      const cartItems = document.querySelector('.cart-items');
      const cartTotal = document.querySelector('.cart-total');
      // Update cart UI
    };
  
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const product = {
          id: productCard.dataset.productId,
          name: productCard.querySelector('h5').textContent,
          price: parseFloat(
            productCard.querySelector('.current-price').textContent.replace('$', '')
          ),
          quantity: 1
        };
        
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push(product);
        }
        
        localStorage.setItem('patientCart', JSON.stringify(cart));
        updateCartDisplay();
      });
    });
  };
  
  // Feedback Ratings
  const initializeRatings = () => {
    const stars = document.querySelectorAll('.rating-stars i');
    
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        stars.forEach((s, index) => {
          s.classList.toggle('bi-star-fill', index < rating);
          s.classList.toggle('bi-star', index >= rating);
        });
        document.querySelector('#ratingValue').value = rating;
      });
    });
  };
  
  // Messages Functionality
  const initializeMessaging = () => {
    const messageInput = document.querySelector('.message-input textarea');
    const sendButton = document.querySelector('.send-btn');
  
    if (messageInput && sendButton) {
      sendButton.addEventListener('click', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
          // Send message logic
          console.log('Message sent:', message);
          messageInput.value = '';
        }
      });
    }
  };
  // Toggle Sidebar
  document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');

    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('show');
        overlay.classList.remove('active');
    });
});


  // Form Validation
  const initializeForms = () => {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        let valid = true;
        
        // Example: Feedback form validation
        if (form.id === 'feedbackForm') {
          const rating = document.querySelectorAll('.bi-star-fill').length;
          if (rating < 1) {
            valid = false;
            alert('Please provide a rating');
          }
        }
        
        if (!valid) e.preventDefault();
      });
    });
  };
  
  // Dynamic Content Loader
  const loadContent = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.text();
      document.querySelector('.main-content').innerHTML = data;
      initializePage();
    } catch (error) {
      console.error('Content load error:', error);
    }
  };
  
  // Initialize Page-Specific Features
  const initializePage = () => {
    initializeMedicalHistory();
    initializeStore();
    initializeRatings();
    initializeMessaging();
    initializeForms();
    
   
  };
  
  // Initial Setup
  document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    handleLogout();
    initializePage();
    
    // Set active navigation
   
  });
  
  // Responsive Adjustments
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.querySelector('.sidebar').classList.remove('collapsed');
      document.querySelector('.main-content').classList.remove('expanded');
    }
  });