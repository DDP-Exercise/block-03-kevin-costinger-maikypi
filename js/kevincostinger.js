"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     maikypi - 2026-03-29
 *******************************************************/

let sumExpenses = 0; //Use this variable to keep the sum up to date.

const form = document.querySelector("form");
const dateInput = document.getElementById("date");
const amountInput = document.getElementById("amount");
const expenseInput = document.getElementById("expense");
const expensesTableBody = document.querySelector("#expenses tbody");
const expenseSum = document.getElementById("expenseSum");

/* Zeigt die Summe im HTML an */
function updateExpenseSum() {
    expenseSum.textContent = formatEuro(sumExpenses);
}

/*erstellt eine neue Tabellenzeile*/
function addExpenseRow(date, amount, expense) {
    const row = document.createElement("tr");
    /*füllt die Zeile mit Inhalt: Datum, Betrag (formatiert), Text, Delete-Button */
    row.innerHTML = `
        <td>${date}</td>
        <td>${formatEuro(amount)}</td>
        <td>${expense}</td>
        <td><button type="button" class="deleteBtn" data-amount="${amount}">Delete</button></td>
    `;
    /* data-amount = hier speichern wir den betrag */
    expensesTableBody.appendChild(row); /*fügt die Zeile zur Tabelle hinzu*/
}
//TODO: Prevent the default behavior of the submit button.
//TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.

function submitForm(e){
    /*submitForm = Seite lädt neu wird verhindert */
    e.preventDefault();

    const dateValue = dateInput.value;
    const amountValue = parseFloat(amountInput.value);
    const expenseValue = expenseInput.value.trim();

    if (isEmpty(dateValue)) {
        dateInput.focus();
        return;
    }

    if (isNaN(amountValue) || amountValue < 0.01) {
        amountInput.focus();
        return;
    }

    if (expenseValue.length < 3) {
        expenseInput.focus();
        return;
    }

    addExpenseRow(dateValue, amountValue, expenseValue);

    sumExpenses += amountValue;
    updateExpenseSum();

    form.reset();
    dateInput.focus();
}

form.addEventListener("submit", submitForm); /* = wenn man auf submit drückt, wird submitForm ausgeführt */
expensesTableBody.addEventListener("click", function(e) {
    if (e.target.classList.contains("deleteBtn")) { /* wurde ein delete button gedrückt? */
        const amount = parseFloat(e.target.dataset.amount);
        sumExpenses -= amount;
        updateExpenseSum();
        /*Betrag holen, Summe verringern, Zeile löschen*/

        e.target.closest("tr").remove();
    }
});


/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}
