// Load the database dynamically
fetch('employees.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load employees.json');
        }
        return response.json();
    })
    .then(database => {
        // Which user and date to pull
        const user = database.find(person => person.name === "Danny Orr");
        const dateKey = "04.28.25";  // You can replace this with current date if needed

        let totalMinutes = 0;

        if (user && user.schedule && user.schedule[dateKey]) {
            const schedule = user.schedule[dateKey];

            // Loop through each day of the week and populate the data
            const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

            daysOfWeek.forEach(day => {
                const shift = schedule[day] || {};
                const position = shift.position || "Off";
                const startTime = shift.start_time || "null";
                const endTime = shift.end_time || "null";
                const timeRange = (startTime === "null" || endTime === "null") ? "Off" : `${formatTime(startTime)} - ${formatTime(endTime)}`;

                // Dynamically update the schedule
                const timeCell = document.getElementById(`${day.toLowerCase()}-time`);
                const positionCell = document.getElementById(`${day.toLowerCase()}-position`);

                timeCell.innerText = timeRange;
                positionCell.innerText = position;

                // Calculate total minutes worked if not "Off"
                if (startTime !== "null" && endTime !== "null") {
                    totalMinutes += calculateMinutes(startTime, endTime);
                }
            });
        }

        // Update total hours display
        const hoursDisplay = document.getElementById('total-hours');
        hoursDisplay.value = (totalMinutes / 60).toFixed(2);  // Update the textbox with total hours worked
    })
    .catch(error => {
        console.error(error);
    });

// Helper functions
function calculateMinutes(start, end) {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return (eh * 60 + em) - (sh * 60 + sm);
}

function formatTime(time24) {
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}