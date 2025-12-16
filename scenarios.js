async function loadScenarios() {
    const response = await fetch('/api/scenarios');
    const data = await response.json();
    
    const current = data.current;
    const frugal = data.frugal;
    const diff = data.difference;
    
    document.getElementById('currentIncome').textContent = formatCurrency(current.income);
    document.getElementById('frugalIncome').textContent = formatCurrency(frugal.income);
    document.getElementById('diffIncome').textContent = formatCurrency(diff.income);
    
    document.getElementById('currentNeeds').textContent = formatCurrency(current.needs);
    document.getElementById('frugalNeeds').textContent = formatCurrency(frugal.needs);
    document.getElementById('diffNeeds').textContent = formatCurrency(diff.needs);
    
    document.getElementById('currentWants').textContent = formatCurrency(current.wants);
    document.getElementById('frugalWants').textContent = formatCurrency(frugal.wants);
    document.getElementById('diffWants').textContent = formatCurrency(diff.wants);
    
    document.getElementById('currentSavings').textContent = formatCurrency(current.savings);
    document.getElementById('frugalSavings').textContent = formatCurrency(frugal.savings);
    document.getElementById('diffSavings').textContent = formatCurrency(diff.savings);
    
    document.getElementById('currentSavingsPct').textContent = current.savings_pct + '%';
    document.getElementById('frugalSavingsPct').textContent = frugal.savings_pct + '%';
    document.getElementById('diffSavingsPct').textContent = (diff.savings_pct >= 0 ? '+' : '') + diff.savings_pct + '%';
}

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

async function calculateCustomScenario() {
    const goal = document.getElementById('goalInput').value;
    const response = await fetch(`/api/custom-scenario?goal=${goal}`);
    const data = await response.json();
    
    document.getElementById('goalValue').textContent = data.goal_pct + '%';
    document.getElementById('targetExpenses').textContent = formatCurrency(data.target_expenses);
    document.getElementById('targetSavings').textContent = formatCurrency(data.target_savings);
    document.getElementById('reductionFactor').textContent = data.reduction_factor + '%';
    
    const tbody = document.getElementById('customTableBody');
    tbody.innerHTML = '';
    
    const current = data.current_by_category;
    const adjusted = data.adjusted_by_category;
    const fixedCategories = data.fixed_categories;
    const categories = Object.keys(current).sort();
    
    categories.forEach(cat => {
        const currentAmount = current[cat];
        const adjustedAmount = adjusted[cat];
        const change = adjustedAmount - currentAmount;
        const isFixed = fixedCategories.includes(cat);
        
        const row = document.createElement('tr');
        const fixedLabel = isFixed ? ' (Fixed)' : '';
        row.innerHTML = `
            <td>${cat}${fixedLabel}</td>
            <td>${formatCurrency(currentAmount)}</td>
            <td>${formatCurrency(adjustedAmount)}</td>
            <td class="${isFixed ? '' : change < 0 ? 'highlight-green' : 'highlight-red'}">${isFixed ? '—' : formatCurrency(change)}</td>
        `;
        if (isFixed) {
            row.style.opacity = '0.7';
        }
        tbody.appendChild(row);
    });
    
    document.getElementById('customTable').style.display = 'table';
    document.getElementById('customSummary').style.display = 'block';
}

loadScenarios();
