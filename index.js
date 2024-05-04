const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();

container.addEventListener("click", function (e) {
    // console.log(e.target);

    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
        // console.log(e.target);
        e.target.classList.toggle("selected");

        // let selectedSeatCount = container.querySelectorAll(".seat.selected").length;
        // // console.log(selectedSeatCount);
        // let price = select.value;
        // // console.log(price);
        // count.innerText = selectedSeatCount;
        // amount.innerText = selectedSeatCount * price;

        calculateTotal();
    }
})


select.addEventListener("change", function (e) {
    calculateTotal();
})

function calculateTotal() {
    const selectedSeats = container.querySelectorAll(".seat.selected");
    // console.log(seats);
    // console.log(selectedSeats);
    // console.log(selectedSeatCount);
    // console.log(price);

    const selectedSeatsArr = [];
    const seatsArr = [];
    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat)
    });

    seats.forEach(function (seat) {
        seatsArr.push(seat)
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });

    // console.log(selectedSeatIndex);

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem("selectedSeats", JSON.stringify(indexs));
    localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}