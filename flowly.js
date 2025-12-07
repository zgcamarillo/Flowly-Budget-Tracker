//classes + utitlities
    //budget class
class Budget {
    #income = 0; //private fields
    #expenses = 0;
    //methods 
    addIncome(amount) {
        this.#income += Number(amount);
    }
    addExpense(amount) {
        this.#expenses += Number(amount);
    }
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
}

function formatMoney(amount) {
    return Number(amount).toFixed(2);
    //toFixed - fixes the num after decimal to amount
}

//DOM events- have to wrap UI dependent code 
document.addEventListener("DOMContentLoaded", () => {
    //creating budget instance - budget brain 
    const budget = new Budget();

    //POPUP variables
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

    //show date 
    const days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    todaysDateSpan.textContent = days[new Date().getDay()];
        //date- built in object 
        //new Date creates an object with the current date
        //getDay an object that returns the number index of the day of the week 
    
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
        const amount = Number(incomeInputAmount.value);
        //change string to number
        if(!amount) { //if NOT AMOUNT - no amount entered
            alert("Uh oh! You didn't enter an Income amount!");
            return;
        }

        budget.addIncome(amount);
        updateUI();//function that updates the website when added 
    });

    addExpenseBtn.addEventListener("click", () => {
        addExpenseBtn.style.display = "none"; //hide add expense button
        addExpenseContainer.style.display = 
            (addExpenseContainer.style.display === "flex" ? "none" : "flex");
    });
    submitExpenseBtn.addEventListener("click", () => {
        addExpenseContainer.style.display = "none";
        addExpenseBtn.style.display = "flex";
        const amount = Number(expenseInputAmount.value);
        //string to number 
        if(!amount) {
            alert("Uh oh! You didn't enter an Expense amount!");
            return
        }
        budget.addExpense(amount);
        updateUI();
    })
    //create updateUI
    function updateUI() {
        totalIncomeSpan.textContent = formatMoney(budget.totalIncome);
        totalExpensesSpan.textContent = formatMoney(budget.totalExpenses);
        amountAvailableSpan.textContent = formatMoney(budget.available);
    }


})