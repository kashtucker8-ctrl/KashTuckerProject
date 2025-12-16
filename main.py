from flask import Flask, render_template, jsonify, request
from datetime import datetime, timedelta

app = Flask(__name__)

budget_data = [
    {"id": 1, "category": "Salary", "type": "income", "amount": 5000, "month": "January", "date": "2025-01-01"},
    {"id": 2, "category": "Freelance", "type": "income", "amount": 1200, "month": "January", "date": "2025-01-03"},
    {"id": 3, "category": "Housing", "type": "expense", "amount": 1500, "month": "January", "date": "2025-01-02", "classification": "needs"},
    {"id": 4, "category": "Food", "type": "expense", "amount": 145, "month": "January", "date": "2025-01-04", "classification": "needs"},
    {"id": 5, "category": "Food", "type": "expense", "amount": 130, "month": "January", "date": "2025-01-05", "classification": "needs"},
    {"id": 6, "category": "Transportation", "type": "expense", "amount": 180, "month": "January", "date": "2025-01-06", "classification": "needs"},
    {"id": 7, "category": "Groceries", "type": "expense", "amount": 280, "month": "January", "date": "2025-01-07", "classification": "needs"},
    {"id": 8, "category": "Utilities", "type": "expense", "amount": 120, "month": "January", "date": "2025-01-08", "classification": "needs"},
    {"id": 9, "category": "Entertainment", "type": "expense", "amount": 200, "month": "January", "date": "2025-01-09", "classification": "wants"},
    {"id": 10, "category": "Food", "type": "expense", "amount": 140, "month": "January", "date": "2025-01-11", "classification": "needs"},
    {"id": 11, "category": "Insurance", "type": "expense", "amount": 200, "month": "January", "date": "2025-01-12", "classification": "needs"},
    {"id": 12, "category": "Shopping", "type": "expense", "amount": 350, "month": "January", "date": "2025-01-14", "classification": "wants"},
    {"id": 13, "category": "Groceries", "type": "expense", "amount": 320, "month": "January", "date": "2025-01-15", "classification": "needs"},
    {"id": 14, "category": "Transportation", "type": "expense", "amount": 200, "month": "January", "date": "2025-01-16", "classification": "needs"},
    {"id": 15, "category": "Food", "type": "expense", "amount": 160, "month": "January", "date": "2025-01-18", "classification": "needs"},
    {"id": 16, "category": "Entertainment", "type": "expense", "amount": 280, "month": "January", "date": "2025-01-19", "classification": "wants"},
    {"id": 17, "category": "Internet", "type": "expense", "amount": 60, "month": "January", "date": "2025-01-20", "classification": "needs"},
    {"id": 18, "category": "Shopping", "type": "expense", "amount": 380, "month": "January", "date": "2025-01-22", "classification": "wants"},
    {"id": 19, "category": "Groceries", "type": "expense", "amount": 340, "month": "January", "date": "2025-01-23", "classification": "needs"},
    {"id": 20, "category": "Food", "type": "expense", "amount": 150, "month": "January", "date": "2025-01-25", "classification": "needs"},
    {"id": 21, "category": "Transportation", "type": "expense", "amount": 180, "month": "January", "date": "2025-01-27", "classification": "needs"},
    {"id": 22, "category": "Entertainment", "type": "expense", "amount": 300, "month": "January", "date": "2025-01-28", "classification": "wants"},
    {"id": 23, "category": "Freelance", "type": "income", "amount": 800, "month": "January", "date": "2025-01-29"},
    {"id": 24, "category": "Salary", "type": "income", "amount": 5000, "month": "February", "date": "2025-02-01"},
    {"id": 25, "category": "Housing", "type": "expense", "amount": 1500, "month": "February", "date": "2025-02-01", "classification": "needs"},
    {"id": 26, "category": "Groceries", "type": "expense", "amount": 310, "month": "February", "date": "2025-02-02", "classification": "needs"},
    {"id": 27, "category": "Food", "type": "expense", "amount": 150, "month": "February", "date": "2025-02-03", "classification": "needs"},
    {"id": 28, "category": "Utilities", "type": "expense", "amount": 125, "month": "February", "date": "2025-02-04", "classification": "needs"},
    {"id": 29, "category": "Transportation", "type": "expense", "amount": 190, "month": "February", "date": "2025-02-05", "classification": "needs"},
    {"id": 30, "category": "Shopping", "type": "expense", "amount": 300, "month": "February", "date": "2025-02-06", "classification": "wants"},
    {"id": 31, "category": "Entertainment", "type": "expense", "amount": 260, "month": "February", "date": "2025-02-07", "classification": "wants"},
    {"id": 32, "category": "Food", "type": "expense", "amount": 145, "month": "February", "date": "2025-02-08", "classification": "needs"},
    {"id": 33, "category": "Insurance", "type": "expense", "amount": 200, "month": "February", "date": "2025-02-09", "classification": "needs"},
    {"id": 34, "category": "Groceries", "type": "expense", "amount": 330, "month": "February", "date": "2025-02-10", "classification": "needs"},
    {"id": 35, "category": "Freelance", "type": "income", "amount": 600, "month": "February", "date": "2025-02-11"},
    {"id": 36, "category": "Transportation", "type": "expense", "amount": 180, "month": "February", "date": "2025-02-12", "classification": "needs"},
    {"id": 37, "category": "Food", "type": "expense", "amount": 155, "month": "February", "date": "2025-02-14", "classification": "needs"},
    {"id": 38, "category": "Entertainment", "type": "expense", "amount": 300, "month": "February", "date": "2025-02-15", "classification": "wants"},
    {"id": 39, "category": "Internet", "type": "expense", "amount": 60, "month": "February", "date": "2025-02-16", "classification": "needs"},
    {"id": 40, "category": "Groceries", "type": "expense", "amount": 350, "month": "February", "date": "2025-02-18", "classification": "needs"},
    {"id": 41, "category": "Shopping", "type": "expense", "amount": 380, "month": "February", "date": "2025-02-20", "classification": "wants"},
    {"id": 42, "category": "Food", "type": "expense", "amount": 160, "month": "February", "date": "2025-02-22", "classification": "needs"},
    {"id": 43, "category": "Transportation", "type": "expense", "amount": 200, "month": "February", "date": "2025-02-24", "classification": "needs"},
    {"id": 44, "category": "Salary", "type": "income", "amount": 5000, "month": "March", "date": "2025-03-01"},
    {"id": 45, "category": "Bonus", "type": "income", "amount": 2000, "month": "March", "date": "2025-03-02"},
    {"id": 46, "category": "Housing", "type": "expense", "amount": 1500, "month": "March", "date": "2025-03-01", "classification": "needs"},
    {"id": 47, "category": "Groceries", "type": "expense", "amount": 340, "month": "March", "date": "2025-03-03", "classification": "needs"},
    {"id": 48, "category": "Food", "type": "expense", "amount": 165, "month": "March", "date": "2025-03-04", "classification": "needs"},
    {"id": 49, "category": "Utilities", "type": "expense", "amount": 115, "month": "March", "date": "2025-03-05", "classification": "needs"},
    {"id": 50, "category": "Transportation", "type": "expense", "amount": 210, "month": "March", "date": "2025-03-06", "classification": "needs"},
    {"id": 51, "category": "Shopping", "type": "expense", "amount": 400, "month": "March", "date": "2025-03-07", "classification": "wants"},
    {"id": 52, "category": "Entertainment", "type": "expense", "amount": 320, "month": "March", "date": "2025-03-08", "classification": "wants"},
    {"id": 53, "category": "Insurance", "type": "expense", "amount": 200, "month": "March", "date": "2025-03-09", "classification": "needs"},
    {"id": 54, "category": "Food", "type": "expense", "amount": 170, "month": "March", "date": "2025-03-10", "classification": "needs"},
    {"id": 55, "category": "Freelance", "type": "income", "amount": 1200, "month": "March", "date": "2025-03-11"},
    {"id": 56, "category": "Groceries", "type": "expense", "amount": 360, "month": "March", "date": "2025-03-12", "classification": "needs"},
    {"id": 57, "category": "Transportation", "type": "expense", "amount": 200, "month": "March", "date": "2025-03-13", "classification": "needs"},
    {"id": 58, "category": "Entertainment", "type": "expense", "amount": 340, "month": "March", "date": "2025-03-14", "classification": "wants"},
    {"id": 59, "category": "Internet", "type": "expense", "amount": 60, "month": "March", "date": "2025-03-15", "classification": "needs"},
    {"id": 60, "category": "Shopping", "type": "expense", "amount": 400, "month": "March", "date": "2025-03-17", "classification": "wants"},
    {"id": 61, "category": "Food", "type": "expense", "amount": 180, "month": "March", "date": "2025-03-19", "classification": "needs"},
    {"id": 62, "category": "Groceries", "type": "expense", "amount": 355, "month": "March", "date": "2025-03-20", "classification": "needs"},
]

