const theatreId = 66;
const showingsContainer = document.querySelector('.showings')
// console.log(showingsContainer)

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then(res => res.json())
  .then(allShowings => {
    // console.log(allShowings.showings)
    renderAllShowings(allShowings.showings)
  })

function renderAllShowings(arrayOfShowings) {
  arrayOfShowings.forEach(function(singleShowing) {
    // console.log(singleShowing)
    renderSingleShowing(singleShowing)
  })
}

function renderSingleShowing(oneShowing) {
  let ticketsRemaining = oneShowing.capacity - oneShowing.tickets_sold
  showingsContainer.innerHTML += `
    <div data-id="${oneShowing.id}" class="card">
      <div class="content">
        <div class="header">
          ${oneShowing.film.title}
        </div>
        <div class="meta">
          ${oneShowing.film.runtime} minutes
        </div>
        <div class="description">
          <span class="ui label">
            ${oneShowing.showtime}
          </span>
          ${ticketsRemaining} remaining tickets
        </div>
      </div>
      <div class="extra content">
        <div class="ui blue button">Buy Ticket</div>
      </div>
    </div>
    `
}

showingsContainer.addEventListener('click', function(event) {
  // console.log(event.target)
  // debugger
  if (event.target.className === 'ui blue button') {
    // console.log(event.target)
    // debugger
    // event.target.parentElement.parentElement
    let ticketShowingId = parseInt(event.target.parentElement.parentElement.dataset.id)
    // console.log(ticketShowingId)
    let currentTicketsRemaining = event.target.parentElement.parentElement.querySelector('.description').innerText.split(' ')[2]
    console.log(currentTicketsRemaining)
    let updatedTicketsRemaining = (--currentTicketsRemaining).toString()
    let movieTime = event.target.parentElement.parentElement.querySelector('.description').innerText.split(' ')[0]
    // console.log(updatedTicketsRemaining)
    // debugger

    fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        showing_id: ticketShowingId
      })
    })
      .then(res => res.json())
      .then(ticket => {
        console.log(ticket)
        console.log(updatedTicketsRemaining)
        updateDOM(updatedTicketsRemaining)
          // debugger
      })

      function updateDOM(updatedTicketNumber) {
        // debugger
        event.target.parentElement.parentElement.querySelector('.description').innerText = `${movieTime}  ${updatedTicketNumber} remaining tickets`
      }
  }

  // debugger
  // console.log(currentTicketsRemaining)
})


// I was able to update DOM using the function above, but it slightly changes the HTML. I am looking to instead of just changing the innerText, update the innerHTML and insert the innerHTML in the appropriate section of the HTML. I could potentially use the function I created above that renders the single showing.
//




// event.target.parentElement.parentElement.querySelector('.description')
// <div class="description">
//   <span class="ui label">
//     (Showtime)
//   </span>
//   (Num Tickets) remaining tickets
// </div>
