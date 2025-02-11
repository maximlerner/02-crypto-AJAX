function renderHome() {
  insertToDOM();
  if (bodyContainer) bodyContainer.classList.remove("hidden");

  // Remove interval from chart if still runs
  if (coinsInterval) clearInterval(coinsInterval);
}

function renderLiveReports() {
  $(".body-container").empty();
  highlightButton("Live Reports");
  messageBox.classList.remove("hidden");
  if (bodyContainer) bodyContainer.classList.add("hidden");

  renderChart(switchObj);
}

const handleAbout = () => {
  renderAbout();

  // Remove interval from chart if still runs
  if (coinsInterval) clearInterval(coinsInterval);
};

function handleMoreInfo() {
  $(".coin-card .btn-info").on("click", async function (e) {
    // find the parent .coin-card of the button that was clicked
    e.stopImmediatePropagation();
    const $card = $(this).closest(".coin-card");
    const $infoPanel = $card.find(".more-info-panel");

    const coinName = $card.find(".coin-name").text().toLowerCase();
    const data = await fetchMoreInfo(coinName);

    const isOpen = $infoPanel.hasClass("hidden");

    $(".coin-card .more-info-panel").addClass("hidden");
    if (isOpen) $card.find(".more-info-panel").removeClass("hidden");

    $card.find(".more-info-image").prop("src", data?.image?.large);
    $card.find(".usd").text(`USD: $${data?.market_data?.current_price?.usd}`);
    $card.find(".eur").text(`EUR: €${data?.market_data?.current_price?.eur}`);
    $card.find(".ils").text(`ILS: ₪${data?.market_data?.current_price?.ils}`);
  });
}

function addCoinsToArray() {
  $(".coin-card").on("click", function (e) {
    // 1) Prevent bubbling effect
    e.stopImmediatePropagation();
    if (localStorage.getItem("coinOBJ"))
      nodeList = JSON.parse(localStorage.getItem("coinOBJ"));
    console.log(switchObj);

    // 2) Info from selected coin card
    const coinName = $(this).find(".coin-name").text();
    const coinSymbol = $(this).find(".coin-symbol").text();
    const thatNum = Number($(this).find("input").attr("num1"));
    const inputSelected = $(this).find("input").attr("checked");

    // 3) Toggle checked attribute on the input element
    if (!inputSelected) $(this).find("input").attr("checked", true);
    if (inputSelected) $(this).find("input").attr("checked", false);

    // 4) If less then 5 coins we can add new coins
    if (switchObj.length < 5) {
      updateCoinStatus(coinName, coinSymbol, thatNum, inputSelected);
    } else {
      let remove = false;

      // 5) When the user have 5 coins and he wants to remove one coin from switchObj
      if (
        coinArrDefault[thatNum].isChecked &&
        switchObj.find((el) => el.name === coinName)
      ) {
        const indexToDelete = switchObj.findIndex(
          (coin) => coin.name === coinName
        );
        remove = true;
        switchObj.splice(indexToDelete, 1);
      }
      // 6) Here we check if step 5 didn't happend,if so the renderError will run only if the user have 5 coins and want more
      if (!remove)
        renderError(
          undefined,
          "info",
          "Important",
          "You have reached to the limit of the alowed coins, you can unselect one of the coins and chose new one!"
        );

      // 7) Prevent from  toggle input to change to active and to toggle the status of isChecked in the coinArrDefault
      $(this).find(`[num1=${thatNum}]`).prop("checked", false);
      coinArrDefault[thatNum].isChecked = !coinArrDefault[thatNum].isChecked;
    }
  });
}

const updateCoinStatus = (coinName, coinSymbol, thatNum, inputSelected) => {
  // 1) Here we check if the clicked input isn't checked then we add new coin object to the coinArrDefault array
  if (!coinArrDefault[thatNum].isChecked && !inputSelected) {
    switchObj.push({
      name: coinName,
      symbol: coinSymbol.toUpperCase(),
      isChecked: true,
      price: 0,
    });
  }
  // 2) Here if the coin is already in the user's coinArrDefault array and the input element is on we will remove the coin
  if (coinArrDefault[thatNum].isChecked && inputSelected) {
    const indexToDelete = switchObj.findIndex((coin) => coin.name === coinName);
    switchObj.splice(indexToDelete, 1);
  }
  // 3) Toggle the isChecked status in the original array with all coins
  coinArrDefault[thatNum].isChecked = !coinArrDefault[thatNum].isChecked;
};

renderHome();
