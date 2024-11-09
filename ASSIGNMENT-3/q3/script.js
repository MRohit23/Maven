function removeSelectedItem() {
    const dropdown = document.getElementById("itemDropdown");
    const message = document.getElementById("message");

    const selectedOption = dropdown.options[dropdown.selectedIndex];

    if (dropdown.options.length > 0) {
        dropdown.remove(dropdown.selectedIndex);

        message.textContent = `${selectedOption.text} has been removed.`;

        setTimeout(() => {
            message.textContent = "";
        }, 2000);
    } else {
        message.textContent = "No more items to remove!";
    }
}
