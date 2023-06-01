let coinArr = [];
let switchObj = [];

const fetchCoins = async () => {
  try {
    $.ajax({
      url: "https://api.coingecko.com/api/v3/coins/",
      success: function (res) {
        if (!res) throw new Error('1');
        console.log('1');
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

const handleError = (event,xhr,options,exc) => {
    const errorOBJ = {
      event: event,
      xhr:xhr,
      options: options,
      exc: exc
    }
    renderError(errorOBJ);
  }
