const container = document.getElementById("dataset-container");

const API_URL = "https://data.london.gov.uk/api/datasets/export.json";

fetch(API_URL)
  .then(response => response.json())
  .then(data => {

    const datasets = data.datasets;

    let html = "<h2>Sample London Datastore Datasets</h2>";
    html += "<ul>";

    datasets.slice(0, 10).forEach(dataset => {
      html += `
        <li>
          <strong>${dataset.title}</strong><br>
          <small>ID: ${dataset.id}</small>
        </li>
      `;
    });

    html += "</ul>";
    container.innerHTML = html;
  })
  .catch(error => {
    container.innerHTML = "Error loading open data.";
    console.error(error);
  });
