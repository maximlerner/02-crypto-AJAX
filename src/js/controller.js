
function renderHome() {
  insertToDOM();
  if(bodyContainer) bodyContainer.classList.remove('hidden');
  
  // Remove interval from chart if still runs
  if(coinsInterval) clearInterval(coinsInterval);
  console.log(Array.from(bodyContainer));
}

function renderLiveReports() {
  $(".body-container").empty();
  highlightButton("Live Reports");
  messageBox.classList.remove('hidden');
  if(bodyContainer) bodyContainer.classList.add('hidden');
  
  renderChart(switchObj);
}

const handleAbout = () => { 
  renderAbout();

  // Remove interval from chart if still runs
  if(coinsInterval) clearInterval(coinsInterval); 
}

function handleMoreInfo() {
  // 1) Find the coin-card element 
  $(".coin-card").on("click",async function(e) {
    // a) stop bubbling
    e.stopImmediatePropagation();

    // b) Find coin id
    const coinID = ($(this).find('.coin-name').text()).toLowerCase();
    
    // c) Get more info about the coin
    const data = await fetchMoreInfo(coinID);

    // d) Optional: hide all panels
    if(nodeList) hideAllPanels();

    // e) display the chosen more info panel
    if (data) showMoreInfo(data,$(this));
  });
}

function addCoinsToArray() {
  $(".coin-card").on("click", function (e) {
    // 1) Prevent bubbling effect 
    e.stopImmediatePropagation();

    // 2) Info from selected coin card
    const coinName = $(this).find('.coin-name').text();
    const coinSymbol = $(this).find('.coin-symbol').text();
    const thatNum = Number($(this).find('input').attr('num1'));
    const inputSelected = $(this).find('input').attr('checked');

    // 3) Toggle checked attribute on the input element
    console.log(inputSelected);
    if (!inputSelected) $(this).find('input').attr('checked',true);
    if (inputSelected) $(this).find('input').attr('checked',false);

    // 4) If less then 5 coins we can add new coins
    if(switchObj.length < 5) {
      updateCoinStatus(coinName,coinSymbol,thatNum,inputSelected);
    } else {
      let remove = false;

      // 5) When the user have 5 coins and he wants to remove one coin from switchObj
      if(coinArr[thatNum].isChecked && switchObj.find(el => el.name === coinName)) {
        const indexToDelete = switchObj.findIndex(coin => coin.name === coinName);
        remove = true
        switchObj.splice(indexToDelete,1);      
      }
      // 6) Here we check if step 5 didn't happend,if so the renderError will run only if the user have 5 coins and want more
      if(!remove) renderError(undefined,'info','Important','You have reached to the limit of the alowed coins, you can unselect one of the coins and chose new one!');

      // 7) Prevent from  toggle input to change to active and to toggle the status of isChecked in the coinArr
      $(this).find(`[num1=${thatNum}]`).prop("checked", false);
      coinArr[thatNum].isChecked = !coinArr[thatNum].isChecked;
    }
  });
  console.log(switchObj);
}

const updateCoinStatus = (coinName,coinSymbol,thatNum,inputSelected) => {
  console.log('updateCoinStatus');
  // 1) Here we check if the clicked input isn't checked then we add new coin object to the coinArr array
  if(!coinArr[thatNum].isChecked && !inputSelected) {
    switchObj.push({
      name:coinName,
      symbol: coinSymbol.toUpperCase(),
      isChecked: true,
      price: 0
    });    
  } 
  // 2) Here if the coin is already in the user's coinArr array and the input element is on we will remove the coin 
  if(coinArr[thatNum].isChecked && inputSelected) {
    const indexToDelete = switchObj.findIndex(coin => coin.name === coinName);
    switchObj.splice(indexToDelete,1);
  }
  console.log(switchObj);
  // 3) Toggle the isChecked status in the original array with all coins
  coinArr[thatNum].isChecked = !coinArr[thatNum].isChecked;
}

renderHome();












