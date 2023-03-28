
//START CHATBOT LOGIC
const inputField = document.getElementById("input");
inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        let input = inputField.value;
        inputField.value = "";
        output(input);
    }
});

function output(input) {
    let product;

    let text = input.toLowerCase();
    console.log(text, "Initial text");

    text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    console.log(text, "Secondary text");

    text = text
        .replace(/ a /g, " ")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .replace(/r u/g, "are you");

    console.log(text, "Third text");

    if (compare(utterances, answers, text)) {
        // Search for exact match in triggers
        product = compare(utterances, answers, text);
    }
    else {
        product = alternatives[Math.floor(Math.random() * alternatives.length)];
    }

    addChatEntry(input, product);
}

function compare(utterancesArray, answersArray, string) {
    console.log(typeof string, 'typeof');
    let reply;
    let replyFound = false;
    for (let x = 0; x < utterancesArray.length; x++) {
        for (let y = 0; y < utterancesArray[x].length; y++) {
            if (string.includes('holiday')) {
                let replies = answersArray[2];
                reply = replies[Math.floor(Math.random() * replies.length)], (showFilterBtn());
                break;
            }
            else if (string.includes('flight')) {
                let replies = answersArray[2];
                reply = replies[Math.floor(Math.random() * replies.length)], (showFilterBtn());
                break;
            }
            else if (utterancesArray[x][y] === string) {
                let replies = answersArray[x];
                reply = replies[Math.floor(Math.random() * replies.length)];
                replyFound = true;
                break;
            }
        }
        if (replyFound) {
            break;
        }
    }
    return reply;

}


function addChatEntry(input, product) {
    const messagesContainer = document.getElementById("messages");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `<span>${input}</span>`;
    messagesContainer.appendChild(userDiv);

    let botDiv = document.createElement("div");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botDiv.className = "bot response";
    botText.innerText = "Typing...";
    botDiv.appendChild(botText);
    messagesContainer.appendChild(botDiv);

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight - messagesContainer.clientHeight;

    setTimeout(() => {
        botText.innerText = `${product}`;
    }, 2000);
}
//END CHATBOT LOGIC

//START UTTERANCES
// user input options
const utterances = [

    ["how are you", "how is life", "how are things"],
    ["hi", "hey", "hello", "good morning", "good afternoon"],
    ["i would like to go on holiday", "holiday", "holidays"],
    ["i would like to see your flight times", "flight", "flights"],


];

// Possible responses corresponding to triggers

const answers = [
    [
        "Fine... how are you?",
        "Pretty well, how are you?",
        "Fantastic, how are you?"
    ],
    [
        "Hi! How can I help?",
    ],
    ["So you're looking to go on holiday. Would you like to see our holiday packages? Just click Yes bellow!"],
    // ["So you're looking to go on holiday. Would you like to see our holiday packages? Just click Yes bellow!"],



];

// Random for any other user input

const alternatives = [
    "Go on...",
    "Try again",
];
//END UTTERANCES

//START FILTER FORM LOGIC
function showForm() {
    document.getElementById("filter-form").style.display = "block";
    document.getElementById("filter-button").style.display = "none";
}
function showFilterBtn() {
    document.getElementById("filter-button").style.display = "block";
}

document.getElementById("filter-form").addEventListener("submit", function (e) {
    e.preventDefault();
    getData();
})




function getData() {
    dataContainer = document.querySelector('#data');

    fetch("http://localhost:3000/first-holiday-chat-agent")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            function filterPackages(data, hotelName, city, country, maxPrice) {
                hotelName = hotelName ? hotelName.trim().toLowerCase() : "";
                city = city ? city.trim().toLowerCase() : "";
                country = country ? country.trim().toLowerCase() : "";

                return data.filter((package) => {
                    if (hotelName && !package.HotelName.toLowerCase().includes(hotelName)) {
                        return false;
                    }
                    if (city && !package.City.toLowerCase().includes(city)) {
                        return false;
                    }
                    if (country && !package.Country.toLowerCase().includes(country)) {
                        return false;
                    }
                    if (maxPrice && package.PricePerPerNight > maxPrice) {
                        return false;
                    }
                    return true;
                });
            }

            document.getElementById("filter-form").addEventListener("submit", function (e) {
                e.preventDefault();
                const hotelNameInput = document.getElementById("hotelName");
                const cityInput = document.getElementById("city");
                const countryInput = document.getElementById("country");
                const maxPriceInput = document.getElementById("maxPrice");

                const hotelName = hotelNameInput ? hotelNameInput.value : "";
                const city = cityInput ? cityInput.value : "";
                const country = countryInput ? countryInput.value : "";
                const maxPrice = maxPriceInput ? maxPriceInput.value : "";

                const filteredPackages = filterPackages(data.data, hotelName, city, country, maxPrice);

                const table = document.getElementById("output");
                table.innerHTML = "";

                const thead = table.createTHead();
                const row = thead.insertRow();
                const hotelNameHead = row.insertCell();
                hotelNameHead.innerHTML = "Hotel Name";
                const cityHead = row.insertCell();
                cityHead.innerHTML = "City";
                const countryHead = row.insertCell();
                countryHead.innerHTML = "Country";
                const starRatingHead = row.insertCell();
                starRatingHead.innerHTML = "Star Rating";
                const priceHead = row.insertCell();
                priceHead.innerHTML = "Price Per Night";
                const tbody = table.createTBody();

                for (i = 0; i < filteredPackages.length; i++) {
                    const package = filteredPackages[i];
                    const row = tbody.insertRow();
                    const hotelNameCell = row.insertCell();
                    hotelNameCell.innerHTML = package.HotelName;
                    const cityCell = row.insertCell();
                    cityCell.innerHTML = package.City;
                    const countryCell = row.insertCell();
                    countryCell.innerHTML = package.Country;
                    const starRatingCell = row.insertCell();
                    starRatingCell.innerHTML = package.StarRating;
                    const priceCell = row.insertCell();
                    priceCell.innerHTML = package.PricePerPerNight;
                }
            });
        })
        .catch((error) => console.error("FETCH ERROR:", error));
}

        //START FILTER FORM LOGIC