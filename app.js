let pieChart = null;
let pivotChart = null;

async function fetchData() {
    const month = document.getElementById('monthFilter').value;
    const category = document.getElementById('categoryFilter').value;
    
    const response = await fetch(`/api/data?month=${month}&category=${category}`);
    const data = await response.json();
    
    updateKPIs(data.kpi);
    updatePieChart(data.expense_by_category);
    updatePivotChart(data.pivot_data, data.months);
    updateFilters(data.categories, data.months);
    updateTransactionTable(data.transactions);
}

function updateKPIs(kpi) {
    document.getElementById('kpiIncome').textContent = formatCurrency(kpi.income);
    document.getElementById('kpiExpenses').textContent = formatCurrency(kpi.expenses);
    document.getElementById('kpiNet').textContent = formatCurrency(kpi.net);
    document.getElementById('kpiSavings').textContent = kpi.savings_pct + '%';
    
    const netElement = document.getElementById('kpiNet');
    netElement.style.color = kpi.net >= 0 ? '#00ff88' : '#ff6b6b';
}

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function updatePieChart(expenseByCategory) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    const labels = Object.keys(expenseByCategory);
    const values = Object.values(expenseByCategory);
    const total = values.reduce((a, b) => a + b, 0);
    
    const colors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
        '#ffeaa7', '#dfe6e9', '#fd79a8', '#a29bfe'
    ];
    
    if (pieChart) {
        pieChart.destroy();
    }
    
    Chart.register(ChartDataLabels);
    
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors.slice(0, labels.length),
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#fff',
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const percentage = ((value / total) * 100).toFixed(1);
                            const formatted = '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            return formatted + ' (' + percentage + '%)';
                        }
                    }
                },
                datalabels: {
                    display: false
                }
            }
        }
    });
}

function updatePivotChart(pivotData, months) {
    const ctx = document.getElementById('pivotChart').getContext('2d');
    
    const categories = Object.keys(pivotData);
    const colors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
        '#ffeaa7', '#dfe6e9', '#fd79a8', '#a29bfe'
    ];
    
    const datasets = categories.map((cat, index) => ({
        label: cat,
        data: months.map(month => pivotData[cat][month] || 0),
        backgroundColor: colors[index % colors.length],
        borderRadius: 4
    }));
    
    if (pivotChart) {
        pivotChart.destroy();
    }
    
    pivotChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: '#a0a0a0' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                y: {
                    stacked: true,
                    ticks: { 
                        color: '#a0a0a0',
                        display: false
                    },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#fff',
                        padding: 10,
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y;
                        }
                    }
                },
                datalabels: {
                    display: false
                }
            }
        }
    });
}

function updateFilters(categories, months) {
    const monthFilter = document.getElementById('monthFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    
    const currentMonth = monthFilter.value;
    const currentCategory = categoryFilter.value;
    
    if (monthFilter.options.length <= 1) {
        months.forEach(month => {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = month;
            monthFilter.appendChild(option);
        });
    }
    
    if (categoryFilter.options.length <= 1) {
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
    }
    
    monthFilter.value = currentMonth;
    categoryFilter.value = currentCategory;
}

function updateTransactionTable(transactions) {
}

document.getElementById('monthFilter').addEventListener('change', fetchData);
document.getElementById('categoryFilter').addEventListener('change', fetchData);

fetchData();
