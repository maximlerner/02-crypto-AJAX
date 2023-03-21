
let coinArr = [];

let switchObj = [];

let row = '';

let moreInfoBox = '';

let thatNum = 0;

function insertToDOM() {
    $(".body").empty();
    $("#chartContainer").empty();

    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/',
        success: function(res) {
            // console.log(res);
            for (i = 0; i < 50;i++) {
                // console.log(res[i].symbol,res[i].name,res[i].market_data.current_price.usd);
                coinArr.push({symbol: res[i].symbol, nameCrypto: res[i].name, price: res[i].market_data.current_price.usd,imgCrypto: res[i].image.small,isChecked: false})
            }
        }
    });


    for (i = 0; i < coinArr.length;i++) {
        const boxInfo = document.createElement("Div");
        const headInfo = document.createElement("Div");
        const coinSymbel = document.createElement("H3");
        const coinName = document.createElement("H3");
        const moreInfoBTN = document.createElement("button");
        // const moreInfoDiv = document.createElement("Div");
        // const infoH2 = document.createElement("H2");

        const switchBTN = document.createElement("Div");
        const switchInput = document.createElement("input");
        const switchLabel = document.createElement("label");
    
        boxInfo.classList.add("boxInfo");
        headInfo.classList.add("headInfo");
        moreInfoBTN.classList.add("btn");
        moreInfoBTN.classList.add("btn-info");
        moreInfoBTN.classList.add("mybtn");
        switchBTN.classList.add("form-check");
        switchInput.classList.add("form-check-input");
        switchBTN.classList.add("form-switch");
        switchLabel.classList.add("form-check-label");

        // moreInfoDiv.classList.add("demo");
        // moreInfoDiv.classList.add("collapse");
        moreInfoBTN.setAttribute("onclick", "moreInfo()");
        moreInfoBTN.setAttribute('data-toggle','collapse');
        moreInfoBTN.setAttribute('data-target','info');
        moreInfoBTN.setAttribute('num',i);
        switchInput.setAttribute('num1',i);
        switchInput.setAttribute("type",'checkbox');
        switchInput.setAttribute("role",'switch');
        switchInput.setAttribute('onclick','addCoinsToArray()')
        switchLabel.setAttribute("for","flexSwitchCheckChecked");
    
        coinSymbel.innerText= coinArr[i].symbol;
        coinName.innerText= coinArr[i].nameCrypto;
        moreInfoBTN.innerText = "More Info";
        // infoH2.innerText ="price in usd: 20,700";
    
        switchBTN.appendChild(switchInput);
        switchBTN.appendChild(switchLabel);
        // moreInfoDiv.appendChild(infoH2);
        headInfo.appendChild(coinSymbel);
        headInfo.appendChild(switchBTN);
        boxInfo.appendChild(headInfo);
        boxInfo.appendChild(coinName);
        boxInfo.appendChild(moreInfoBTN);
        // boxInfo.appendChild(moreInfoDiv);
    
        $(".body").append(boxInfo);

        $("li button:eq(0)").removeClass('homeBTN');
        $("ul button:eq(0)").addClass('highlightedBTN');
    
        $("li button:eq(1)").removeClass('highlightedBTN');
        $("ul button:eq(1)").addClass('liveReportBTN');
    
        $("li button:eq(2)").removeClass('highlightedBTN');
        $("ul button:eq(2)").addClass('aboutBTN');
    }
}

function renderHome() {
    insertToDOM()
}

function renderLiveReports() {
    $(".body").empty();
    $(".body").append('1');

    $("li button:eq(0)").removeClass('highlightedBTN');
    $("ul button:eq(0)").addClass('homeBTN');

    $("li button:eq(1)").removeClass('liveReportBTN');
    $("ul button:eq(1)").addClass('highlightedBTN');

    $("li button:eq(2)").removeClass('highlightedBTN');
    $("ul button:eq(2)").addClass('aboutBTN');
    chart();
}

function renderAbout() {
    $(".body").empty();
    $("#chartContainer").empty();  

    row = `<H3>this site is about crypto currency</H3>`
    $(".body").append(row);

    $("li button:eq(0)").removeClass('highlightedBTN');
    $("ul button:eq(0)").addClass('homeBTN');

    $("li button:eq(1)").removeClass('highlightedBTN');
    $("ul button:eq(1)").addClass('liveReportBTN');

    $("li button:eq(2)").removeClass('aboutBTN');
    $("ul button:eq(2)").addClass('highlightedBTN');
}




    function chart() {
        var options = {
            animationEnabled: true,  
            title:{
                text: "Monthly Prices - 2022"
            },
            axisX: {
                valueFormatString: "MMM"
            },
            axisY: {
                title: "Price (in USD)",
                prefix: "$"
            },
            data: [{
                yValueFormatString: "$#,###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: [
                    { x: new Date(2017, 0), y: 25060 },
                    { x: new Date(2017, 1), y: 27980 },
                    { x: new Date(2017, 2), y: 33800 },
                    { x: new Date(2017, 3), y: 49400 },
                    { x: new Date(2017, 4), y: 40260 },
                    { x: new Date(2017, 5), y: 33900 },
                    { x: new Date(2017, 6), y: 48000 },
                    { x: new Date(2017, 7), y: 31500 },
                    { x: new Date(2017, 8), y: 32300 },
                    { x: new Date(2017, 9), y: 42000 },
                    { x: new Date(2017, 10), y: 52160 },
                    { x: new Date(2017, 11), y: 49400 }
                ]
            }]
        };
        $("#chartContainer").CanvasJSChart(options);       
        }


        function moreInfo() {
            $('.btn').click(function(){
                let that = $(this).attr('num');
                console.log(that);
                moreInfoBox = `
                <H3>usd price ${coinArr[that].nameCrypto}</H3>
                `

                $(this).parent().append(moreInfoBox);
            })
        }

        function addCoinsToArray() {
            $('.form-check-input').click(function() {
                let thatString =  $(this).attr('num1');
                let thatNum = parseInt(thatString);
                              
                if(switchObj.length < 5) {
                    if(coinArr[thatNum].isChecked) {
                        coinArr[thatNum].isChecked = false;
                        
                        let nameToRemove = coinArr[thatNum].nameCrypto           
                        let nameIndexToRemove = switchObj.map(function(e) {
                            return e.nameCrypto;
                        }).indexOf(nameToRemove);
                        console.log(nameIndexToRemove);
                        
                        
                        switchObj.splice(nameIndexToRemove,1);
                        // console.log(coinArr);
                        console.log('new array');
                        console.log(switchObj);
                    } else {
                        coinArr[thatNum].isChecked = true;
                        switchObj.push({
                            symbol: coinArr[thatNum].nameCrypto,
                            isChecked: true
                        });
                        // console.log(coinArr);
                        console.log('new array');
                        console.log(switchObj);
                    }
                } else {
                    switchObj.splice(4,1);
                    $(`[num='${thatNum - 1}']`).prop('checked',false);
                    $(this).prop('checked', false);
                  
                    // console.log(coinArr);
                    console.log('new array');
                    console.log(switchObj);
                    
                    Swal.fire({
                        title: 'Error!',
                        text: 'You have reached to the limit of the alowed array.last name will be erased',
                        icon: 'error',
                        confirmButtonText: 'ok'
                    })
                }

            })
        }