# Budget Dashboard

## Overview
A comprehensive budgeting website for tracking income and expenses with interactive dashboard, transaction history, pivot analysis, scenario planning, and financial memo.

## Features

### Dashboard
- KPI Cards: Income, Total Spend, Net, Savings %
- Visualizations: Doughnut chart (expenses by category) + Stacked bar pivot chart (monthly breakdown)
- Slicers: Filter data by Month and Category with live updates
- Add Transaction form with live data refresh

### Summary Page
- Calculated totals using formulas (no hard-coded numbers)
- Net = Income - Expenses
- Savings % = (Net / Income) × 100
- Needs/Wants/Savings breakdown
- Expense classification: Needs (Housing, Food, Utilities, Insurance, Transportation, Internet) and Wants (Entertainment, Shopping)

### Pivot Analysis Page
- Pivot Table A: Category × Sum of Amount (all expense categories with totals)
- Pivot Table B: Month × Sum of Amount (3-month breakdown)
- PivotChart: Monthly expense visualization

### Scenarios & Goal Seek Page
- Current vs Frugal scenario comparison
- Frugal scenario: 50% reduction in Want spending
- Comparison table showing Metric, Current, Frugal, and Difference
- Shows achievable savings targets (from 22% to 32.1%)
- Notes which cells changed and why

### Transactions Page
- Complete transaction history (60+ transactions)
- Sorted by date (newest first)
- Search/filter by category
- Shows Type, Category, Amount, Date, Month

### Monthly Memo Page
- Claim: Monthly savings goal statement (Goal: 20%, Achieved: 22%)
- Evidence: Data-driven KPI points with specific numbers
- Trade-off: Cost analysis of spending reduction
- Action: Two specific next steps for financial improvement

## Sample Data
- Income: $5,000 salary + $600-$1,200 freelance per month
- Total 3-month income: $20,800
- Total 3-month expenses: $16,225
- Total 3-month savings: $4,575
- Savings rate: 22%
- Covers January-March 2025
- Multiple categories: Housing, Food, Groceries, Transportation, Utilities, Internet, Insurance, Shopping, Entertainment

## Tech Stack
- Backend: Python Flask
- Frontend: HTML, CSS, JavaScript
- Charts: Chart.js
- Styling: Minimalist dark theme with white buttons, glass-morphism effects

## Project Structure
```
├── main.py              # Flask backend with API endpoints
├── templates/
│   ├── index.html       # Dashboard page
│   ├── summary.html     # Summary page with formulas
│   ├── pivot.html       # Pivot analysis page
│   ├── scenarios.html   # Scenarios and Goal Seek page
│   ├── transactions.html # Transactions history page
│   └── memo.html        # Monthly memo page
├── static/
│   ├── css/
│   │   └── style.css    # Shared styling
│   └── js/
│       ├── app.js       # Dashboard logic
│       ├── summary.js   # Summary page logic
│       ├── pivot.js     # Pivot analysis logic
│       ├── scenarios.js # Scenarios page logic
│       └── transactions.js # Transactions page logic
```

## API Endpoints
- `GET /` - Dashboard
- `GET /summary` - Summary page
- `GET /pivot` - Pivot analysis page
- `GET /scenarios` - Scenarios page
- `GET /transactions` - Transactions page
- `GET /memo` - Monthly memo page
- `GET /api/data` - Budget data with KPIs (supports filters)
- `GET /api/summary` - Summary calculations
- `GET /api/pivot-data` - Pivot table data
- `GET /api/scenarios` - Scenario comparison data
- `GET /api/all-transactions` - All transactions sorted by date
- `POST /api/transaction` - Add new transaction

## Deployment
- Configured for autoscale deployment on Replit
- Runs with gunicorn on port 5000
- Uses Cache-Control headers for proper caching

## Running Locally
```bash
python main.py
```
Access at http://localhost:5000
