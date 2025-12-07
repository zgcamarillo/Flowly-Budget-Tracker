//creating my variables 
    const welcomePopup = document.querySelector("#welcome-popup");
    const nameInput = document.querySelector("#name-input");
    const nameSubmitButton = document.querySelector("#name-submit");
    const userNameSpan = document.querySelector("#user-name");
    //variables on getting todays date 
    const todaysDateSpan = document.querySelector("#todays-date");
    //displaying the date
    const days = ["Sunday", "Monday", "Tuesday", "Wendnesday", "Thursday", "Friday", "Saturday"];
    const today = new Date(); //builtin function that tells the date 

//POPUP 
//only run code when content is fully loaded 
document.addEventListener('DOMContentLoaded', () => {
    //creating variables withing the function 
    
    //changing display style when page loads 
    welcomePopup.style.display = "flex";
   
    todaysDateSpan.textContent = days[today.getDay()];

    nameSubmitButton.onclick = () => {
        const userName = nameInput.value.trim(); //trim- removing spaces before.after name 

        if (userName) {
            //making sure name is capitaalize
            const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);// first letter uppercaser; using slice to leave the rest of the string as is
            //sending name to main page
            userNameSpan.textContent = formattedName;
            //hide the popup when button is clicked
            welcomePopup.style.display = "none";

        } else {
            alert('Please enter your name!')
        };
    };
});


