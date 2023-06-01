// Global elements selectors
const inputValue = document.querySelector('.coin-input');
const bodyContainer = document.querySelector('.body-container');
const messageBox = document.querySelector('.message');

let cardsArray = [];

/////////////////////////////////////////////////////////////////////////////////////////////

// Variables mainly responsable on rendering data
let row = "";
let thatNum = 0;

const buttonsArray = [
  $("li button:eq(0)"),
  $("li button:eq(1)"),
  $("li button:eq(2)"),
];

// Functions
function insertToDOM() {
  const inputSearch = $('.coin-input').text();
  console.log(inputSearch);
  $(".body-container").empty();
  $("#chart-container").empty();
  coinArr = [];
  // fetchCoins(inputSearch);
  fetchCoins();
}

//////////////////////////////////////////////////////////////////////////////////////////////

// Functions

const renderCoins = (coinArr) => {
  // 1) Loop over result array
  for (i = 0; i < coinArr.length; i++) {

    // 2) Create DOM elements
    // a) main card elements
    const coinCard = document.createElement("Div");
    const headInfo = document.createElement("Div");
    const coinSymbel = document.createElement("p");
    const coinName = document.createElement("p");
    const moreInfoBTN = document.createElement("button");
    const switchBTN = document.createElement("Div");
    const switchInput = document.createElement("input");
    const switchLabel = document.createElement("label");

    // b) More info panel elements
    const moreInfoPanel = document.createElement("Div");
    const moreInfoImage = document.createElement("img");
    const infoTitle = document.createElement("p");
    const usd = document.createElement("p");
    const eur = document.createElement("p");
    const ils = document.createElement("p");

    
    // 3) create object with all created elements for a single coin card
    const cardObj = {coinCard,headInfo,coinSymbel,coinName,moreInfoBTN,switchBTN,switchInput,switchLabel}
    const moreInfoObj = {moreInfoPanel,moreInfoImage,infoTitle,usd,eur,ils};
    
    // 4) Set classes
    addClasses(cardObj,moreInfoObj);
    
    // 5) Set card attributes
    setAttributes(cardObj,moreInfoObj);
    
    // 6) Set Text
    setText(cardObj,moreInfoObj);
    
    // 7) Arrange hierarchy inside coin card
    setHierarchy(cardObj,moreInfoObj);
    
    // 8) Complete the card and push it to the cardsArray
    cardsArray.push(cardObj.coinCard);
  }
  // 9) After cards HTML are ready render all cards once as the for loop ends
  appendInCard(cardsArray) 
};

// Handle classes in coin card
const addClasses = (cardObj,moreInfoObj) => {
  cardObj.coinCard.classList.add("coin-card");
  cardObj.headInfo.classList.add("headInfo");
  cardObj.moreInfoBTN.classList.add("btn");
  cardObj.moreInfoBTN.classList.add("btn-info");
  cardObj.moreInfoBTN.classList.add("mybtn");
  cardObj.switchBTN.classList.add("form-check");
  cardObj.switchInput.classList.add("form-check-input");
  cardObj.switchBTN.classList.add("form-switch");
  cardObj.switchLabel.classList.add("form-check-label");
  cardObj.coinName.classList.add("coin-name");
  cardObj.coinSymbel.classList.add("coin-symbol");
  
  moreInfoObj.moreInfoPanel.classList.add("more-info-panel","hidden");
  moreInfoObj.moreInfoImage.classList.add("more-info-image");
  moreInfoObj.infoTitle.classList.add("info-title");
  moreInfoObj.usd.classList.add("usd");
  moreInfoObj.eur.classList.add("eur");
  moreInfoObj.ils.classList.add("ils");
} 


// Handle attributs in coin card
const setAttributes = (cardObj,moreInfoObj) => {
  cardObj.moreInfoBTN.setAttribute("onclick", "handleMoreInfo()");
  cardObj.moreInfoBTN.setAttribute("data-toggle", "collapse");
  cardObj.moreInfoBTN.setAttribute("data-target", "info");
  cardObj.moreInfoBTN.setAttribute("num", i);
  cardObj.switchInput.setAttribute("num1", i);
  cardObj.switchInput.setAttribute("type", "checkbox");
  cardObj.switchInput.setAttribute("role", "switch");
  cardObj.switchInput.setAttribute("onclick", "addCoinsToArray()");
  cardObj.switchLabel.setAttribute("for", "flexSwitchCheckChecked");

  moreInfoObj.moreInfoImage.setAttribute("src", "./src/img/bitcoin-g80ff29158_640.jpg");
}


