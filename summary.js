async function loadSummary() {
    const response = await fetch('/api/summary');
    const data = await response.json();
    
    document.getElementById('summaryIncome').textContent = formatCurrency(data.income);
    document.getElementById('summaryNeeds').textContent = formatCurrency(data.needs);
    document.getElementById('summaryWants').textContent = formatCurrency(data.wants);
    document.getElementById('summaryExpenses').textContent = formatCurrency(data.needs + data.wants);
    document.getElementById('summaryNet').textContent = formatCurrency(data.net);
    document.getElementById('summarySavingsPct').textContent = data.savings_pct + '%';
}

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

loadSummary();
