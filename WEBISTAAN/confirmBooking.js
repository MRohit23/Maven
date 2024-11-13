import { ok } from "assert";
import { json } from "body-parser";

document.addEventListener("DOMContentLoaded", function () {
    const bookingDetailsContainer = document.getElementById("bookingDetails");

    const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
    const confirmBookingContainer = document.getElementById(
        "confirmBookingContainer"
    );

    if (bookingDetails) {
        bookingDetailsContainer.innerHTML = `<div class="container confirmTicket ">
                    <strong>Flight Number:</strong> ${bookingDetails.flightNumber} <br>
                    <strong>From:</strong> ${bookingDetails.from} <br>
                    <strong>To:</strong> ${bookingDetails.to} <br>
                    <strong>Departure:</strong> ${bookingDetails.departureDate} ${bookingDetails.departureTime} <br>
                    <strong>Arrival:</strong> ${bookingDetails.arrivalTime} <br>
                    <strong>Class:</strong> ${bookingDetails.class} <br>
                    <strong>Price:</strong> ₹${bookingDetails.price} <br>
                    <button class="btn confirmTicketButton btn-outline-primary" onclick="confirmBooking()">Confirm Booking</button></div>
                `;
        bookingDetailsContainer.appendChild(confirmBookingContainer);
    } else {
        bookingDetailsContainer.innerHTML = "<p>No booking details found.</p>";
    }

    function confirmBooking() {
        const bookingDetails = JSON.parse(
            localStorage.getItem("bookingDetails")
        );

        if (!bookingDetails) {
            alert("No booking details found. Please try again.");
            return;
        }

        alert("Your booking is confirmed! Thank you for booking with us.");

        const data = {
            flightNumber: bookingDetails.flightNumber,
            fromLocation: bookingDetails.from,
            toLocation: bookingDetails.to,
            departureDate: bookingDetails.departureDate,
            departureTime: bookingDetails.departureTime,
            arrivalTime: bookingDetails.arrivalTime,
            passengerCount: 1,
            classType: bookingDetails.class,
            price: bookingDetails.price,
        };
        console.log(data);
        // Send booking details to the backend via POST request
        fetch("http://localhost:9900/book-ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Network response was not ok " + response.statusText
                    );
                }
                return response.json();
            })
            .then((data) => {
                console.log("Booking successful:", data);
                localStorage.removeItem("bookingDetails");
            })
            .catch((error) => {
                console.log(error);
            });
    }
});
