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

      await  fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "User-Agent": "Mozilla/4.0 (compatible)",
          "Accept": "application/json",
        },
            
        body: JSON.stringify({
          "query":"\n{\n    strategies(where: {\n      id: \"0x01b54c320d6b3057377cbc71d953d1bba84df44e\"\n    }) {\n        id\n        reports(first: 10, orderBy: timestamp, orderDirection: desc)  {\n          id\n          transaction {\n            hash\n          }\n          timestamp\n          gain\n          loss\n          totalGain\n          totalLoss\n          totalDebt\n          debtLimit\n          debtAdded\n          debtPaid\n          results {\n            startTimestamp\n            endTimestamp\n            duration\n            apr\n            durationPr\n            currentReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n            previousReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n          }\n        }\n      }\n  }\n"})
      })
      .then(function(response) { 
          return response.json(); 
      })
          
      .then(function(data) {
        console.log(data);
        USDTArray.push(data);
        USDTArray[1].data.strategies.push(StratArray[0].strategies[0].name);
      });

      await  fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "User-Agent": "Mozilla/4.0 (compatible)",
          "Accept": "application/json",
        },
            
        body: JSON.stringify({
          "query":"\n{\n    strategies(where: {\n      id: \"0x2f87c5e8396f0c41b86aad4f3c8358ab21681952\"\n    }) {\n        id\n        reports(first: 10, orderBy: timestamp, orderDirection: desc)  {\n          id\n          transaction {\n            hash\n          }\n          timestamp\n          gain\n          loss\n          totalGain\n          totalLoss\n          totalDebt\n          debtLimit\n          debtAdded\n          debtPaid\n          results {\n            startTimestamp\n            endTimestamp\n            duration\n            apr\n            durationPr\n            currentReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n            previousReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n          }\n        }\n      }\n  }\n"})
      })
      .then(function(response) { 
          return response.json(); 
      })
          
      .then(function(data) {
        console.log(data);
        USDTArray.push(data);
        USDTArray[2].data.strategies.push(StratArray[0].strategies[1].name);
      });

      await  fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "User-Agent": "Mozilla/4.0 (compatible)",
          "Accept": "application/json",
        },
            
        body: JSON.stringify({
          "query":"\n{\n    strategies(where: {\n      id: \"0x82292b8035873d7dd8a96767f6b3f885564aa919\"\n    }) {\n        id\n        reports(first: 10, orderBy: timestamp, orderDirection: desc)  {\n          id\n          transaction {\n            hash\n          }\n          timestamp\n          gain\n          loss\n          totalGain\n          totalLoss\n          totalDebt\n          debtLimit\n          debtAdded\n          debtPaid\n          results {\n            startTimestamp\n            endTimestamp\n            duration\n            apr\n            durationPr\n            currentReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n            previousReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n          }\n        }\n      }\n  }\n"})
      })
      .then(function(response) { 
          return response.json(); 
      })
          
      .then(function(data) {
        console.log(data);
        USDTArray.push(data);
        USDTArray[3].data.strategies.push(StratArray[0].strategies[2].name);
      });

      await  fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "User-Agent": "Mozilla/4.0 (compatible)",
          "Accept": "application/json",
        },
            
        body: JSON.stringify({
          "query":"\n{\n    strategies(where: {\n      id: \"0x3ef6ec70d4d8fe69365c92086d470bb7d5fc92eb\"\n    }) {\n        id\n        reports(first: 10, orderBy: timestamp, orderDirection: desc)  {\n          id\n          transaction {\n            hash\n          }\n          timestamp\n          gain\n          loss\n          totalGain\n          totalLoss\n          totalDebt\n          debtLimit\n          debtAdded\n          debtPaid\n          results {\n            startTimestamp\n            endTimestamp\n            duration\n            apr\n            durationPr\n            currentReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n            previousReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n          }\n        }\n      }\n  }\n"})
      })
      .then(function(response) { 
          return response.json(); 
      })
          
      .then(function(data) {
        console.log(data);
        USDTArray.push(data);
        USDTArray[4].data.strategies.push(StratArray[0].strategies[3].name);
      });

      await  fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "User-Agent": "Mozilla/4.0 (compatible)",
          "Accept": "application/json",
        },
            
        body: JSON.stringify({
          "query":"\n{\n    strategies(where: {\n      id: \"0x65a8efc842d2ba536d3f781f504a1940f61124b4\"\n    }) {\n        id\n        reports(first: 10, orderBy: timestamp, orderDirection: desc)  {\n          id\n          transaction {\n            hash\n          }\n          timestamp\n          gain\n          loss\n          totalGain\n          totalLoss\n          totalDebt\n          debtLimit\n          debtAdded\n          debtPaid\n          results {\n            startTimestamp\n            endTimestamp\n            duration\n            apr\n            durationPr\n            currentReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n            previousReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n          }\n        }\n      }\n  }\n"})
      })
      .then(function(response) { 
          return response.json(); 
      })
          
      .then(function(data) {
        console.log(data);
        USDTArray.push(data);
        USDTArray[5].data.strategies.push(StratArray[0].strategies[4].name);
      });

      await  fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "User-Agent": "Mozilla/4.0 (compatible)",
          "Accept": "application/json",
        },
            
        body: JSON.stringify({
          "query":"\n{\n    strategies(where: {\n      id: \"0x92c212f4d6a8ad964acae745e1b45309b470af6e\"\n    }) {\n        id\n        reports(first: 10, orderBy: timestamp, orderDirection: desc)  {\n          id\n          transaction {\n            hash\n          }\n          timestamp\n          gain\n          loss\n          totalGain\n          totalLoss\n          totalDebt\n          debtLimit\n          debtAdded\n          debtPaid\n          results {\n            startTimestamp\n            endTimestamp\n            duration\n            apr\n            durationPr\n            currentReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n            previousReport {\n                id\n                gain\n                loss\n                totalDebt\n                totalGain\n                totalLoss\n                timestamp\n                transaction { hash blockNumber }\n            }\n          }\n        }\n      }\n  }\n"})
      })
      .then(function(response) { 
          return response.json(); 
      })
          
      .then(function(data) {
        console.log(data);
        USDTArray.push(data);
        USDTArray[6].data.strategies.push(StratArray[0].strategies[5].name);
      });
    
    console.log(USDTArray);

    //PieChartmaker
    var TempChartArray = [];

    for(i=1; i<2; i++) { //geht durch die verschiedenen Strategien
      if(USDTArray[i+1].data.strategies[0].reports[0].results[0].currentReport.totalDebt != 0) {
        alert(USDTArray[i+1].data.strategies[0].reports[0].results[0].currentReport.totalDebt / 1000000);
      }

      PieChartMaker(TempChartArray, "USDTPieChart");
    }
}

function USDTUIWriter(Array) {

}

function PieChartMaker(Array, WhichChart) {

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
            label: 'Vault Allocations',
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

function LineChartMaker(Array, WhichChart) {

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
    type: 'line',
    data: {
      labels: LandBesitzer,
      datasets: [{
          label: 'Vault Allocations',
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