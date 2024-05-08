function updateViewsAndDate(cardId) {
    var viewsElement = document.querySelector(`#${cardId} .viewsCount`);
    var dateElement = document.querySelector(`#${cardId} .dateValue`);
   
    // Update views with random number under 10000
    var randomViews = Math.floor(Math.random() * 10000);
    viewsElement.textContent = randomViews;
  
    // Update date with only the date (no time)
    var currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
    dateElement.textContent = currentDate;
  }
  
  // Call the function initially for each card
  updateViewsAndDate("card1");
  updateViewsAndDate("card2");
  updateViewsAndDate("card3");
  updateViewsAndDate("card4");
  updateViewsAndDate("card5");
  updateViewsAndDate("card6");
  
  // Update views every 10 minutes for each card
  setInterval(function () {
    updateViewsAndDate("card1");
    updateViewsAndDate("card2");
    updateViewsAndDate("card3");
    updateViewsAndDate("card4");
    updateViewsAndDate("card5");
    updateViewsAndDate("card6");
    // Repeat for each card
  }, 10 * 60 * 1000);
  
  // Update date every minute for each card
  setInterval(function () {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
      updateViewsAndDate(card.id);
    });
  }, 60 * 1000);
  