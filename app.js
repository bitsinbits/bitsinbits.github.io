// app.js
document.getElementById('calculate').addEventListener('click', fetchAndDisplayData);

async function fetchTeamData(homeTeam, awayTeam) {
    const response = await fetch('http://localhost:3000/get-team-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ homeTeam, awayTeam }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch team data');
    }

    return response.json();
}

async function fetchAndDisplayData() {
    const homeTeam = document.getElementById('homeTeam').value;
    const awayTeam = document.getElementById('awayTeam').value;

    try {
        const data = await fetchTeamData(homeTeam, awayTeam);
        displayData(data);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching team data. Please try again.');
    }
}

function displayData(data) {
    const outputSection = document.querySelector('.output-section');
    outputSection.innerHTML = ''; // Clear previous results

    for (const [source, sourceData] of Object.entries(data)) {
        const sourceElement = document.createElement('div');
        sourceElement.className = 'source-data';
        sourceElement.innerHTML = `
            <h2>${source}</h2>
            <pre>${JSON.stringify(sourceData, null, 2)}</pre>
        `;
        outputSection.appendChild(sourceElement);
    }
}