function highlightBoldWords() {
    const boldWords = document.querySelectorAll(".bold-word");
    boldWords.forEach((word) => {
        word.classList.add("highlighted");
    });
}

function removeHighlight() {
    const boldWords = document.querySelectorAll(".bold-word");
    boldWords.forEach((word) => {
        word.classList.remove("highlighted");
    });
}
