const searchBTN = document.querySelector('#searchButton');

function search(e) {
  e.preventDefault();

  const performing = document.querySelector('#performers').value;
  let resultsEl = document.querySelector('#results');
  let apiKey = `MzEwOTQ3OTl8MTY3MTQ2NjcxNC44MTk5ODEz`;
  let api =`https://api.seatgeek.com/2/performers?q=${performing}&client_id=${apiKey}`

  fetch(api).then(response => {
    return response.json();
  })
  .then((data) => {
   number_of_events = `<p>Number of Events: ${data.performers[0].num_upcoming_events} </p>`;

//changes below committed by Steven
    let performer_id = data.performers[0].id;
    let apirequest2 = `https://api.seatgeek.com/2/events?performers.id=${performer_id}&client_id=${apiKey}`;
  
    fetch(apirequest2).then(response=>{
        return response.json();
    })
    .then((data) => {
      let full_details = '';
      let event_counter = data.events.length

      for (let i = 0; i < event_counter; i++){
        let event = data.events[i];
        full_details+='<p><br/>Event: ' + event.title + ' ' + '<br/> Date: ' + event.datetime_local + '<br/> Type of Event: '  + event.type + '<br/> Location: ' + event.venue.display_location;
      }

      resultsEl.innerHTML = number_of_events + full_details
      
        console.log(data);
      });
  });
}
searchBTN.addEventListener('click', search);