@app.route('/')
def index():
    response = app.make_response(render_template('index.html'))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response

@app.route('/transactions')
def transactions():
    response = app.make_response(render_template('transactions.html'))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response

@app.route('/memo')
def memo():
    response = app.make_response(render_template('memo.html'))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response

@app.route('/summary')
def summary():
    response = app.make_response(render_template('summary.html'))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response

@app.route('/pivot')
def pivot():
    response = app.make_response(render_template('pivot.html'))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response

@app.route('/scenarios')
def scenarios():
    response = app.make_response(render_template('scenarios.html'))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response

@app.route('/api/data')
def get_data():
    category = request.args.get('category', 'all')
    month = request.args.get('month', 'all')
    
    filtered_data = budget_data
    
    if category != 'all':
        filtered_data = [d for d in filtered_data if d['category'] == category]
    
    if month != 'all':
        filtered_data = [d for d in filtered_data if d['month'] == month]
    
    income = sum(d['amount'] for d in filtered_data if d['type'] == 'income')
    expenses = sum(d['amount'] for d in filtered_data if d['type'] == 'expense')
    net = income - expenses
    savings_pct = (net / income * 100) if income > 0 else 0
    
    categories = list(set(d['category'] for d in budget_data))
    months_list = ["January", "February", "March"]
    
    expense_by_category = {}
    for d in filtered_data:
        if d['type'] == 'expense':
            expense_by_category[d['category']] = expense_by_category.get(d['category'], 0) + d['amount']
    
    pivot_data = {}
    for d in filtered_data:
        if d['type'] == 'expense':
            cat = d['category']
            mon = d['month']
            if cat not in pivot_data:
                pivot_data[cat] = {}
            pivot_data[cat][mon] = pivot_data[cat].get(mon, 0) + d['amount']
    
    return jsonify({
        'kpi': {
            'income': income,
            'expenses': expenses,
            'net': net,
            'savings_pct': round(savings_pct, 1)
        },
        'expense_by_category': expense_by_category,
        'pivot_data': pivot_data,
        'categories': sorted(categories),
        'months': months_list,
        'transactions': filtered_data
    })

