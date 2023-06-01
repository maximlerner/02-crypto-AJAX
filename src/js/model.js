let coinArr = [];
let switchObj = [];
const nodeList = [];

const fetchCoins = async (inputFilled) => {
  try {
    const url = inputFilled ? 'https://api.coingecko.com/api/v3/coins/' : `https://api.coingecko.com/api/v3/coins/${inputFilled}`;

    $.ajax({
      // url: url,
      url: 'https://api.coingecko.com/api/v3/coins/',
      success: function (res) {
        console.log(res);     
        for (i = 0; i < 50; i++) {
          const inputFilled = inputValue.value.trim().length > 0;

          const inputSearchIncludes = res[i].name.toLowerCase().includes(inputValue.value.toLowerCase());
          
          if(inputFilled && inputSearchIncludes || !inputFilled) {
            coinArr.push({
              symbol: res[i].symbol,
              nameCrypto: res[i].name,
              price: res[i].market_data.current_price.usd,
              imgCrypto: res[i].image.small,
              isChecked: false,
            });

          }
        }
        nodeList.push(bodyContainer.childNodes);
        localStorage.setItem("coinOBJ", JSON.stringify(coinArr));
        renderCoins(coinArr);
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

