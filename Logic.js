var YieldWatchData = [];
var AsyncCheck = 0;
var USDTArray = [];

function InputYourUSDTAmount() {

    var USDTUserAmount;
    var PopUp = prompt("Please enter your USDT Amount (only use point for decimals", "XXX.XX USDT");
    if (PopUp == null || PopUp == "") {
        USDTUserAmount = "User cancelled the prompt!";
    } else if (!isNaN(PopUp)) {
        USDTUserAmount = PopUp;
        console.log(USDTUserAmount);
        document.getElementById("USDTAmountInput").innerHTML = USDTUserAmount;
        USDTYielFunction(USDTUserAmount);

    } else {
        USDTUserAmount = "Please enter a number and not whatever the hell that was :3";
        document.getElementById("USDTAmountInput").innerHTML = USDTUserAmount;
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

async function LoadYearnWatchData() {
    await sleep(2000);
    
    var url = "https://api.yearn.finance/v1/chains/1/vaults/all";

    //Query Yearn.Watch Data
    await  fetch(url, {
        method: "GET"
    })
    .then(function(response) { 
        return response.json(); 
    })
        
    .then(function(data) {
        YieldWatchData = data;
    });
    console.log(YieldWatchData);
    document.getElementById("USDTAmountInput").disabled = false; 
    document.getElementById("USDTAmountInput").innerHTML = "Input your yvUSDT Amount";
}

function USDTYielFunction(USDTUserAmount) {

    for(i=0; i < YieldWatchData.length; i++) {
        if(YieldWatchData[i].symbol == "yvUSDT") {
            console.log(i);
            USDTArray.push(YieldWatchData[i]);
        }
    }
    console.log(USDTArray);
    GetStrategies(USDTArray);
    //ChartMaker(USDTUserAmount, "USDTChart")
}

async function GetStrategies(StratArray) {

  var url = "https://api.thegraph.com/subgraphs/name/salazarguille/yearn-vaults-v2-subgraph-mainnet";

  for(i=0; i<StratArray[0].strategies.length; i++) {
    console.log(i);
    console.log(StratArray[0].strategies[i]);

    console.log(StratArray[0].strategies[i]);
    console.log(StratArray[0].strategies[i].address);
    console.log(String(StratArray[0].strategies[i].address));
    console.log("0x82292b8035873d7dd8a96767f6b3f885564aa919");
    console.log(String("0x82292b8035873d7dd8a96767f6b3f885564aa919"));

    console.log(JSON.stringify(StratArray[0].strategies[i]));
    console.log(JSON.stringify(StratArray[0].strategies[i].address));
    console.log(JSON.stringify(String(StratArray[0].strategies[i].address)));
    console.log(JSON.stringify("0x82292b8035873d7dd8a96767f6b3f885564aa919"));
    console.log(JSON.stringify(String("0x82292b8035873d7dd8a96767f6b3f885564aa919")));

    console.log(typeof(StratArray[0].strategies[i].address));
    console.log(typeof(String(StratArray[0].strategies[i].address)));

    var TempString = JSON.stringify(StratArray[0].strategies[i].address) +"";
    var StratID = TempString;
    console.log(StratID);

    var MaxTest = JSON.stringify({      "query": "\n{\n strategies(where: {\n id: \""+ StratID +"\"\n }) {\n id\n reports(first: 10, orderBy: timestamp, orderDirection: desc) {\n id\n transaction {\n hash\n }\n timestamp\n gain\n loss\n totalGain\n totalLoss\n totalDebt\n debtLimit\n debtAdded\n debtPaid\n results {\n startTimestamp\n endTimestamp\n duration\n apr\n durationPr\n currentReport {\n id\n gain\n loss\n totalDebt\n totalGain\n totalLoss\n timestamp\n transaction { hash blockNumber }\n }\n previousReport {\n id\n gain\n loss\n totalDebt\n totalGain\n totalLoss\n timestamp\n transaction { hash blockNumber }\n }\n }\n }\n }\n }\n"});
    console.log(MaxTest);

    //StratArray[0].strategies[i].address;

    //Query Yearn.Watch Data
    await  fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
            
        body: JSON.stringify({
          "query": "\n{\n strategies(where: {\n id: \""+ StratID +"\"\n }) {\n id\n reports(first: 10, orderBy: timestamp, orderDirection: desc) {\n id\n transaction {\n hash\n }\n timestamp\n gain\n loss\n totalGain\n totalLoss\n totalDebt\n debtLimit\n debtAdded\n debtPaid\n results {\n startTimestamp\n endTimestamp\n duration\n apr\n durationPr\n currentReport {\n id\n gain\n loss\n totalDebt\n totalGain\n totalLoss\n timestamp\n transaction { hash blockNumber }\n }\n previousReport {\n id\n gain\n loss\n totalDebt\n totalGain\n totalLoss\n timestamp\n transaction { hash blockNumber }\n }\n }\n }\n }\n }\n"})
    })
    .then(function(response) { 
        return response.json(); 
    })
        
    .then(function(data) {
      console.log(data);
      USDTArray.push(data);
      USDTArray[i+1].data.strategies.push(StratArray[0].strategies[i].name);
    });
  }
    console.log(USDTArray);
}

