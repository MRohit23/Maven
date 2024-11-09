let expenses = [];
let totalExpense = 0;

const fetchInitialExpenses = () => {
    return new Promise((resolve) => {
        const initialExpenses = [
            { description: "Groceries", amount: 5500, date: "2024-11-01" },
            { description: "Utilities", amount: 4000, date: "2024-10-28" },
            { description: "Transport", amount: 3600, date: "2024-11-02" },
        ];
        resolve(initialExpenses);
    });
};

const createTotalExpenseTracker = () => {
    return function (amount) {
        totalExpense += amount;
        document.getElementById("totalExpense").innerText =
            totalExpense.toFixed(2);
    };
};

const updateTotalExpense = createTotalExpenseTracker();

const addExpenses = (callback, ...newExpenses) => {
    newExpenses.forEach(({ description, amount, date }) => {
        expenses = [...expenses, { description, amount, date }];
        updateTotalExpense(amount);
    });
    callback("Expenses added successfully!");
};

const displayExpenses = (filteredExpenses = expenses) => {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    filteredExpenses.map(({ description, amount, date }) => {
        const expenseItem = document.createElement("div");
        expenseItem.className = "list-group-item";
        expenseItem.innerText = `${description}: ₹${amount} on ${date}`;
        expenseList.appendChild(expenseItem);
    });
};

const filterExpensesAbove = (minAmount) => {
    return expenses.filter(({ amount }) => amount > minAmount);
};

const sortExpensesByDate = () => {
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    displayExpenses();
};

const sortExpensesByAmount = () => {
    expenses.sort((a, b) => b.amount - a.amount);
    displayExpenses();
};

const handleAddExpense = () => {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (description && !isNaN(amount) && date) {
        addExpenses(
            (message) => {
                alert(message);
                displayExpenses();
            },
            { description, amount, date }
        );
    }
};

const handleHideExpenses = () => {
    const threshold = parseFloat(
        document.getElementById("hideThreshold").value
    );
    const filteredExpenses = filterExpensesAbove(threshold);
    displayExpenses(filteredExpenses);
};

document
    .getElementById("addExpense")
    .addEventListener("click", handleAddExpense);
document
    .getElementById("sortByDate")
    .addEventListener("click", sortExpensesByDate);
document
    .getElementById("sortByAmount")
    .addEventListener("click", sortExpensesByAmount);
document
    .getElementById("hideExpenses")
    .addEventListener("click", handleHideExpenses);

const loadInitialExpenses = async () => {
    try {
        const initialExpenses = await fetchInitialExpenses();
        addExpenses(() => {}, ...initialExpenses);
        displayExpenses();
    } catch (error) {
        console.error("Error loading expenses:", error);
    }
};

loadInitialExpenses();
