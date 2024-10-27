const BaseURL = 'https://www.thesportsdb.com//api/v1/json/3/searchplayers.php?p=a';

let playersData = {};

const loadAllPlayer = async () => {
    const response = await fetch(BaseURL);
    const data = await response.json();
    
    const playerdiv = document.getElementById("player-container");

    data.player.forEach((player) => {
        console.log(player);
        playersData[player.idPlayer] = player;
        if(player.strThumb != null){
            const div = document.createElement("div"); 
            div.classList.add("each-player");
            div.innerHTML = `
            <img class="img" src="${player.strThumb}" alt="${player.strPlayer}">
            <h5> Name : ${player.strPlayer}</h5>
            <p> Sport : ${player.strSport}</p>
            <p> Nationality : ${player.strNationality}</p>
            <p> Team : ${player.strTeam.slice(0, 15)}</p>
            <p> Gender : ${player.strGender}</p>
            <p class="socialMedia"> <i class="fa-brands fa-instagram"></i> <i class="fa-brands fa-facebook"></i> </p>
            <button class="btn1" onclick='addingToCart("${player.idPlayer}")'> Add to Cart </button>
            <button class="btn2" onclick='showDetails("${player.idPlayer}")'> Details </button>
            `;
            playerdiv.appendChild(div);
        }
    })
}

loadAllPlayer();


const searchIcon = document.getElementById("search-icon");

const searchResult = async() => {
    const searchInput = document.getElementById("input-value")
    const searchValue = searchInput.value.trim();
    const playerContainer = document.getElementById("player-container");
    playerContainer.innerHTML = '';
    const playertitle = document.getElementById('player-container-title');
    playertitle.innerText = `Search Result for "${searchValue}"`;
    const response = await fetch(`https://www.thesportsdb.com//api/v1/json/3/searchplayers.php?p=${searchValue}`);
    const data = await response.json();
    if(data.player){
        data.player.forEach((player) => {
            playersData[player.idPlayer] = player;
            if(player.strThumb != null){
                const div = document.createElement("div"); 
                div.classList.add("each-player");
                div.innerHTML = `
                    <img class="img" src="${player.strThumb}" alt="${player.strPlayer}">
                    <h5> Name : ${player.strPlayer}</h5>
                    <p> Sport : ${player.strSport}</p>
                    <p> Nationality : ${player.strNationality}</p>
                    <p> Team : ${player.strTeam.slice(0,15)}</p>
                    <p> Gender : ${player.strGender}</p>
                    <p class="socialMedia"> <i class="fa-brands fa-instagram"></i> <i class="fa-brands fa-facebook"></i> </p>
                    <button class="btn1" onclick='addingToCart("${player.idPlayer}")'> Add to Cart </button>
                    <button class="btn2" onclick='showDetails("${player.idPlayer}")'> Details </button>
                `;
                playerContainer.appendChild(div);
            }
        })
    }
    else{
        playerContainer.innerHTML = `<h1> Player not found </h1>`;
    }
}

const searchInput = document.getElementById("input-value")
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchResult();
    }
});

searchIcon.addEventListener('click', searchResult);

const showDetails = (player1) => {
    const player = playersData[player1];
    const modalTitle = document.getElementById("modal-title"); 
    modalTitle.innerText = `${player.strPlayer}'s Details`;
    if (player) {
        const details = document.getElementById("modal-text"); 
        const description = player.strDescriptionEN ? player.strDescriptionEN.split(' ').slice(0, 15).join(' ') + '...' : 'No description available';
        details.innerHTML = `
            <img class="img" src="${player.strThumb}" alt="${player.strPlayer}">
            <h5> Name : ${player.strPlayer}</h5>
            <p> Sport : ${player.strSport}</p>
            <p> Nationality : ${player.strNationality}</p>
            <p> Team : ${player.strTeam.slice(0, 15)}</p>
            <p> Gender : ${player.strGender}</p>
            <p> Description : ${description}</p>
        `;
         // Open the modal using Bootstrap's Modal API
         const modalElement = document.getElementById('playerModal');
         const modalInstance = new bootstrap.Modal(modalElement);
         modalInstance.show();
    } else {
        console.log("Player not found.");
    }
}

const addingToCart = async (player1) => {
    const player = playersData[player1];
    const cartData = document.getElementById("cart-data");
    let cartCountElement = document.getElementById("cart-count");
    let cartCount = parseInt(cartCountElement.innerText);
    if(player && cartCount < 11){
        cartCountElement.innerText = cartCount + 1;
        const p = document.createElement('p');
        p.classList.add('cart-item');
        p.innerHTML = `
            <img class="img1" src="${player.strThumb}" alt="${player.strPlayer}">
            <div>
                <h5> Name : ${player.strPlayer}</h5>
                <p> Sport : ${player.strSport}</p> 
            </div>
        `;
        cartData.appendChild(p);
    }
    else{
        alert("Cart is full");
    }

}

