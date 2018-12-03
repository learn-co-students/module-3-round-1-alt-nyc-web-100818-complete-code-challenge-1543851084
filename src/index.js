const theatreId = 65;

document.addEventListener('DOMContentLoaded', () => {

  const movieContainer = document.querySelector('#all_showings');
  let allMovieData = [];


  movieContainer.addEventListener('click', event => {
    let singleShowing = allMovieData.showings.find(showing => showing.id === parseInt(event.target.id))
    const buyTikBtn = document.querySelector('.ui blue button');
    debugger;
    let data = {showing_id: singleShowing.id}
    // debugger
    if(singleShowing.id === parseInt(event.target.id)) {
      fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(ticketData => {
        renderSuccessOrFail(ticketData);
        event.target.innerHTML = "Sold Out"
        //Hide button
        // event.target.style.display = 'none'
        showAllMovies();
      })
    }
  })


  let renderSuccessOrFail = (ticketData) => {
    if(ticketData.error === undefined) {
      alert("Successfully created ticket")
    } else {
      alert(ticketData.error);
    }
  }

  let showAllMovies = () => {
    fetch('https://evening-plateau-54365.herokuapp.com/theatres/64')
    .then(res => res.json())
    .then(movieData => {
      allMovieData = movieData;
      allMovieData.showings.map(showing => {
        return movieContainer.innerHTML += `
        <div class="card">
          <div class="content">
            <div class="header">
              ${showing.film.title}
            </div>
            <div class="meta">
              ${showing.film.runtime}
            </div>
            <div class="description">
              <span class="ui label">
                ${showing.showtime}
              </span>
              <p id='remaining_tickets'>${(showing.capacity - showing.tickets_sold)} remaining tickets
            </div>
          </div>
          <div class="extra content">
            <div class="ui blue button" id=${showing.id}>Buy Ticket</div>
          </div>
        </div>`;
      })
    })
  }



  showAllMovies();
})//end of DOMContentLoaded
