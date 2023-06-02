
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
  const setText = (cardObj,moreInfoObj,coinArr) => {
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
  
    // Reset container and remove chart
    $(".body-container").html("");
    $("#chart-container").empty();
  
    // 4) Render cards array
    $(".body-container").append(cardsArray);    
  }