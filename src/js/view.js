// Global elements selectors
const inputValue = document.querySelector('.coin-input');
const bodyContainer = document.querySelector('.body-container');
const messageBox = document.querySelector('.message');

// Contains all the cards that needs to be displayed
let cardsArray = [];

/////////////////////////////////////////////////////////////////////////////////////////////

// Variables mainly responsable on rendering data
let thatNum = 0;

const buttonsArray = [
  $("li button:eq(0)"),
  $("li button:eq(1)"),
  $("li button:eq(2)"),
];

// Functions

function insertToDOM() {
  // 1) Get search input
  const inputSearch = $('.coin-input').val();

  // 2) Reset arrays
  coinArrDefault = [];
  coinArrSearch = [];
  cardsArray = [];

  // 3) get coins
  fetchCoins(inputSearch);
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
    setText(cardObj,moreInfoObj,coinArr);
    
    // 7) Arrange hierarchy inside coin card
    setHierarchy(cardObj,moreInfoObj);
    
    
    // 8) Complete the card and push it to the cardsArray
    cardsArray.push(cardObj.coinCard);
  }
  // 9) After cards HTML are ready render all cards once as the for loop ends
  appendInCard(cardsArray) 
};

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
  let row = "";

  // 1) Reset HTML
  $(".body-container").empty();
  $("#chart-container").empty();

  // 2) Insert new HTML
  row = `<H3>this site is about crypto currency</H3>`;
  $(".body-container").append(row);

  // 3) Activate the about button
  highlightButton("About");

  // 4) Display body Container if hidden
  if(bodyContainer) bodyContainer.classList.remove('hidden');
}
