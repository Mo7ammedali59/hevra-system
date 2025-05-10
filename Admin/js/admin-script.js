// admin-script.js - Administrative Functionality

const initializeAdminDashboard = () => {
    // Sidebar Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
  
    if (menuIcon && sidebar && mainContent) {
      menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
      });
    }
  
    // Logout Functionality
    const logoutButtons = document.querySelectorAll('[onclick="logout()"]');
    const handleLogout = () => {
      if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminToken');
        sessionStorage.clear();
        window.location.href = 'admin-login.html';
      }
    };
    logoutButtons.forEach(btn => btn.addEventListener('click', handleLogout));
  
    // Initialize Components
    initializeBulkActions();
    initializeModals();
    initializeDataTables();
    initializeCharts();
    initializeFormValidations();
  };
  
  // Bulk User Actions
  const initializeBulkActions = () => {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
  
    if (selectAll) {
      selectAll.addEventListener('change', (e) => {
        checkboxes.forEach(checkbox => {
          checkbox.checked = e.target.checked;
        });
      });
    }
  
    document.querySelectorAll('.bulk-enable, .bulk-disable').forEach(btn => {
      btn.addEventListener('click', handleBulkOperations);
    });
  };
  
  const handleBulkOperations = (e) => {
    const selectedUsers = Array.from(document.querySelectorAll('tbody input[type="checkbox"]:checked'));
    if (selectedUsers.length === 0) {
      alert('Please select at least one user');
      return;
    }
  
    const action = e.target.classList.contains('bulk-enable') ? 'enable' : 'disable';
    if (confirm(`Are you sure you want to ${action} ${selectedUsers.length} users?`)) {
      // Perform bulk operation
      selectedUsers.forEach(user => {
        const userId = user.closest('tr').dataset.userId;
        console.log(`${action} user ${userId}`);
      });
    }
  };
  
  // Modal Management
  const initializeModals = () => {
    const openModalBtns = document.querySelectorAll('.add-user-btn, .edit-btn');
    const closeModalBtns = document.querySelectorAll('.close-btn, .cancel-btn');
  
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.user-modal').style.display = 'block';
      });
    });
  
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.user-modal').style.display = 'none';
      });
    });
  
    window.onclick = (e) => {
      if (e.target.classList.contains('user-modal')) {
        e.target.style.display = 'none';
      }
    };
  };
  
  // Data Table Initialization
  const initializeDataTables = () => {
    document.querySelectorAll('table').forEach(table => {
      // Add DataTable functionality
      table.querySelectorAll('th').forEach((th, index) => {
        th.addEventListener('click', () => sortTable(index));
      });
    });
  };
  
  const sortTable = (columnIndex) => {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
      const aValue = a.cells[columnIndex].textContent;
      const bValue = b.cells[columnIndex].textContent;
      return aValue.localeCompare(bValue);
    });
  
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
    rows.forEach(row => tbody.appendChild(row));
  };
  
  // Chart Initialization
  const initializeCharts = () => {
    const chartElements = {
      revenueChart: 'line',
      demographicsChart: 'pie',
      appointmentTypesChart: 'doughnut'
    };
  
    Object.entries(chartElements).forEach(([id, type]) => {
      const ctx = document.getElementById(id)?.getContext('2d');
      if (ctx) new Chart(ctx, getChartConfig(type));
    });
  };
  
  const getChartConfig = (type) => ({
    type: type,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Monthly Metrics',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: [
          '#4a86e8', 
          '#34c38f',
          '#f46a6a',
          '#ffc107',
          '#6c757d'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  
  // Form Validations
  const initializeFormValidations = () => {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        let isValid = true;
        
        // User Form Validation
        if (form.id === 'userForm') {
          const requiredFields = form.querySelectorAll('[required]');
          requiredFields.forEach(field => {
            if (!field.value.trim()) {
              isValid = false;
              field.classList.add('invalid');
            }
          });
        }
  
        if (!isValid) {
          e.preventDefault();
          alert('Please fill all required fields');
        }
      });
    });
  };
  
  // Dynamic Content Loading
  const loadAdminContent = async (url) => {
    try {
      const response = await fetch(url);
      const content = await response.text();
      document.querySelector('.main-content').innerHTML = content;
      initializeAdminDashboard();
    } catch (error) {
      console.error('Content load failed:', error);
    }
  };
  
  
  // Responsive Adjustments
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.querySelector('.sidebar').classList.remove('collapsed');
      document.querySelector('.main-content').classList.remove('expanded');
    }
  });