@app.route('/api/all-transactions')
def get_all_transactions():
    transactions = sorted(budget_data, key=lambda x: x['date'], reverse=True)
    return jsonify({'transactions': transactions})

@app.route('/api/summary')
def get_summary():
    income = sum(d['amount'] for d in budget_data if d['type'] == 'income')
    expenses = sum(d['amount'] for d in budget_data if d['type'] == 'expense')
    net = income - expenses
    savings_pct = (net / income * 100) if income > 0 else 0
    
    needs = sum(d['amount'] for d in budget_data if d['type'] == 'expense' and d.get('classification') == 'needs')
    wants = sum(d['amount'] for d in budget_data if d['type'] == 'expense' and d.get('classification') == 'wants')
    savings = net
    
    return jsonify({
        'income': income,
        'expenses': expenses,
        'net': net,
        'savings_pct': round(savings_pct, 1),
        'needs': needs,
        'wants': wants,
        'savings': savings
    })

@app.route('/api/pivot-data')
def get_pivot_data():
    pivot_by_category = {}
    pivot_by_month = {}
    
    for d in budget_data:
        if d['type'] == 'expense':
            cat = d['category']
            mon = d['month']
            
            if cat not in pivot_by_category:
                pivot_by_category[cat] = 0
            pivot_by_category[cat] += d['amount']
            
            if mon not in pivot_by_month:
                pivot_by_month[mon] = 0
            pivot_by_month[mon] += d['amount']
    
    return jsonify({
        'by_category': pivot_by_category,
        'by_month': pivot_by_month
    })

