//Registering the Service Worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('./serviceWorker.js', { scope: "./"})
  .then(registration => {
    console.log('Service worker registration succeeded:', registration);
  }).catch(error => {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}


const currencyUrl = "https://free.currencyconverterapi.com/api/v5/currencies";
let arradd = [];
let num = 0;
fetch(currencyUrl)
.then(res => res.json())
.then(data => {
  for (const key in data) {
    return data[key];
  }
})
.then(datakey => {
  for ( const key2 in datakey) {
    const id = datakey[key2].currencyName;
    arradd.push(id);
    num++;
  }
  arradd.sort();
  arradd.map(idd => {
    $('#curOne, #curTwo').append($('<option>').text(`${idd}`).attr('value', idd));
  });
  console.log(num);
})
.catch(error => {
  console.log(error);
})

$("#convert").on("click", () => {
  const amt = $('#amtOne').val();
  const curOne = $('#curOne option:selected').val();
  const curTwo = $('#curTwo option:selected').val();  
  const query = `${curOne}_${curTwo}`;
  if (curOne <= 0 && curTwo <= 0) {
    
  }else{
    const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;
    fetch(url)
    .then(response => response.json())
    .then(parsedData => {
      for(let rate in parsedData){
        let conversionVal = (parsedData[rate].val); 
        let totalAmt = (Number(amt) * conversionVal);
        $('#amtTwo').val(Math.round(totalAmt * 100) / 100);
        $('.outPut').empty();
        $('.outPut').append(`${amt} ${curOne} equals ${$('#amtTwo').val()} ${curTwo}`);
      }
    }) 
  }
     
});