// Handle text inside coin card
const setText = (cardObj,moreInfoObj) => {
  cardObj.coinSymbel.innerText = coinArr[i].symbol;
  cardObj.coinName.innerText = coinArr[i].nameCrypto;
  cardObj.moreInfoBTN.innerText = "More Info";
  
  moreInfoObj.infoTitle.innerText = 'Coin Prices:';
  moreInfoObj.usd.innerText = 'USD: $30';
  moreInfoObj.eur.innerText = 'EUR: €30';
  moreInfoObj.ils.innerText = 'ILS: ₪30';
} 

// Handle elements order
const setHierarchy = (cardObj, moreInfoObj) => {
  cardObj?.switchBTN?.appendChild(cardObj.switchInput);
  cardObj?.switchBTN?.appendChild(cardObj.switchLabel);
  cardObj?.headInfo?.appendChild(cardObj.coinSymbel);
  cardObj?.headInfo?.appendChild(cardObj.switchBTN);
  cardObj?.coinCard?.appendChild(cardObj.headInfo);
  cardObj?.coinCard?.appendChild(cardObj.coinName);
  cardObj?.coinCard?.appendChild(cardObj.moreInfoBTN);
  
  moreInfoObj?.moreInfoPanel?.appendChild(moreInfoObj.moreInfoImage);
  moreInfoObj?.moreInfoPanel?.appendChild(moreInfoObj.infoTitle);
  moreInfoObj?.moreInfoPanel?.appendChild(moreInfoObj.usd);
  moreInfoObj?.moreInfoPanel?.appendChild(moreInfoObj.eur);
  moreInfoObj?.moreInfoPanel?.appendChild(moreInfoObj.ils);

  cardObj?.coinCard?.appendChild(moreInfoObj.moreInfoPanel);
}

// Complete card element
const appendInCard = (cardsArray) => {
  // 1) Check the length of the cards array
  const cardsCount = cardsArray.length;

  // 2) Hide the waiting info message
  messageBox.classList.add('hidden');

  // 3) grid-Template-Columns property will be set depending on how many resuls we have
  if (bodyContainer && cardsCount === 1) bodyContainer.style.gridTemplateColumns = 'auto';
  if (bodyContainer && cardsCount === 2) bodyContainer.style.gridTemplateColumns = 'auto auto';
  if (bodyContainer && cardsCount > 3) bodyContainer.style.gridTemplateColumns = 'auto auto auto';

  // 4) Render cards array
  $(".body-container").append(cardsArray);    
}

// That function recives type of button and by comparing the type and the buttons text the
// function will decide which button need to highlighted and which not
const highlightButton = (type) => {

  // Toggle highlightedBTN class
  buttonsArray.forEach((btn) => {
    if (btn.text() === type) btn.addClass("highlightedBTN");
    if (btn.text() !== type) btn.removeClass("highlightedBTN");
  });
};

// 
const showMoreInfo = (data,thatCoin) => {
  // 1) Find all classes on more-info-panel and then find out if class hidden exists
  const classListArray = thatCoin.find('.more-info-panel').attr("class");
  const hidden = classListArray.split(' ')[1] === 'hidden';

  // 2) Toggle more-info-panel between displayed and hidden
  if (hidden) thatCoin.find('.more-info-panel').removeClass('hidden');
  if (!hidden) thatCoin.find('.more-info-panel').addClass('hidden');

  // 3) Set new data inside panel
  thatCoin.find('.more-info-image').prop("src",data?.image?.large);
  thatCoin.find('.usd').text(`USD: $${data?.market_data?.current_price?.usd}`);
  thatCoin.find('.eur').text(`EUR: €${data?.market_data?.current_price?.eur}`);
  thatCoin.find('.ils').text(`ILS: ₪${data?.market_data?.current_price?.ils}`);
}

// Optional: in case we want do hide all panels before we open new one
const hideAllPanels = () => {
  // 1) Loop over node list of the body-container to see if some panels are open
  nodeList[0].forEach(div => {
    const panel = $(div).find('.more-info-panel').attr("class");
    const panelClassesArr = panel.split(' ');

    // 2) If element have only one class it means that panel is displayed add we need to hide it
    if(panelClassesArr.length === 1) $(div).find('.more-info-panel').addClass("hidden");
  });  
}

// Swal alert in modal window recives object that possibly contains error message from jQuery,
// and 3 custom parameters iconType titleText and updateError for swal settings
const renderError = (errorOBJ,iconType,titleText,updateError) => {
  // 1) Default values
  let errorMsg = 'Somthing went wrong';
  let icon = 'error';
  let title = 'Error!';

  // 2) Change default values only by the next conditions
  if(errorOBJ?.xhr?.status === 404) errorMsg = 'No coins found,please try to search another coin!';
  if(iconType) icon = iconType;
  if(titleText) title = titleText;
  if(updateError) errorMsg = updateError;

  // 3) Fire swal alert with the properties set above
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