@app.route('/api/custom-scenario')
def get_custom_scenario():
    goal_pct = request.args.get('goal', 22, type=float)
    fixed_categories = {'Housing', 'Internet', 'Utilities', 'Insurance'}
    
    income = sum(d['amount'] for d in budget_data if d['type'] == 'income')
    expenses = sum(d['amount'] for d in budget_data if d['type'] == 'expense')
    
    target_savings = income * (goal_pct / 100)
    target_expenses = income - target_savings
    
    current_by_category = {}
    fixed_spending = 0
    adjustable_spending = 0
    
    for d in budget_data:
        if d['type'] == 'expense':
            cat = d['category']
            if cat not in current_by_category:
                current_by_category[cat] = 0
            current_by_category[cat] += d['amount']
    
    for cat, amount in current_by_category.items():
        if cat in fixed_categories:
            fixed_spending += amount
        else:
            adjustable_spending += amount
    
    available_for_adjustment = target_expenses - fixed_spending
    reduction_factor = available_for_adjustment / adjustable_spending if adjustable_spending > 0 else 1
    
    adjusted_by_category = {}
    for cat, amount in current_by_category.items():
        if cat in fixed_categories:
            adjusted_by_category[cat] = amount
        else:
            adjusted_by_category[cat] = amount * reduction_factor
    
    return jsonify({
        'goal_pct': goal_pct,
        'income': income,
        'current_expenses': expenses,
        'target_expenses': round(target_expenses, 2),
        'target_savings': round(target_savings, 2),
        'current_by_category': current_by_category,
        'adjusted_by_category': adjusted_by_category,
        'fixed_categories': list(fixed_categories),
        'reduction_factor': round(reduction_factor * 100, 1)
    })

@app.route('/api/scenarios')
def get_scenarios():
    income = sum(d['amount'] for d in budget_data if d['type'] == 'income')
    expenses = sum(d['amount'] for d in budget_data if d['type'] == 'expense')
    net = income - expenses
    current_savings_pct = (net / income * 100) if income > 0 else 0
    
    wants = sum(d['amount'] for d in budget_data if d['type'] == 'expense' and d.get('classification') == 'wants')
    needs = sum(d['amount'] for d in budget_data if d['type'] == 'expense' and d.get('classification') == 'needs')
    
    current = {
        'income': income,
        'needs': needs,
        'wants': wants,
        'savings': net,
        'savings_pct': round(current_savings_pct, 1)
    }
    
    frugal_wants = wants * 0.5
    frugal_expenses = needs + frugal_wants
    frugal_net = income - frugal_expenses
    frugal_savings_pct = (frugal_net / income * 100) if income > 0 else 0
    
    frugal = {
        'income': income,
        'needs': needs,
        'wants': round(frugal_wants, 2),
        'savings': round(frugal_net, 2),
        'savings_pct': round(frugal_savings_pct, 1)
    }
    
    difference = {
        'income': 0,
        'needs': 0,
        'wants': round(frugal['wants'] - current['wants'], 2),
        'savings': round(frugal['savings'] - current['savings'], 2),
        'savings_pct': round(frugal['savings_pct'] - current['savings_pct'], 1)
    }
    
    return jsonify({
        'current': current,
        'frugal': frugal,
        'difference': difference
    })

@app.route('/api/transaction', methods=['POST'])
def add_transaction():
    data = request.json
    new_id = max(d['id'] for d in budget_data) + 1
    new_transaction = {
        'id': new_id,
        'category': data['category'],
        'type': data['type'],
        'amount': float(data['amount']),
        'month': data['month'],
        'date': data.get('date', '2025-03-21')
    }
    budget_data.append(new_transaction)
    return jsonify({'success': True, 'transaction': new_transaction})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
