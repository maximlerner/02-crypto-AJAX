let coinsInterval

// the justLoader will effect the updateInterval value in the renderChart
let justLoaded = true;

const renderChart = () => {

    const dataPoints1 = [],dataPoints2 = [],dataPoints3 = [],dataPoints4 = [],dataPoints5 = []

    const chart = new CanvasJS.Chart("chart-container", {
      zoomEnabled: true,
      title: {
        text: "Crypto currencies prices"
      },
      axisX: {
        title: "chart updates every 2 secs"
      },
      axisY:{
        prefix: "$"
      }, 
      toolTip: {
        shared: true
      },
      legend: {
        cursor:"pointer",
        verticalAlign: "top",
        fontSize: 22,
        fontColor: "dimGrey",
        itemclick : toggleDataSeries
      },
      // Data initialized by createDataArr function
      data: []
    });

    console.log(switchObj.length);

    if(switchObj.length > 0) createDataArr(dataPoints1,switchObj[0].symbol,chart);
    if(switchObj.length > 1) createDataArr(dataPoints2,switchObj[1].symbol,chart);
    if(switchObj.length > 2) createDataArr(dataPoints3,switchObj[2].symbol,chart);
    if(switchObj.length > 3) createDataArr(dataPoints4,switchObj[3].symbol,chart);
    if(switchObj.length > 4) createDataArr(dataPoints5,switchObj[4].symbol,chart);
    
    
    function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = true;
        }
        else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
    
    let updateInterval = 2000;
    // initial value
    let yValue1 = switchObj.length > 0 ? switchObj[0].price : 550 ; 
    let yValue2 = switchObj.length > 1 ? switchObj[1].price : 600 ; 
    let yValue3 = switchObj.length > 2 ? switchObj[2].price : 650 ; 
    let yValue4 = switchObj.length > 3 ? switchObj[3].price : 630 ; 
    let yValue5 = switchObj.length > 4 ? switchObj[3].price : 630 ; 
    
    
    let time = new Date;
    // starting at 9.30 am
    time.setHours(9);
    time.setMinutes(30);
    time.setSeconds(0);
    time.setMilliseconds(0);
    
    function updateChart(coinsInterval) {
        // count = count || 1;
        let count =  1;
        // Here we check if the page just loaded. updateInterval can't be 0 because fetchPrices function need time
        // to determine if justLoaded needs to be initialized to false or not
        
        updateInterval = justLoaded ? 250 : 2000;
        justLoaded = false;
        console.log(updateInterval);
        // console.log(updateInterval);
        // alert(updateInterval);
        
        for (let i = 0; i < count; i++) {
            time.setTime(time.getTime()+ updateInterval);
            
            const updatedPrices = switchObj ? fetchPrices(switchObj,coinsInterval) : '';
            console.log(updatedPrices[0]?.price);
            
            // Updating prices 
            yValue1 = switchObj[0]?.price ? switchObj[0]?.price : yValue1;
            yValue2 = switchObj[1]?.price ? switchObj[1]?.price : yValue2;
            yValue3 = switchObj[2]?.price ? switchObj[2]?.price : yValue3;
            yValue4 = switchObj[3]?.price ? switchObj[3]?.price : yValue4;
            yValue5 = switchObj[4]?.price ? switchObj[4]?.price : yValue5;
            
            // pushing the new values
            dataPoints1.push({
                x: time.getTime(),
                y: yValue1
            });
            dataPoints2.push({
                x: time.getTime(),
            y: yValue2
        });
        dataPoints3.push({
            x: time.getTime(),
            y: yValue3
        });
        dataPoints4.push({
            x: time.getTime(),
            y: yValue4
        });
        dataPoints5.push({
            x: time.getTime(),
            y: yValue5
        });
    }
    
    // updating legend text with  updated with y Value 
    if(switchObj?.length > 0 && switchObj) chart.options.data[0].legendText = `${switchObj[0].symbol} ${yValue1}`;
    if(switchObj?.length > 1 && switchObj) chart.options.data[1].legendText = `${switchObj[1].symbol} ${yValue2}`; 
    if(switchObj?.length > 2 && switchObj) chart.options.data[2].legendText = `${switchObj[2].symbol} ${yValue3}`; 
    if(switchObj?.length > 3 && switchObj) chart.options.data[3].legendText = `${switchObj[3].symbol} ${yValue4}`; 
    if(switchObj?.length > 4 && switchObj) chart.options.data[4].legendText = `${switchObj[4].symbol} ${yValue5}`; 

    chart.render();
    if(messageBox) messageBox.classList.add('hidden');
}


coinsInterval = setInterval(() => updateChart(coinsInterval),updateInterval);
}

const fetchPrices = async (switchObj,coinsInterval) => {
    try {
        const symbolArray = [];
        
        switchObj.map(el => symbolArray.push(el.symbol));
        
        await $.ajax({
            url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbolArray}&tsyms=USD`,
            success: function (res) {
                if(res.Message === 'fsyms param is empty or null.') {
                    const timeOut = setTimeout(() => {
                        clearInterval(coinsInterval);
                        renderHome();
                        justLoaded = true;
                        clearTimeout(timeOut);
                    },1500)
                    return renderError(undefined,'info','Important','You need to choose at least one coin with the toggle box in order to see the chart!');                  
                };              
                const data = Object.entries(res).map((key,index) => [key, res[index]]);
                
                switchObj.forEach((switchCoin,index) => compareSymbols(switchCoin,index,data));             
            },
            error: $(document).ajaxError((event,xhr,options,exc) => handleError(event,xhr,options,exc))
        });
        
        return switchObj;
    } catch(err) {
        clearInterval(coinsInterval);
        renderHome();
        justLoaded = true;
        renderError(undefined,undefined,undefined,'Try to check maybe the API url is incorrect!');
    }
}

const compareSymbols = (switchCoin,index,data) => {
    data.forEach(dataCoin => {
        if(dataCoin[0][0] === switchCoin.symbol) {
            console.log(`datacoin: ${dataCoin[0][0]} equal to switchCoin ${switchCoin.symbol} ${index}`);
            switchObj[index].price = data[index][0][1].USD;
            console.log(switchObj[index].price);
        }                   
    })
}

const createDataArr = (dataPoints,name,chart) => {
    chart.options.data.push({
        type: "line",
        xValueType: "dateTime",
        yValueFormatString: "$####.00",
        showInLegend: true,
        name: name,
        dataPoints: dataPoints
    })
}

