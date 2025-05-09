let usersData = [];

// Adatok lekérése
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    usersData = data;
    renderTable(usersData);
  })
  .catch(error => console.error('Hiba:', error));

// Tábla megjelenítése
function renderTable(data) {
  const tableBody = document.querySelector('#userTable tbody');
  tableBody.innerHTML = '';

  data.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
    tableBody.appendChild(row);
  });
}

// Rendezés oszlop alapján
document.querySelectorAll('#userTable th').forEach(header => {
  header.addEventListener('click', () => {
    const column = header.dataset.column;
    const order = header.dataset.order;

    const sortedData = [...usersData].sort((a, b) => {
      const aVal = a[column].toLowerCase();
      const bVal = b[column].toLowerCase();
      return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

    header.dataset.order = order === 'asc' ? 'desc' : 'asc';
    header.textContent = header.textContent.slice(0, -1) + (order === 'asc' ? '▼' : '▲');

    renderTable(sortedData);
  });
});

// Keresés
document.querySelector('#searchInput').addEventListener('input', e => {
  const value = e.target.value.toLowerCase();
  const filtered = usersData.filter(user => user.name.toLowerCase().includes(value));
  renderTable(filtered);
});
