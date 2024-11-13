import express from "express";
import { createConnectionObject, establishConnection } from "./database.js";
import { parse } from "path";

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

const connection = createConnectionObject();

app.post("/book-ticket", (request, response) => {
    console.log(request.body);
    const {
        flightNumber,
        fromLocation,
        toLocation,
        departureDate,
        departureTime,
        arrivalTime,
        passengerCount,
        classType,
        price,
    } = request.body;

    const query = `
        INSERT INTO ticket (flight_number, from_location, to_location, departure_date, departure_time, arrival_time, passenger_count, class_type, price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        query,
        [
            flightNumber,
            fromLocation,
            toLocation,
            departureDate,
            departureTime,
            arrivalTime,
            passengerCount,
            classType,
            price,
        ],
        (error, results) => {
            if (error) {
                response
                    .status(500)
                    .send({ message: "Error booking the ticket" });
            } else {
                response.status(201).json({
                    message: "Ticket booked successfully",
                    ticketId: results.insertId,
                });
            }
        }
    );
});

app.put("/update-ticket/:ticketId", (request, response) => {
    const ticketId = request.params.ticketId;
    const {
        flightNumber,
        fromLocation,
        toLocation,
        departureDate,
        departureTime,
        arrivalTime,
        passengerCount,
        classType,
        price,
    } = request.body;

    const query = `
        UPDATE ticket 
        SET flight_number = ?, from_location = ?, to_location = ?, departure_date = ?, departure_time = ?, arrival_time = ?, passenger_count = ?, class_type = ?, price = ? 
        WHERE ticket_id = ?
    `;

    connection.query(
        query,
        [
            flightNumber,
            fromLocation,
            toLocation,
            departureDate,
            departureTime,
            arrivalTime,
            passengerCount,
            classType,
            price,
            ticketId,
        ],
        (error) => {
            if (error) {
                response
                    .status(500)
                    .send({ message: "Error updating the ticket" });
            } else {
                response.status(200).json({
                    message: "Ticket updated successfully",
                });
            }
        }
    );
});

app.delete("/delete-ticket/:ticketId", (request, response) => {
    const ticketId = request.params.ticketId;

    const query = "DELETE FROM ticket WHERE ticket_id = ?";

    connection.query(query, [ticketId], (error, results) => {
        if (error) {
            response.status(500).send({ message: "Error deleting the ticket" });
        } else if (results.affectedRows === 0) {
            response.status(404).send("Ticket not found");
        } else {
            response.status(200).json({
                message: "Ticket deleted successfully",
            });
        }
    });
});

app.listen(9900, () => {
    console.log("Server is running on port 9900");
    establishConnection();
});
