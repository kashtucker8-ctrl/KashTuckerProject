let allTransactions = [];

async function loadTransactions() {
    const response = await fetch('/api/all-transactions');
    const data = await response.json();
    allTransactions = data.transactions;
    
    populateFilters();
    applyFilters();
}

function populateFilters() {
    const months = [...new Set(allTransactions.map(tx => tx.month))].sort();
    const types = [...new Set(allTransactions.map(tx => tx.type))].sort();
    const categories = [...new Set(allTransactions.map(tx => tx.category))].sort();
    
    const monthSelect = document.getElementById('monthFilter');
    months.forEach(month => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
    
    const typeChecklistDiv = document.getElementById('typeCheckboxes');
    const selectAllTypeLabel = document.createElement('label');
    selectAllTypeLabel.className = 'checkbox-label';
    selectAllTypeLabel.innerHTML = `<input type="checkbox" id="selectAllTypes" checked> Select All`;
    typeChecklistDiv.appendChild(selectAllTypeLabel);
    
    types.forEach(type => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
        label.innerHTML = `<input type="checkbox" class="type-checkbox" value="${type}" checked> ${capitalizedType}`;
        typeChecklistDiv.appendChild(label);
    });
    
    document.getElementById('selectAllTypes').addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.type-checkbox');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
        applyFilters();
    });
    
    document.querySelectorAll('.type-checkbox').forEach(cb => {
        cb.addEventListener('change', () => {
            const allCheckboxes = document.querySelectorAll('.type-checkbox');
            const selectAll = document.getElementById('selectAllTypes');
            selectAll.checked = Array.from(allCheckboxes).every(cb => cb.checked);
            applyFilters();
        });
    });
    
    const categoryChecklistDiv = document.getElementById('categoryCheckboxes');
    
    const selectAllLabel = document.createElement('label');
    selectAllLabel.className = 'checkbox-label';
    selectAllLabel.innerHTML = `<input type="checkbox" id="selectAllCategories" checked> Select All`;
    categoryChecklistDiv.appendChild(selectAllLabel);
    
    categories.forEach(cat => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        label.innerHTML = `<input type="checkbox" class="category-checkbox" value="${cat}" checked> ${cat}`;
        categoryChecklistDiv.appendChild(label);
    });
    
    document.getElementById('selectAllCategories').addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.category-checkbox');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
        applyFilters();
    });
    
    document.querySelectorAll('.category-checkbox').forEach(cb => {
        cb.addEventListener('change', () => {
            const allCheckboxes = document.querySelectorAll('.category-checkbox');
            const selectAll = document.getElementById('selectAllCategories');
            selectAll.checked = Array.from(allCheckboxes).every(cb => cb.checked);
            applyFilters();
        });
    });
}

function applyFilters() {
    const monthFilter = document.getElementById('monthFilter').value;
    
    const checkedTypes = Array.from(document.querySelectorAll('.type-checkbox:checked')).map(cb => cb.value);
    const checkedCategories = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(cb => cb.value);
    
    const filtered = allTransactions.filter(tx => {
        const monthMatch = !monthFilter || tx.month === monthFilter;
        const typeMatch = checkedTypes.length === 0 || checkedTypes.includes(tx.type);
        const categoryMatch = checkedCategories.length === 0 || checkedCategories.includes(tx.category);
        return monthMatch && typeMatch && categoryMatch;
    });
    
    displayTransactions(filtered);
}

function displayTransactions(transactions) {
    const tbody = document.querySelector('#transactionTable tbody');
    tbody.innerHTML = '';
    
    transactions.forEach(tx => {
        const row = document.createElement('tr');
        const dateObj = new Date(tx.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td class="type-${tx.type}">${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</td>
            <td>${tx.category}</td>
            <td>${formatCurrency(tx.amount)}</td>
            <td>${tx.month}</td>
        `;
        tbody.appendChild(row);
    });
    
    const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    document.getElementById('grandTotal').textContent = formatCurrency(total);
    
    if (transactions.length > 0) {
        document.getElementById('totalRow').style.display = 'table-row';
    } else {
        document.getElementById('totalRow').style.display = 'none';
    }
}

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

document.getElementById('monthFilter').addEventListener('change', applyFilters);

loadTransactions();
