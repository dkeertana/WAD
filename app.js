function showToast(message) {
    var toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(function () {
        toast.classList.remove('show');
    }, 3000);
}

// Show and hide the menu on small screens.
var menuButton = document.querySelector('.menu-toggle');
var navigation = document.getElementById('main-nav');

menuButton.addEventListener('click', function () {
    var menuIsOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !menuIsOpen);
    menuButton.setAttribute('aria-label', menuIsOpen ? 'Open menu' : 'Close menu');
    navigation.classList.toggle('open');
});

navigation.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open menu');
        navigation.classList.remove('open');
    });
});

// Filter the match cards by team.
var teamFilter = document.getElementById('team-filter');
var matchCards = document.querySelectorAll('.match-card');
var emptyMessage = document.getElementById('empty-state');

teamFilter.addEventListener('change', function () {
    var selectedTeam = teamFilter.value;
    var matchesShown = 0;

    matchCards.forEach(function (card) {
        var teams = card.getAttribute('data-teams').split(' ');
        var showCard = selectedTeam === 'all' || teams.includes(selectedTeam);

        card.hidden = !showCard;

        if (showCard) {
            matchesShown++;
        }
    });

    emptyMessage.hidden = matchesShown > 0;
});

// Switch between grid and list views.
var matchList = document.getElementById('match-list');
var viewButtons = document.querySelectorAll('.view-button');

viewButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var showList = button.getAttribute('data-view') === 'list';
        matchList.classList.toggle('list-view', showList);

        viewButtons.forEach(function (otherButton) {
            otherButton.classList.toggle('active', otherButton === button);
        });
    });
});

// Update the booking summary when the selections change.
var ticketPrices = [
    [1500, 3500, 8000],
    [1800, 4000, 9000],
    [1200, 3000, 7000],
    [2000, 4500, 10000]
];

var matchNames = [
    'Match 1: CSK vs MI',
    'Match 2: RCB vs KKR',
    'Match 3: SRH vs RR',
    'Match 4: MI vs RCB'
];

var standNames = ['General', 'Premium', 'VIP'];
var matchSelect = document.getElementById('match');
var standSelect = document.getElementById('stand');
var ticketQuantity = document.getElementById('tickets');

function updateSummary() {
    var matchNumber = Number(matchSelect.value);
    var standNumber = Number(standSelect.value);
    var quantity = Number(ticketQuantity.value) || 1;
    var price = ticketPrices[matchNumber][standNumber];

    document.getElementById('summary-match').textContent = matchNames[matchNumber];
    document.getElementById('summary-stand').textContent = standNames[standNumber];
    document.getElementById('summary-price').textContent = price.toLocaleString('en-IN');
    document.getElementById('summary-quantity').textContent = quantity;
    document.getElementById('summary-total').textContent =
        (price * quantity).toLocaleString('en-IN');
}

matchSelect.addEventListener('change', updateSummary);
standSelect.addEventListener('change', updateSummary);
ticketQuantity.addEventListener('input', updateSummary);

// Choose the match in the booking form when a match card's Book button is clicked.
document.querySelectorAll('.match-book').forEach(function (button) {
    button.addEventListener('click', function () {
        matchSelect.value = button.getAttribute('data-match');
        updateSummary();
    });
});

// Check the form and show a message when it is submitted.
document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
        return;
    }

    showToast('Your form details are valid.');
});