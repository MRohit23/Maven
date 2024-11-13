document.addEventListener("DOMContentLoaded", function () {
    // Script for searching available flights

    const searchButton = document.getElementById("searchFlights");
    const flightResults = document.getElementById("flightResults");

    // Function to fetch JSON data
    async function fetchFlightsData() {
        try {
            const response = await fetch("flight.json"); // Ensure `flights.json` is in the same directory
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
        const departureDate = document
            .getElementById("departureDate")
            .value.trim();

        // Check if input fields are filled
        if (!origin || !destination || !departureDate) {
            alert("Please fill all the fields.");
            return;
        }

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
                flightItem.classList.add("flight-item"); // Add a class for easier selection
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
                            .map(
                                ([cls, price]) =>
                                    `<li class="nodrop btn btn-outline-primary">${cls}: ₹${price}</li>`
                            )
                            .join("")}
                    </ul>
                </div>`;

                flightItem.addEventListener("click", function () {
                    const selectedClass = prompt(
                        "Please enter the class you want to book (e.g., Economy, Business):"
                    );
                    if (selectedClass && flight.price[selectedClass]) {
                        const bookingDetails = {
                            flightNumber: flight.flightNumber,
                            from: flight.from,
                            to: flight.to,
                            departureDate: flight.departureDate,
                            departureTime: flight.departureTime,
                            arrivalTime: flight.arrivalTime,
                            class: selectedClass,
                            price: flight.price[selectedClass],
                        };

                        // Save flight data in localStorage as JSON
                        localStorage.setItem(
                            "bookingDetails",
                            JSON.stringify(bookingDetails)
                        );

                        // Redirect to booking page
                        window.location.href = "confirmation.html";
                    } else {
                        alert(
                            "Invalid class selection or class not available."
                        );
                    }
                });

                flightResults.appendChild(flightItem);
            });
        }
    }

    // Attach event listener to search button
    searchButton.addEventListener("click", searchFlights);
});
