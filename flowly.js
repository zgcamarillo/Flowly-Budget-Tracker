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
    return text.charAt(0).toUpperCase + text.slice(1);
    //charAt(0) -grabbing character at said index.
}

function formatMoney(amount) {
    return Number(amount).toFixed(2);
    //toFixed - fixes the num after decimal to amount
}

//DOM events- have to wrap UI dependent code 
document.addEventListener("DOMContentLoaded", () => {
    //creating budget instance 
    const budget = new Budget();

    //POPUP variables
    const welcomePopup = document.querySelector("welcome-popup");
    const nameInput = document.querySelector("#name-input");
    const nameSubmitButton = document.querySelector("#name-submit");
    const userNameSpan = document.querySelector("#user-name");
    const todaysDateSpan = document.querySelector("#todays-date");

    //INCOME variables
    const addIncomeBtn = document.querySelector("#add-income-btn");
    const addIncomeContainer = document.querySelector("#add-income-container");
    const submitIncomeBtn = document.querySelector("#submit-income-btn");
    const incomeInputAmount = document.querySelector("incomeInputAmount");
    const totalIncomeSpan = document.querySelector("totalIncome");

    //EXPENSES Variables 
    const addExpenseBtn = document.querySelector("add-expense-btn");
    const addExpenseContaiiner = document.querySelector("add-expense-container");
    const submitExpenseBtn = document.querySelector("submit-expense-btn");
    const expenseInputAmount = document

})