//classes + utitlities
    //Entry class - single income - or expense card 
    class Entry {
        constructor(title, amount, description) {
            this.title = title;
            this.amount = Number(amount); //amount will be stored as a number 
            this.description = description;
            this.id = Date.now(); //time stamp 
        }
    }
    //budget class- the brains - managing incomes sn expenses 
class Budget {
    #income = 0; //private fields
    #expenses = 0;
    incomes = [];//array to store entries
    expenses = [];
    //methods 
    addIncome(entry) {
        this.incomes.push(entry);
        this.#income += entry.amount;
    }//updates total income w every entry 
    addExpense(entry) {
        this.expenses.push(entry);
        this.#expenses += entry.amount;
    }//updaates total income with every entry 
    //gets
    get totalIncome() {
        return this.#income;
    }
    get totalExpenses() {
        return this.#expenses;
    }
    //calculate remaining 
    get available() {
        return this.#income - this.#expenses;
    }
    //live formala 
}

//utility- helper functions
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
    //charAt(0) -grabbing character at said index.
    //capitalizing the first letter of every string
}

function formatMoney(amount) {
    return Number(amount).toFixed(2);
    //toFixed - fixes the num after decimal to amount
}

//DOM events- have to wrap UI dependent code 
document.addEventListener("DOMContentLoaded", () => {
    //creating budget instance - budget brain 
    const budget = new Budget();

    //POPUP variables - welcome message and users name 
    const welcomePopup = document.querySelector("#welcome-popup");
    const nameInput = document.querySelector("#name-input");
    const nameSubmitButton = document.querySelector("#name-submit");
    const userNameSpan = document.querySelector("#user-name");
    const todaysDateSpan = document.querySelector("#todays-date");

    //INCOME variables
    const addIncomeBtn = document.querySelector("#add-income-btn");
    const addIncomeContainer = document.querySelector("#add-income-container");
    const submitIncomeBtn = document.querySelector("#submit-income-btn");
    const incomeInputAmount = document.querySelector("#incomeInputAmount");
    const totalIncomeSpan = document.querySelector("#totalIncome");
    const incomeTitleInput = document.querySelector("#income-description-input");

    //EXPENSES Variables 
    const addExpenseBtn = document.querySelector("#add-expense-btn");
    const addExpenseContainer = document.querySelector("#add-expense-container");
    const submitExpenseBtn = document.querySelector("#submit-expense-btn");
    const expenseInputAmount = document.querySelector("#expense-input-amount");
    const totalExpensesSpan = document.querySelector("#expenseTotal");

    //budget total
    const amountAvailableSpan = document.querySelector("#amount-available");

    //decription toggles
    const addIncomeDescriptionBtn = document.querySelector("#add-income-description-btn");
    const incomeDescriptionTextBox = document.querySelector("#description-textbox-income");
    const addExpenseDescriptionBtn = document.querySelector("#add-expense-description-btn");
    const expenseDescriptionTextbox = document.querySelector("#description-textbox-expenses");

    

    //show date 
    const today = new Date();
    const days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    todaysDateSpan.textContent = days[today.getDay()];
        //date- built in object 
        //new Date creates an object with the current date
        //getDay an object that returns the number index of the day of the week 
    //show full date 
    const fullDateSpan = document.querySelector("#full-date");
    //telling the computer how i want my want my dates 
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    fullDateSpan.textContent = today.toLocaleDateString(undefined, options);
    
    //taking users name and putting it in the main
    nameSubmitButton.addEventListener("click", () => {
        const nameEntry = nameInput.value.trim();
        //trim()-remove spaces around 

        if(!nameEntry) { //if NOT name entry
            alert("Please enter your name!");
            return;
        }
        //replace name into main- use capitalize function 
        userNameSpan.textContent = capitalize(nameEntry);
        welcomePopup.style.display = "none";
    });

    //open and close income and expense
    addIncomeBtn.addEventListener("click", () => {
        addIncomeBtn.style.display = "none"; //hide the add income button
        addIncomeContainer.style.display = 
           (addIncomeContainer.style.display === "flex" ? "none" : "flex");//contdition ? valueIfTrue : valueIfFalse
    }); 
    submitIncomeBtn.addEventListener("click", () => {
        addIncomeContainer.style.display = "none";
        addIncomeBtn.style.display = "flex";

        const title = incomeTitleInput.value.trim();
        const amount = Number(incomeInputAmount.value);
        //change string to number
        const description = document.querySelector("#description-textbox-income").value.trim();
        if(!title || !amount) { //if NOT AMOUNT - no amount entered
            alert("Uh oh! You're missing information!");
            return;
        }

        const entry = new Entry(title, amount, description);
        budget.addIncome(entry);
        updateUI();//function that updates the website when added 
        updateLogs();
    });

    addExpenseBtn.addEventListener("click", () => {
        addExpenseBtn.style.display = "none"; //hide add expense button
        addExpenseContainer.style.display = 
            (addExpenseContainer.style.display === "flex" ? "none" : "flex");
    });
    submitExpenseBtn.addEventListener("click", () => {
        addExpenseContainer.style.display = "none";
        addExpenseBtn.style.display = "flex";

        const title = document.querySelector("#expense-input-description").value.trim();
        const amount = Number(expenseInputAmount.value);
        //string to number
        const description = document.querySelector("#description-textbox-expenses").value.trim();

        if(!title || !amount) {
            alert("Uh oh! You're missing information!");
            return
        }

        const entry = new Entry(title, amount, description);
        budget.addExpense(entry);

        updateUI();
        updateLogs();
    });
    //create updateUI
    function updateUI() {
        //adding $ sign in front of updated numbers
        totalIncomeSpan.textContent = "$" + formatMoney(budget.totalIncome);
        totalExpensesSpan.textContent = "$" + formatMoney(budget.totalExpenses);
        //adding money spent 
        amountAvailableSpan.textContent = "$" + formatMoney(budget.available);
        //updating money spent 
        const spentAmountSpan = document.querySelector("#spent-amount");
        spentAmountSpan.textContent = "$" +formatMoney(budget.totalExpenses);


    };
    //updating log list
    function updateLogs() {
        const incomeList = document.querySelector("#income-list");
        const expenseList = document.querySelector("#expense-list");
        //clearing old logs 
        incomeList.innerHTML = "";
        expenseList.innerHTML = "";
        //adding elements through js to create "log cards"
        budget.incomes.forEach(entry => {
            const item = document.createElement("li");
            item.innerHTML = 
            `<strong>${entry.title}</strong> - $${formatMoney(entry.amount)}<br><small>${entry.description}</small>`;
            incomeList.appendChild(item);
        });
        budget.expenses.forEach(entry => {
            const item = document.createElement("li");
            item.innerHTML = 
            `<strong>${entry.title}</strong> - $${formatMoney(entry.amount)}<br><small>${entry.description}</small>`;
            expenseList.appendChild(item);
        });
    };
    //income description toggle
    addIncomeDescriptionBtn.addEventListener("click", () => {
        incomeDescriptionTextBox.style.display =
        incomeDescriptionTextBox.style.display === "flex" ? "none" : "flex";
    });
    //expense description toggler
    addExpenseDescriptionBtn.addEventListener("click", () => {
        expenseDescriptionTextbox.style.display =
        expenseDescriptionTextbox.style.display === "flex" ? "none" : "flex";
    })



})