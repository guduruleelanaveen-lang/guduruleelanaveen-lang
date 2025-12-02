const container = document.getElementById("dataset-container");

// New API URL from data.gov.uk
const API_URL = "https://data.gov.uk/api/action/package_search?q=london&rows=10";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

fetch(API_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    console.log("API response:", data);

    if (!data.success || !data.result || !Array.isArray(data.result.results)) {
      container.innerHTML = "<p>Unexpected API response format.</p>";
      return;
    }

    const datasets = data.result.results;

    if (datasets.length === 0) {
      container.innerHTML = "<p>No datasets found.</p>";
      return;
    }

    let html = "<h2>Sample datasets from data.gov.uk</h2>";
    html += "<ul>";

    datasets.forEach((item) => {
      const title = escapeHtml(item.title || "Untitled dataset");
      const org =
        item.organization && item.organization.title
          ? escapeHtml(item.organization.title)
          : "Unknown organisation";
      const desc = item.notes
        ? escapeHtml(item.notes.slice(0, 150)) + "..."
        : "";

      html += `
        <li>
          <strong>${title}</strong><br>
          <small>Publisher: ${org}</small><br>
          <small>${desc}</small>
        </li>
      `;
    });

    html += "</ul>";
    container.innerHTML = html;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    container.innerHTML =
      "<p>Sorry, there was a problem loading the open data. Please try again later.</p>";
  });
