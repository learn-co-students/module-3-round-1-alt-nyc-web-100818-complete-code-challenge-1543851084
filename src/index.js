const theatreId = 64;
let allShowings = []
document.addEventListener('DOMContentLoaded', () => {
  const showContainer = document.getElementById('showings')


    fetch('https://evening-plateau-54365.herokuapp.com/theatres/64')
   .then(res => res.json())
   .then(json => {
     allShowings = json
     showContainer.innerHTML = renderShowings(allShowings)
     let soldOut = findSoldOut(allShowings)
     let sold = soldIds(soldOut)
     /// To hide button on first render would loop over sold to assign them each to variable id below
     // and then remove it or set display to 'none'
     //Hiding the button only worls when buying new tickets without this first step, out of time :(

    //let button = document.getElementById(`${id}`)
    // let buttonId = parseInt(button.id)
     // if (sold.includes(buttonId)){
     //   button.remove()
     // }

   })

showContainer.addEventListener('click', (event) => {
  if(event.target.dataset.action === 'buy') {
    let id = parseInt(event.target.dataset.id)
    let remaining = document.getElementById(`remaining-${id}`)
    let remain = document.getElementById('remain')
    let data = {
      showing_id: id
    }

    fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
     })
     .then(res => res.json())
     .then((json) => {
     newTicket = json
     let updatedShowing = findShowing(id, allShowings)
     remaining.innerText = `${getTixLeft(updatedShowing.capacity, ++updatedShowing.tickets_sold)} remaining tickets`
      soldOut = findSoldOut(allShowings)
      button = document.getElementById(`${id}`)
      let sold = soldIds(soldOut)
      let buttonId = parseInt(button.id)
      if (sold.includes(buttonId)){
        button.remove()
        window.alert('Sold out!')
      }
     })
  }

})

}) // END DOM content

function renderShowings(allShowings) {
  return allShowings.showings.map((showing) => {
    return `
      <div data-id='${showing.id}' class="card">
      <div class="content">
        <div class="header">
          ${showing.film.title}
        </div>
        <div class="meta">
          ${showing.film.runtime} minutes
        </div>
        <div class="description">
          <span class="ui label">
          ${showing.showtime}
          </span>
        <p class='remain' id='remaining-${showing.id}'>  ${getTixLeft(showing.capacity, showing.tickets_sold)} remaining tickets </p>
        </div>
      </div>
      <div class="extra content">
        <div id='${showing.id}' data-action='buy' data-id='${showing.id}' class="ui blue button">Buy Ticket</div>
      </div>
      </div>
    `
  }).join('')
}


function getTixLeft(capacity, tixSold) {
  return capacity - tixSold
}

function findShowing(id, allShowings) {
  return allShowings.showings.find((show) => {
    return show.id == id
  })
}

function findSoldOut(allShowings) {
  return allShowings.showings.filter((showing) => {
    return showing.capacity === showing.tickets_sold
  })
}

function soldIds(soldOut) {
  return soldOut.map((showing) => {
    return showing.id
  })
}
