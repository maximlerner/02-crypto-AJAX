let coinArrDefault = [];
let coinArrSearch = [];
let switchObj = [];
let nodeList = [];

const fetchCoins = async (inputFilled) => {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/';
    const inputValid = inputFilled?.length > 0
    $.ajax({
      url: url,
      success: function (res) {
        coinOrCoins(res,inputFilled,inputValid)  
        localStorage.setItem("coinOBJ", JSON.stringify(coinArrDefault));
        if(!inputValid)renderCoins(coinArrDefault);
        if(inputValid)renderCoins(coinArrSearch);
        nodeList.push(bodyContainer.childNodes);
        console.log(nodeList);
        highlightButton("Home");
      },
      error: $(document).ajaxError((event,xhr,options,exc) => handleError(event,xhr,options,exc))
    });
  } catch(err) {
    renderError(err);
  }
}
const handleError = (event,xhr,options,exc,errorMsg) => {
  const errorOBJ = {
      event: event,
      xhr:xhr,
      options: options,
      exc: exc
    }
    renderError(errorOBJ,undefined,undefined,errorMsg);
  }

  const fetchMoreInfo = async (coinID) => {
    try {
    const data = await $.ajax({
      url:`https://api.coingecko.com/api/v3/coins/${coinID}`,
      error: $(document).ajaxError((event,xhr,options,exc) => { 
        const errorMsg = 'Can\'t provide more info,please try to search another coin!'
        handleError(event,xhr,options,exc,errorMsg);
      })   
    });
    return data;
  }catch(err) {
    if(err.status === '404') renderError(undefined,undefined,undefined,'Can\'t provide more info,please try to search another coin!')
  }
}

const coinOrCoins = (res,inputFilled,inputValid) => {
  for (i = 0; i < 50; i++) {
    const inputSearchIncludes = res[i].name.toLowerCase().includes(inputValue.value.toLowerCase());
   
    if(!inputFilled) {
      coinArrDefault.push({
        symbol: res[i].symbol,
        nameCrypto: res[i].name,
        price: res[i].market_data.current_price.usd,
        imgCrypto: res[i].image.small,
        isChecked: false,
      });
    }
    if(inputValid && inputSearchIncludes ) {
      coinArrSearch.push({
        symbol: res[i].symbol,
        nameCrypto: res[i].name,
        price: res[i].market_data.current_price.usd,
        imgCrypto: res[i].image.small,
        isChecked: false,
      });
    }
  }
}  
