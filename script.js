const pokedex = {};
pokedex.pokemon = {};
// variable whose boolean value we can later use to change append location
pokedex.isGallery = false;
// function to clear content/make room for next Pokemon
pokedex.clearDisplay = function() {
    document.querySelector('.singlePokemonContainer').innerHTML = "";
};
// randomizer for Pokemon greetings
const pokeGreeting = ["Hey!", "What's up!", "Hello!", "YO!", "Hi!", "Good Day!", "Greetings!"];
let randomGreeting = pokeGreeting[Math.floor(Math.random() * pokeGreeting.length)];

// setting Juno link to open in new tab
footer = document.querySelector(".junoLink")
footer.setAttribute("target", "_blank")

pokedex.init = function(){
    pokedex.fetchPokemon()
};
// ON LOAD -- Function that displays detailed Pokemon image + stats on page load
pokedex.fetchPokemon = function (id = "") {
    // API fetch with input or random
    let searchId
    if (id == "") {
        searchId = Math.floor(Math.random() * 898 + 1)
    } else {
        searchId = id;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${searchId}`
    fetch(url)
        .then(function (result) {

            // error handling if the API cannot fulfil promise
            if (result.ok) {
                return result.json()
            } else {
                throw new Error(result.statusText);
            }
        })
        .then(function (newResult) {
                pokedex.pokemon.name = newResult.name,
                pokedex.pokemon.image = newResult.sprites.other.dream_world['front_default'],
                pokedex.pokemon.imageTwo = newResult.sprites['front_default'],
                pokedex.pokemon.imageThree = newResult.sprites.other["official-artwork"]['front_default'],
                pokedex.pokemon.type = newResult.types[0].type.name,
                pokedex.pokemon.id = newResult.id,
                pokedex.pokemon.height = newResult.height,
                pokedex.pokemon.weight = newResult.weight,
                pokedex.pokemon.hp = newResult.stats[0].base_stat,
                pokedex.pokemon.defense = newResult.stats[2].base_stat,
                pokedex.pokemon.attack = newResult.stats[1].base_stat,

                    // pokemon display function
                    pokedex.displayPokemon = function () {
                        const greetTitle = document.querySelector('.greetingTitle');
                        const pId = document.querySelector('.pId');
                        const pHeight = document.querySelector('.pH');
                        const pWeight = document.querySelector('.pW');
                        const pType = document.querySelector('.pType');
                        const pHp = document.querySelector('.pHp');
                        const pAttack = document.querySelector('.pAttack');
                        const pDefense = document.querySelector('.pDefense');
                        const div = document.querySelector('.singlePokemonContainer')
                        const image = document.createElement('img')
                        const ul = document.querySelector('ul')
                        const li = document.createElement('li')
                        const title = document.createElement('h3')
                        const pokeId = document.createElement('p')
                        const type = document.createElement('h5')
                        type.classList.add(".pType")

                        // matching the pokemon type name to our icon image
                        let typeIcon = `<img class="iconAll" src="./assets/iconPack/${pokedex.pokemon.type}.png" alt="">`
    
                        const anchor = document.createElement('a')
                        const weightIcon = `<img class="iconAll" src="./assets/iconPack/weight.png" alt="">`
                        const heightIcon = `<img class="iconAll" src="./assets/iconPack/height.png" alt="">`
                        const idIcon = `<img class="iconAll" src="./assets/iconPack/id.png" alt="">`
                        const hpIcon = `<img class="iconAll" src="./assets/iconPack/hp.png" alt="">`
                        const attackIcon = `<img class="iconAll" src="./assets/iconPack/attack.png" alt="">`
                        const defenseIcon = `<img class="iconAll" src="./assets/iconPack/defense.png" alt="">`

                        // image if/else due to some pokemon in the API missing certain images
                        if (pokedex.pokemon.image == null) {
                            image.src = pokedex.pokemon.imageThree
                        } else if (pokedex.pokemon.imageThree == null) {
                            image.src = pokedex.pokemon.imageTwo
                        } else {
                            image.src = pokedex.pokemon.image
                        }
                        // image fade in styling and alt text for accessibility
                        image.setAttribute("onload", `this.style.opacity = 1`)
                        image.setAttribute("alt", `An image of a Pokemon by the name of ${pokedex.pokemon.name}`)
                        
                        // if/else statement to change append location while using same function
                        // this appends the individual image space
                        if (pokedex.isGallery == false) {
                            pId.innerHTML = `ID: ${idIcon} ${pokedex.pokemon.id}`
                            pHeight.innerHTML = `Height: ${heightIcon} ${pokedex.pokemon.height / 10}m`
                            pWeight.innerHTML = `Weight: ${weightIcon} ${pokedex.pokemon.weight / 10}kg`
                            pType.innerHTML = `Type: ${typeIcon} ${pokedex.pokemon.type.charAt(0).toUpperCase() + pokedex.pokemon.type.slice(1)}`
                            pHp.innerHTML = `HP: ${hpIcon} ${pokedex.pokemon.hp}`
                            pAttack.innerHTML = `Attack: ${attackIcon} ${pokedex.pokemon.attack}`
                            pDefense.innerHTML = `Defense: ${defenseIcon} ${pokedex.pokemon.defense}`
                            greetTitle.innerHTML = `${randomGreeting} I'm ${pokedex.pokemon.name}.`
                            div.appendChild(image)

                        // this appends to the ul for gallery view
                        } else if (pokedex.isGallery == true) {
                            let typeIcon = `<img class="iconAll" src="./assets/iconPack/${pokedex.pokemon.type}.png" alt="">`

                            // we use each class to add a background color in our css dependant on pokemon type
                            type.classList.add(`${pokedex.pokemon.type}`)

                            // open external link in new tab
                            anchor.setAttribute("target", "_blank")
                            anchor.setAttribute("href", `https://www.pokemon.com/us/pokedex/${pokedex.pokemon.name}`)
                            title.innerHTML = pokedex.pokemon.name
                            pokeId.innerHTML = `#${pokedex.pokemon.id}`
                            type.innerHTML = `${typeIcon} ${pokedex.pokemon.type}`
                            ul.appendChild(li)
                            li.appendChild(image)
                            li.appendChild(pokeId)
                            li.appendChild(anchor)
                            anchor.appendChild(title)
                            li.appendChild(type)
                        } 
                    }
                    pokedex.displayPokemon()

        // if the API cannot return a value, the followin code will run 
        }).catch(function (error) {
            alert("Oops! The Pokemon name or ID you entered could not be found!")
            console.log(error)
            const errorImage = document.createElement("img")
            errorImage.setAttribute("onload", `this.style.opacity = 1`)
            const div = document.querySelector('.singlePokemonContainer')
            errorImage.src = "./assets/error.jpg"
            div.append(errorImage)
        }) 
};
// INDIVIDUAL -- ON-CLICK section that displays detailed Pokemon image + stats
const singleButton = document.querySelector('.singlePokemonButton')
singleButton.addEventListener('click', function (refresh) {
    refresh.preventDefault()
    pokedex.isGallery = false

    // button disable for 1 second to allow image time to load
    function disableTimer() {
       singleButton.disabled = true;
        setTimeout(function () {singleButton.disabled = false; }, 1000);
    } disableTimer()

    // smoothly scroll up to the start of the selecter container
    const scrollPoint = document.querySelector(".meetContainer")
    scrollPoint.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
    // clear content and fetch a new Pokemon
    pokedex.clearDisplay()
    pokedex.fetchPokemon()
});
// SEARCH -- ON-CLICK section SEARCH TEST
const searchButton = document.getElementById('searchButton')
searchButton.addEventListener('click', function (refresh) {
    refresh.preventDefault()
    
    // smoothly scroll up to the start of the selecter container
    const scrollPoint = document.querySelector(".meetContainer")
    scrollPoint.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
    pokedex.isGallery = false
    let searchInput = document.querySelector("input[name=searchInput]").value.toLowerCase()
    
    function disableTimer() {
        searchButton.disabled = true;
        setTimeout(function () { searchButton.disabled = false; }, 1000);
    } disableTimer()

    // run the clear/fetch only if search box is not empty (invalid entry is handled separately within pokemon.fetchPokemon with throw/catch)
    if (searchInput) {
    pokedex.clearDisplay()
    pokedex.fetchPokemon(searchInput)
    
    } else if (searchInput == ""){
        alert("Please enter Pokemon name or ID number in the search box.")
    }
    document.querySelector("input[name=searchInput]").value = ""
});
// GALLERY -- ON-CLICK section that displays Pokemon gallery
const form = document.querySelector('.pokeForm')
form.addEventListener('submit', function (refresh){
    refresh.preventDefault()
    function clear() {
        document.querySelector('ul').innerHTML = "";
    }
    clear()

    // if (inputCheckState) makes sure a radio button input is selected before function runs, alert() instead
    let inputCheckState = document.querySelector('input[name = "poke"]')
    if (inputCheckState = document.querySelector('input[name = "poke"]:checked')) {
        const input = document.querySelector('input[name = "poke"]:checked').value
        function disableTimer() {
            document.getElementById("manyPoke").disabled = true;
            setTimeout(function () { document.getElementById("manyPoke").disabled = false; }, 1500);
        } disableTimer()
        
        // smoothly scroll up to the start of the selecter container
        const scrollPoint = document.querySelector(".browseContainer")
        scrollPoint.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
        for (i = 1; i <= input; i++){
            pokedex.isGallery = true
            pokedex.fetchPokemon()
        }
    } else {
        alert("Please select the amount of Pokemon you'd like to see before submitting")
    }
});
pokedex.init();
