// Global elements selectors
const inputValue = document.querySelector('.coin-input');
const bodyContainer = document.querySelector('.body-container');
const messageBox = document.querySelector('.message');

let cardsArray = [];


// Variables mainly responsable on rendering data
let row = "";
let moreInfoBox = "";
let thatNum = 0;

const buttonsArray = [
  $("li button:eq(0)"),
  $("li button:eq(1)"),
  $("li button:eq(2)"),
];

// Functions
function insertToDOM() {
  $(".body-container").empty();
  $("#chart-container").empty();
  coinArr = [];
  fetchCoins();
}

const renderCoins = (coinArr) => {
  // 1) Loop over result array
  for (i = 0; i < coinArr.length; i++) {

    // 2) Create DOM elements
    const coinCard = document.createElement("Div");
    const headInfo = document.createElement("Div");
    const coinSymbel = document.createElement("p");
    const coinName = document.createElement("p");
    const moreInfoBTN = document.createElement("button");
    const switchBTN = document.createElement("Div");
    const switchInput = document.createElement("input");
    const switchLabel = document.createElement("label");

    // 3) create object with all created elements for a single coin card
    const cardObj = {coinCard,headInfo,coinSymbel,coinName,moreInfoBTN,switchBTN,switchInput,switchLabel}

    // 4) Set classes
    addClasses(cardObj);
    
    // 5) Set card attributes
    setAttributes(cardObj);
    
    // 6) Set Text
    setText(cardObj);
    
    // 7) Arrange hierarchy inside coin card
    setHierarchy(cardObj);

    // 8) Complete the card and push it to the cardsArray
    cardsArray.push(cardObj.coinCard);
  }
  // 9) After cards HTML are ready render all cards once as the for loop ends
  appendInCard(cardsArray) 
};

// Handle classes in coin card
const addClasses = (cardObj) => {
  cardObj.coinCard.classList.add("coin-card");
  cardObj.headInfo.classList.add("headInfo");
  cardObj.moreInfoBTN.classList.add("btn");
  cardObj.moreInfoBTN.classList.add("btn-info");
  cardObj.moreInfoBTN.classList.add("mybtn");
  cardObj.switchBTN.classList.add("form-check");
  cardObj.switchInput.classList.add("form-check-input");
  cardObj.switchBTN.classList.add("form-switch");
  cardObj.switchLabel.classList.add("form-check-label");
} 

// Handle attributs in coin card
const setAttributes = (cardObj) => {
  cardObj.moreInfoBTN.setAttribute("onclick", "moreInfo()");
  cardObj.moreInfoBTN.setAttribute("data-toggle", "collapse");
  cardObj.moreInfoBTN.setAttribute("data-target", "info");
  cardObj.moreInfoBTN.setAttribute("num", i);
  cardObj.switchInput.setAttribute("num1", i);
  cardObj.switchInput.setAttribute("type", "checkbox");
  cardObj.switchInput.setAttribute("role", "switch");
  cardObj.switchInput.setAttribute("onclick", "addCoinsToArray()");
  cardObj.switchLabel.setAttribute("for", "flexSwitchCheckChecked");
  cardObj.coinName.classList.add("coin-name");
  cardObj.coinSymbel.classList.add("coin-symbol");
}

// Handle text inside coin card
const setText = (cardObj) => {
  cardObj.coinSymbel.innerText = coinArr[i].symbol;
  cardObj.coinName.innerText = coinArr[i].nameCrypto;
  cardObj.moreInfoBTN.innerText = "More Info";
} 

// Handle elements order
const setHierarchy = (cardObj) => {
  cardObj?.switchBTN?.appendChild(cardObj.switchInput);
  cardObj?.switchBTN?.appendChild(cardObj.switchLabel);
  cardObj?.headInfo?.appendChild(cardObj.coinSymbel);
  cardObj?.headInfo?.appendChild(cardObj.switchBTN);
  cardObj?.coinCard?.appendChild(cardObj.headInfo);
  cardObj?.coinCard?.appendChild(cardObj.coinName);
  cardObj?.coinCard?.appendChild(cardObj.moreInfoBTN);
}

// Complete card element
const appendInCard = (cardsArray) => {
  // Check the length of the cards array
  const cardsCount = cardsArray.length;

  // Hide the waiting info message
  messageBox.classList.add('hidden');

  // grid-Template-Columns property will be set 3 times max if the body container have 3 cards or more 
  if (bodyContainer && cardsCount === 1) bodyContainer.style.gridTemplateColumns = 'auto';
  if (bodyContainer && cardsCount === 2) bodyContainer.style.gridTemplateColumns = 'auto auto';
  if (bodyContainer && cardsCount > 3) bodyContainer.style.gridTemplateColumns = 'auto auto auto';

  // render cards array
  $(".body-container").append(cardsArray);    
}

// That function recives type of button and by comparing the type and the buttons text the
// function will decide which button need to highlighted and which not
const highlightButton = (type) => {
  buttonsArray.forEach((btn) => {
    if (btn.text() === type) btn.addClass("highlightedBTN");
    if (btn.text() !== type) btn.removeClass("highlightedBTN");
  });
};

// Swal alert in modal window recives object that possibly contains error message from jQuery,
// and 3 custom parameters iconType titleText and updateError for swal settings
const renderError = (errorOBJ,iconType,titleText,updateError) => {
  // Default values
  let errorMsg = 'Somthing went wrong';
  let icon = 'error';
  let title = 'Error!';

  // Change default values only by the next conditions
  if(errorOBJ?.xhr?.status === 404) errorMsg = 'No coins found,please try to search another coin!';
  if(iconType) icon = iconType;
  if(titleText) title = titleText;
  if(updateError) errorMsg = updateError;

  // Fire swal alert with the properties set above
  setTimeout(() => {
    Swal.fire({
      title: title,
      text: errorMsg,
      icon: icon,
      confirmButtonText: "ok",
    });
  },250)
}

// About page settings
const renderAbout = () => {
  $(".body-container").empty();
  $("#chart-container").empty();
  row = `<H3>this site is about crypto currency</H3>`;
  $(".body-container").append(row);
  highlightButton("About");
  if(bodyContainer) bodyContainer.classList.remove('hidden');
}
