// Function to fetch and load the employee data
async function loadEmployees() {
    // Fetch the JSON data from your file (ensure the path is correct)
    const response = await fetch('employees.json');
    const employees = await response.json();

    // Set up the search bar event listener
    const searchInput = document.getElementById('employeeSearch');
    searchInput.addEventListener('input', function () {
        filterEmployees(employees, searchInput.value);
    });
}

// Function to filter employees by name
function filterEmployees(employees, searchTerm) {
    // Filter employees based on the search term (case-insensitive)
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get the datalist element to update options
    const datalist = document.getElementById('employees');
    datalist.innerHTML = '';  // Clear previous options

    // Add filtered employees to the datalist
    filteredEmployees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.name;
        datalist.appendChild(option);
    });
}

// Load employee data when the page loads
window.onload = loadEmployees;