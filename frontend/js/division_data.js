// Data division JavaScript
console.log("Data division JS loaded");

document.addEventListener('DOMContentLoaded', function() {
  console.log("Data division page ready");
  
  // Initialize division form
  const divisionForm = document.getElementById('divisionForm');
  if (divisionForm) {
    divisionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log("Division form submitted");
      
      // Get division parameters
      const trainSize = document.getElementById('trainSize').value;
      const testSize = document.getElementById('testSize').value;
      const randomState = document.getElementById('randomState').value;
      
      console.log(`Train: ${trainSize}%, Test: ${testSize}%, Random State: ${randomState}`);
      
      // Show loading
      showLoading();
      
      // Simulate division process
      setTimeout(() => {
        hideLoading();
        alert(`Dataset divided successfully!\nTrain: ${trainSize}%\nTest: ${testSize}%`);
        console.log("Data division completed");
      }, 2000);
    });
  }
  
  // Set default values
  setDefaultValues();
});

function setDefaultValues() {
  const trainSize = document.getElementById('trainSize');
  const testSize = document.getElementById('testSize');
  
  if (trainSize && testSize) {
    trainSize.value = 80;
    testSize.value = 20;
    console.log("Default values set: Train 80%, Test 20%");
  }
}

function showLoading() {
  const loadingDiv = document.getElementById('loading') || createLoadingElement();
  loadingDiv.style.display = 'block';
  console.log("Showing loading indicator");
}

function hideLoading() {
  const loadingDiv = document.getElementById('loading');
  if (loadingDiv) {
    loadingDiv.style.display = 'none';
    console.log("Hiding loading indicator");
  }
}

function createLoadingElement() {
  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'loading';
  loadingDiv.innerHTML = '<p>Processing... Please wait.</p>';
  loadingDiv.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:20px; border-radius:5px; box-shadow:0 0 10px rgba(0,0,0,0.1);';
  document.body.appendChild(loadingDiv);
  return loadingDiv;
}

// Data division functions
window.dataDivision = {
  splitDataset: function(data, trainPercentage) {
    console.log(`Splitting dataset: ${trainPercentage}% train, ${100 - trainPercentage}% test`);
    // TODO: Implement actual splitting logic
    return {
      trainData: [],
      testData: []
    };
  },
  
  validateSplit: function(trainPercent, testPercent) {
    if (trainPercent + testPercent !== 100) {
      console.error("Split percentages must sum to 100%");
      return false;
    }
    return true;
  }
};
