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