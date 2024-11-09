document.addEventListener("DOMContentLoaded", function () {
    $("#tripType").change(function () {
        const tripType = $(this).val();
        const returnDateInput = $("#returnDate");

        if (tripType === "Round Trip") {
            returnDateInput.removeAttr("disabled");
        } else {
            returnDateInput.attr("disabled", "disabled");
        }

        if (tripType === "Multi-City") {
            window.location.href = "multicity.html";
        }
    });

    $("#tripType").change();

    let flightCount = 3;

    $("#add-flight").click(function () {
        const newFlight = $(`
            <div class="flight mt-3" id="flight-${flightCount}">
                <h3>Flight ${flightCount}</h3>
                <div class="search-section">
                    <div class="row g-3">
                        <!-- From -->
                        <div class="col-md-4">
                            <label for="from-${flightCount}" class="form-label">From</label>
                            <input type="text" id="from-${flightCount}" class="form-control" placeholder="Select origin" />
                        </div>
                        <!-- To -->
                        <div class="col-md-4">
                            <label for="to-${flightCount}" class="form-label">To</label>
                            <input type="text" id="to-${flightCount}" class="form-control" placeholder="Select destination" />
                        </div>
                        <!-- Departure Date -->
                        <div class="col-md-4">
                            <label for="departureDate-${flightCount}" class="form-label">Departure</label>
                            <input type="date" id="departureDate-${flightCount}" class="form-control" />
                        </div>
                    </div>
                </div>
                <!-- Delete button for all flights -->
                <button class="btn btn-danger mt-3 delete-btn">Delete</button>
            </div>
        `);

        newFlight.insertBefore("#add-flight");

        flightCount++;
        updateFlightNumbers();
    });

    $(document).on("click", ".delete-btn", function () {
        const flight = $(this).closest(".flight");
        deleteFlightContainer(flight);
    });

    function deleteFlightContainer(flight) {
        flight.remove();
        updateFlightNumbers();
    }

    function updateFlightNumbers() {
        $(".flight").each(function (index) {
            $(this)
                .find("h3")
                .text(`Flight ${index + 1}`);
            $(this).attr("id", `flight-${index + 1}`);
        });

        $(".flight .delete-btn").each(function () {
            $(this).toggle($(".flight").length > 2);
        });
    }

    updateFlightNumbers();

    //script for searching avaliable flights

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
                            .map(
                                ([cls, price]) =>
                                    `<li class="nodrop btn btn-outline-primary">${cls}: ₹${price}</li>`
                            )
                            .join("")}
                    </ul></div>
                `;
                flightResults.appendChild(flightItem);
            });
        }
    }

    // Attach event listener to search button
    searchButton.addEventListener("click", searchFlights);
});
