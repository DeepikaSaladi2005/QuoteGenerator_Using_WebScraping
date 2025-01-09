import requests
from bs4 import BeautifulSoup
import pandas as pd

URL = "http://quotes.toscrape.com/"

all_quotes = []
current_page = URL

while current_page:
    response = requests.get(current_page)
    soup = BeautifulSoup(response.text, "html.parser")

    # Extract quotes on the current page
    quote_elements = soup.find_all("div", class_="quote")
    for quote in quote_elements:
        quote_text = quote.find("span", class_="text").text.strip()
        author = quote.find("small", class_="author").text.strip()
        tags = [tag.text.strip() for tag in quote.find_all("a", class_="tag")]
        all_quotes.append({"Quote": quote_text, "Author": author, "Tags": tags})

    # Find the "Next" button and update the current_page URL
    next_button = soup.find("li", class_="next")
    if next_button:
        next_page = next_button.find("a")["href"]
        current_page = URL + next_page
    else:
        current_page = None  # Exit the loop if no "Next" button

print(f"Scraped {len(all_quotes)} quotes in total.")

# Save the data to a CSV file
df = pd.DataFrame(all_quotes)
df.to_csv("quotes.csv", index=False)

print("Data successfully saved to quotes.csv!")
import pandas as pd

# Load the CSV file
df = pd.read_csv("quotes.csv")

# Convert the DataFrame to JSON
df.to_json("quotes.json", orient="records", indent=4)

print("Data successfully converted to quotes.json!")
