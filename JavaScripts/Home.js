// White & Dark Mode Effect


// ----------------------------------------------------------------------
// Rating Event
function calculateAverageRating() {
  let sum = 0;
  for (let i = 0; i < totalRatings.length; i++) {
    sum += (i + 1) * totalRatings[i];
  }
  return totalReviews === 0 ? 0 : sum / totalReviews;
}

function updateRatingStatistics() {
  const ratingContainer = document.querySelector('.h-rating-row');
  ratingContainer.innerHTML = '';

  for (let i = 5; i >= 1; i--) {
    const ratingSide = document.createElement('div');
    ratingSide.classList.add('h-rating-side');
    ratingSide.innerHTML = `<div>${i}</div>`;
    
    const ratingMiddle = document.createElement('div');
    ratingMiddle.classList.add('h-rating-middle');

    const ratingBarContainer = document.createElement('div');
    ratingBarContainer.classList.add('h-rating-bar-container');

    const ratingBar = document.createElement('div');
    ratingBar.classList.add('h-rating-bar', `h-rating-bar-${i}`);
    ratingBar.style.width = `${(totalRatings[i - 1] / totalReviews) * 100}%`; // Set width based on percentage
    ratingBarContainer.appendChild(ratingBar);

    ratingMiddle.appendChild(ratingBarContainer);

    ratingContainer.appendChild(ratingSide);
    ratingContainer.appendChild(ratingMiddle);
  }
}

function changeStarColor(rating) {
  const stars = document.querySelectorAll('.h-rating-stars .fa-star');
  for (let i = 0; i < stars.length; i++) {
    if (i < rating) {
      stars[i].classList.add('checked');
    } else {
      stars[i].classList.remove('checked');
    }
  }
}
// ----------------------------------------------------------------------
// Save Data Event
// Load previous state from localStorage
let savedState = localStorage.getItem('ratingState');
let totalRatings, totalReviews;

if (savedState) {
  let parsedState = JSON.parse(savedState);
  totalRatings = parsedState.totalRatings;
  totalReviews = parsedState.totalReviews;
} else {
  // Set initial state if no previous state found
  totalRatings = [0, 0, 0, 0, 0];
  totalReviews = 0;
}

function rate(rating) {
  // Update the total ratings
  totalRatings[rating - 1]++;
  totalReviews++;

  // Update the average rating
  const averageRating = calculateAverageRating();
  document.getElementById('average-rating').innerHTML = `${averageRating.toFixed(1)} based on ${totalReviews} reviews.`;

  // Update the rating statistics
  updateRatingStatistics();

  // Change star color on click
  changeStarColor(rating);

  // Save current state to localStorage
  saveState();
}

function saveState() {
  // Save current state to localStorage
  let currentState = {
    totalRatings: totalRatings,
    totalReviews: totalReviews
  };
  localStorage.setItem('ratingState', JSON.stringify(currentState));
}

updateRatingStatistics();
// ----------------------------------------------------------------------
