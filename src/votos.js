import { getVotes, saveVote } from './firebase.js';

function renderResults(votes) {
  const counts = {
    color1: 0,
    color2: 0,
    color3: 0,
    color4: 0,
    color5: 0,
  };

  Object.values(votes).forEach(vote => {
    if (counts.hasOwnProperty(vote.color)) {
      counts[vote.color]++;
    }
  });

  const colorLabels = {
    color1: 'Nature Green',
    color2: 'Rose Pink',
    color3: 'Rich Blue',
    color4: 'Strong Lavender',
    color5: 'Jet Black',
  };

  const resultsDiv = document.getElementById('results');
  let tableHTML = `
    <table class="w-full text-left border-collapse">
      <thead>
        <tr>
          <th class="bg-brand-accent text-center border px-4 py-2">Color</th>
          <th class="bg-brand-accent text-center border px-4 py-2">Votos</th>
        </tr>
      </thead>
      <tbody>
  `;

  Object.entries(counts).forEach(([color, count]) => {
    tableHTML += `
      <tr>
        <td class="border px-4 py-2 font-bold">${colorLabels[color]}</td>
        <td class="border px-4 py-2 text-center">${count}</td>
      </tr>
    `;
  });

  tableHTML += `</tbody></table>`;
  resultsDiv.innerHTML = tableHTML;
}

async function enableForm() {
  const form = document.getElementById('encuestacolor');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const select = document.getElementById('colorseleccion');
    const selectedValue = select.value;

    if (!selectedValue) return;

    const result = await saveVote(selectedValue);

    if (result.success) {
      alert(result.message);
      form.reset();
      const updatedVotes = await getVotes();
      renderResults(updatedVotes);
    } else {
      alert(result.message);
    }
  });

  const initialVotes = await getVotes();
  renderResults(initialVotes);
}

enableForm();
