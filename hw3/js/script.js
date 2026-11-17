document.querySelector("#pokemonForm").addEventListener("submit", getPokemon);
async function getPokemon(submission) {
    submission.preventDefault();

    let pokemonName = document.querySelector("#pokemonInput").value.toLowerCase();

    if (pokemonName === "") {
        document.querySelector("#pokemonDisplay").textContent = "Please enter a Pokemon name"
        return;
    }

    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

        let response = await fetch(url);
        let data = await response.json();

        let pokemonType = data.types[0].type.name;

        let display = document.querySelector("#pokemonDisplay");

        display.className = "";

        display.classList.add(pokemonType);

        document.querySelector("#pokemonDisplay").innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>

        <p><strong>Type:</strong>
            ${data.types.map(item => item.type.name).join(" / ")}
        </p>
        
        <img src = "${data.sprites.front_default}" alt="${data.name}">
        
        <p><strong>Pokémon ID:</strong> ${data.id}</p>
        
        <p><strong>Height:</strong> ${data.height / 10} m</p>
        
        <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
        
        <p><strong>Abilities:</strong>
            ${data.abilities.map(item => item.ability.name).join(", ")}
        </p>
        
        <h3>Stats</h3>

        ${data.stats.map(item => `
            <p>${item.stat.name}: ${item.base_stat}</p>
        `).join("")}
    `;

} catch (error) {
    document.querySelector("#pokemonDisplay").textContent = "Pokemon not found. Please try again.";
    console.error(error);
}
}