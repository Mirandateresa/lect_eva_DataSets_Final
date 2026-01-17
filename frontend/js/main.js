// Main application JavaScript
console.log("Main application JS loaded");

// Global application state
window.appState = {
  datasetLoaded: false,
  currentDataset: null,
  processing: false
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded");
  
  // Initialize components
  initFileUpload();
  initNavigation();
  
  console.log("Application initialized successfully");
});

// File upload handler
function initFileUpload() {
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        console.log("File selected:", file.name);
        window.appState.currentDataset = file;
        window.appState.datasetLoaded = true;
        
        // Enable dataset-dependent buttons
        document.querySelectorAll('[data-requiere-dataset]').forEach(btn => {
          btn.classList.remove('disabled');
        });
      }
    });
  }
}

// Navigation handler
function initNavigation() {
  console.log("Navigation initialized");
}

// Export for other modules
window.utils = {
  showLoading: function() {
    console.log("Loading...");
  },
  hideLoading: function() {
    console.log("Loading complete");
  }
};