function ChartMaker(Array, WhichChart) {

    var RestMenge = 0;
    for(i=9; Array.length > i; i++) {
      RestMenge = RestMenge + Array[i].amount;
    }
  
    var GesamtMenge = 0;
    for(i=0; Array.length > i; i++) {
      GesamtMenge = GesamtMenge + Array[i].amount;
    }
  
    var ctx = document.getElementById(WhichChart);
  
    var TotalLand = 0;
  
    for(m=0; Array.length > m; m++){
      TotalLand = TotalLand + Array[m].amount;
    }
  
    var LandMenge = [Array[0].amount, Array[1].amount, Array[2].amount, Array[3].amount, Array[4].amount, Array[5].amount, Array[6].amount, Array[7].amount, Array[8].amount, RestMenge];
    var LandBesitzer = [Array[0].Profile, Array[1].Profile, Array[2].Profile, Array[3].Profile, Array[4].Profile, Array[5].Profile, Array[6].Profile, Array[7].Profile, Array[8].Profile, "All other Players"];
  
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: LandBesitzer,
        datasets: [{
            label: 'Axie Land',
            data: LandMenge,
            backgroundColor: [
              'rgba(0,104,55, 0.25)',
              'rgba(165,0,38, 0.25)',
              'rgba(26,152,80, 0.25)',
              'rgba(215,48,39, 0.25)',
              'rgba(102,189,99, 0.25)',
              'rgba(244,109,67, 0.25)',
              'rgba(166,217,106, 0.25)',
              'rgba(253,174,97, 0.25)',
              'rgba(217,239,139, 0.25)',
              'rgba(254,224,139, 0.25)'
            ],
            borderColor: [
              'rgba(0,104,55, 1)',
              'rgba(165,0,38, 1)',
              'rgba(26,152,80, 1)',
              'rgba(215,48,39, 1)',
              'rgba(102,189,99, 1)',
              'rgba(244,109,67, 1)',
              'rgba(166,217,106, 1)',
              'rgba(253,174,97, 1)',
              'rgba(217,239,139, 1)',
              'rgba(254,224,139, 1)'
            ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          position: 'top',
          fontSize: 17,
          fontFamily: 'Arial',
          text: "Total Amount: " + TotalLand
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            afterLabel: function(tooltipItem, data) {
              var dataset = data['datasets'][0];
              var percent = Math.round((dataset['data'][tooltipItem['index']] / GesamtMenge) * 100)
              return '(' + percent + '%)';
            }
          },
        },
        responsive: false,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: '#FFFFFF',
            boxWidth: 15,
            fontSize: 13
          }
        }
      }
    })
}