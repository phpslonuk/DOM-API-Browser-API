const itemRender = function(img, name, created, species, location, episodes) {
    let node = ` 
            <img class="card-img" src="${img}" alt="img">
            <div class="card-title"><h3>Name: ${name}</h3></div>
            <div class="card-sub"> Created: ${created.slice(0,10)}</div>
            <div class="card-sub"> Species: ${species}</div>
            <div class="card-sub"> Location: ${location.name}</div>
            <div class="block"> Episodes: ${episodes.join(', ')}</div>
            <div class="btn-keeper">
              <a class="btn" href="#">Delete</a>
          </div>`;
    return node;
}

const itemAdder = function(item) {
    let parentNode = document.getElementById("wrapper");
    parentNode.append(item);
}
const rend = function() {
    const url = 'https://rickandmortyapi.com/api/character';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const rawData = data.results;
            return rawData.map(character => {
                //all needed data is listed below as an entity 
                let created = character.created;
                let species = character.species;
                let img = character.image;
                let episodes = character.episode;
                let name = character.name;
                let location = character.location;
                //create element                      
                let newCard = document.createElement("div");
                newCard.classList.add("card");
                newCard.setAttribute('ep', episodes.length);
                newCard.setAttribute('date', created.slice(0, 10));
                newCard.innerHTML = itemRender(img, name, created, species, location, episodes);

                //append element
                itemAdder(newCard);
            });
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
        });
}

/* old way
const hideDiv = function() {
    let elem = document.querySelectorAll(".card");
    for (i = 0; i < elem.length; i++) {
        if (i > 9) {
            elem[i].classList.add("hide");
        }
    }
}
*/

rend();
//setTimeout(hideDiv, 500);

// scroll elements
window.onscroll = function() { myFunction() };

function myFunction() {

    if (document.documentElement.scrollTop > 100) {
        let elems = document.querySelectorAll(".card");
        for (i = 0; i < elems.length; i++) {
            if (i > 9) {
                elems[i].classList.remove("hide");
            }
        }
    } else {
        let elems = document.querySelectorAll(".card");
        for (i = 0; i < elems.length; i++) {
            if (i > 9) {
                elems[i].classList.add("hide");
            }
        }
    }
}

// Open the dropdown
let button = document.querySelector(".dropbtn");
button.addEventListener("click", dropdownFunction);

function dropdownFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");

        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// remove cards
let cards = document.querySelector(".wrapper");
cards.addEventListener('click', function(e) {
    let tar = e.target;
    if (tar.className == "btn") {
        cards.removeChild(tar.parentNode.parentNode);
    }
});


// sort cards
let dropParent = document.querySelector(".dropdown-content");
dropParent.addEventListener('click', function(e) {
    let card = e.target.getAttribute("sort");

    if (card == "DHL") {
        reRender(sortDateHighToLow());
    } else if (card == "DLH") {
        reRender(sortDateLowToHigh());
    } else if (card == "EHL") {
        reRender(sortEpisodesHighToLow());
    } else {
        reRender(sortEpisodesLowToHigh());
    }
});


function sortDateHighToLow() {
    let nodelist = document.querySelectorAll(".card");
    let array = [...nodelist];
    array.sort(function(a, b) {
        return b.getAttribute("date") - a.getAttribute("date");
    });
    return array;
}

function sortDateLowToHigh() {
    let nodelist = document.querySelectorAll(".card");
    let array = [...nodelist];
    array.sort(function(a, b) {
        return a.getAttribute("date") - b.getAttribute("date");
    });
    return array;
}

function sortEpisodesHighToLow() {
    let nodelist = document.querySelectorAll(".card");
    let array = [...nodelist];
    array.sort(function(a, b) {
        return b.getAttribute("ep") - a.getAttribute("ep");
    });
    return array;
}

function sortEpisodesLowToHigh() {
    let nodelist = document.querySelectorAll(".card");
    let array = [...nodelist];
    array.sort(function(a, b) {
        return a.getAttribute("ep") - b.getAttribute("ep");
    });
    return array;
}

function reRender(array) {
    const list = document.getElementById("wrapper");

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    for (let key in array) {
        list.appendChild(array[key]);
    }
}