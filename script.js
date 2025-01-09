// Fetch the JSON data
fetch("quotes.json")
    .then((response) => response.json())
    .then((data) => {
        const quotes = data;

        // Extract unique tags
        const uniqueTags = new Set();
        quotes.forEach((quote) => {
            // Parse the Tags string into an array
            const tagsArray = JSON.parse(quote.Tags.replace(/'/g, '"')); // Convert single quotes to double quotes for JSON parsing
            tagsArray.forEach((tag) => uniqueTags.add(tag)); // Add each tag to the Set
        });

        // Populate the dropdown with the unique tags
        const tagsDropdown = document.getElementById("tags");
        uniqueTags.forEach((tag) => {
            const option = document.createElement("option");
            option.value = tag;
            option.textContent = tag;
            tagsDropdown.appendChild(option);
        });

        // Display all quotes initially
        displayQuotes(quotes);

        // Add event listener to filter quotes by tag
        tagsDropdown.addEventListener("change", () => {
            const selectedTag = tagsDropdown.value;
            if (selectedTag === "all") {
                displayQuotes(quotes); // Show all quotes
            } else {
                // Filter quotes by the selected tag
                const filteredQuotes = quotes.filter((quote) => {
                    const tagsArray = JSON.parse(quote.Tags.replace(/'/g, '"'));
                    return tagsArray.includes(selectedTag);
                });
                displayQuotes(filteredQuotes);
            }
        });
    })
    .catch((error) => {
        console.error("Error fetching quotes:", error);
    });

// Function to display quotes
function displayQuotes(quotes) {
    const quotesContainer = document.getElementById("quotes-container");
    quotesContainer.innerHTML = ""; // Clear previous content

    if (quotes.length === 0) {
        quotesContainer.innerHTML = "<p>No quotes found for this tag.</p>";
        return;
    }

    quotes.forEach((quote) => {
        const quoteElement = document.createElement("div");
        quoteElement.classList.add("quote");
        quoteElement.innerHTML = `
            <p>"${quote.Quote}"</p>
            <p>- ${quote.Author}</p>
        `;
        quotesContainer.appendChild(quoteElement);
    });
}
