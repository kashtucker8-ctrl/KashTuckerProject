let pivotChart = null;

async function loadPivotData() {
    const response = await fetch('/api/pivot-data');
    const data = await response.json();
    
    displayPivotTableA(data.by_category);
    displayPivotTableB(data.by_month);
    displayPivotChart(data.by_month);
}

function displayPivotTableA(byCategory) {
    const tbody = document.getElementById('pivotTableA');
    tbody.innerHTML = '';
    
    const sorted = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
    
    sorted.forEach(([category, amount]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category}</td>
            <td>${formatCurrency(amount)}</td>
        `;
        tbody.appendChild(row);
    });
}

function displayPivotTableB(byMonth) {
    const tbody = document.getElementById('pivotTableB');
    tbody.innerHTML = '';
    
    const months = ['January', 'February', 'March'];
    months.forEach(month => {
        const amount = byMonth[month] || 0;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${month}</td>
            <td>${formatCurrency(amount)}</td>
        `;
        tbody.appendChild(row);
    });
}

function displayPivotChart(byMonth) {
    const ctx = document.getElementById('pivotChart').getContext('2d');
    const months = ['January', 'February', 'March'];
    const amounts = months.map(m => byMonth[m] || 0);
    
    if (pivotChart) {
        pivotChart.destroy();
    }
    
    pivotChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Total Expenses',
                data: amounts,
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#a0a0a0',
                        callback: value => '$' + value
                    },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#a0a0a0' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
}

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

loadPivotData();
