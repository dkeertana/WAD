function showToast(message) {
    var toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

var bookButtons = document.querySelectorAll(".match-book");

bookButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        var bookingForm = document.getElementById("booking");
        bookingForm.scrollIntoView({ behavior: "smooth" });
        showToast("Scroll down to complete your booking.");
    });
});

var form = document.querySelector(".booking-page form");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        showToast("Your form details are valid.");
    });
}

var matchSelect = document.getElementById("match");
var standSelect = document.getElementById("stand");
var ticketQuantity = document.getElementById("tickets");
var summaryMatch = document.getElementById("summary-match");

if (matchSelect && standSelect && ticketQuantity && summaryMatch) {
    var standNames = ["General", "Premium", "VIP"];

    var ticketPrices = [
        [1500, 3500, 8000],
        [1800, 4000, 9000],
        [1200, 3000, 7000],
        [2000, 4500, 10000]
    ];

    function updateSummary() {
        var matchNumber = Number(matchSelect.value);
        var standNumber = Number(standSelect.value);
        var quantity = Number(ticketQuantity.value);
        var ticketPrice = ticketPrices[matchNumber][standNumber];
        var totalPrice = ticketPrice * quantity;

        summaryMatch.textContent =
            matchSelect.options[matchSelect.selectedIndex].text;

        document.getElementById("summary-stand").textContent =
            standNames[standNumber];

        document.getElementById("summary-price").textContent =
            ticketPrice.toLocaleString("en-IN");

        document.getElementById("summary-quantity").textContent = quantity;

        document.getElementById("summary-total").textContent =
            totalPrice.toLocaleString("en-IN");

        showToast("Booking summary updated.");
    }

    matchSelect.addEventListener("change", updateSummary);
    standSelect.addEventListener("change", updateSummary);
    ticketQuantity.addEventListener("change", updateSummary);
}