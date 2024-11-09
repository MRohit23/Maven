// Load JSON data and search for flights
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchFlights");
    const flightResults = document.getElementById("flightResults");

    // Function to fetch JSON data
    async function fetchFlightsData() {
        try {
            const response = await fetch("./flight.json"); // Ensure `flights.json` is in the same directory
            if (!response.ok) throw new Error("Failed to load flights data");
            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    // Function to filter and display flights
    async function searchFlights() {
        // Get user input values
        const origin = document.getElementById("from").value.trim();
        const destination = document.getElementById("to").value.trim();
        const departureDate = document.getElementById("departureDate").value;

        // Clear previous results
        flightResults.innerHTML = "";

        // Fetch flights data
        const flightsData = await fetchFlightsData();

        // Filter flights based on user input
        const availableFlights = flightsData.filter(
            (flight) =>
                flight.from.toLowerCase() === origin.toLowerCase() &&
                flight.to.toLowerCase() === destination.toLowerCase() &&
                flight.departureDate === departureDate
        );

        // Display results
        if (availableFlights.length === 0) {
            flightResults.innerHTML = "<li>No flights available</li>";
        } else {
            availableFlights.forEach((flight) => {
                const flightItem = document.createElement("li");
                flightItem.innerHTML = `<div class="container">
                    <strong>Flight Number:</strong> ${flight.flightNumber} <br>
                    <strong>From:</strong> ${flight.from} <br>
                    <strong>To:</strong> ${flight.to} <br>
                    <strong>Departure:</strong> ${flight.departureDate} ${
                    flight.departureTime
                } <br>
                    <strong>Arrival:</strong> ${flight.arrivalTime} <br>
                    <strong>Class & Price:</strong>
                    <ul>
                        ${Object.entries(flight.price)
                            .map(([cls, price]) => `<li>${cls}: ₹${price}</li>`)
                            .join("")}
                    </ul> 
                    </div>
                `;
                flightResults.appendChild(flightItem);
            });
        }
    }

    // Attach event listener to search button
    searchButton.addEventListener("click", searchFlights);
});
