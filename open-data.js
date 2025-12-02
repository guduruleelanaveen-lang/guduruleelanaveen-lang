const container = document.getElementById("dataset-container");

// Local JSON file (derived from UK open data)
const API_URL = "uk-open-data.json";

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
    console.log("Local open data JSON:", data);

    if (!data.datasets || !Array.isArray(data.datasets)) {
      container.innerHTML = "<p>Unexpected data format in uk-open-data.json.</p>";
      return;
    }

    const datasets = data.datasets;

    if (datasets.length === 0) {
      container.innerHTML = "<p>No datasets found.</p>";
      return;
    }

    let html = "<h2>Sample UK Open Data Datasets</h2>";
    html += "<ul>";

    datasets.forEach((item) => {
      const title = escapeHtml(item.title || "Untitled dataset");
      const publisher = escapeHtml(item.publisher || "Unknown publisher");
      const description = item.description
        ? escapeHtml(item.description)
        : "";

      html += `
        <li>
          <strong>${title}</strong><br>
          <small>Publisher: ${publisher}</small><br>
          <small>${description}</small>
        </li>
      `;
    });

    html += "</ul>";
    container.innerHTML = html;
  })
  .catch((error) => {
    console.error("Error fetching local open data:", error);
    container.innerHTML =
      "<p>Sorry, there was a problem loading the open data. Please try again later.</p>";
  });
