function submitForm() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const contactNo = document.getElementById("contactNo").value;
    const email = document.getElementById("email").value;

    document.getElementById("outputFirstName").textContent =
        "First Name: " + firstName;
    document.getElementById("outputLastName").textContent =
        "Last Name: " + lastName;
    document.getElementById("outputContactNo").textContent =
        "Contact No: " + contactNo;
    document.getElementById("outputEmail").textContent = "Email ID: " + email;
}
