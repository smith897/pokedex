function search(e) {
  //e.preventDefault();
  if (event.key === 'Enter') {

    let pokemon = e.value.toLowerCase();
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/";
    let ok = true;

    // call API
    fetch(url)
      .then(function(response) {
        if (response.status != 200) {
          document.getElementById('name').textContent = 'Invalid Pokemon';
          document.getElementById('pic').style.visibility = 'hidden';
          document.getElementById('type1').textContent = '';
          document.getElementById('type2').textContent = '';
          document.getElementById('height').textContent = '';
          document.getElementById('weight').textContent = '';
          document.getElementById('summary').textContent = '';
          document.getElementById('number').textContent = '';
          document.getElementById('description').textContent = '';
          ok = false;
        }
        return response.json();
      }).then(function(json) {
        if (ok) {
          document.getElementById('name').textContent = json.name.charAt(0).toUpperCase() + json.name.slice(1);
          document.getElementById('pic').src = json.sprites.front_default;
          document.getElementById('type1').textContent = json.types[0].type.name.charAt(0).toUpperCase() + json.types[0].type.name.slice(1);
          if (json.types.length > 1) document.getElementById('type2').textContent = json.types[1].type.name.charAt(0).toUpperCase() + json.types[1].type.name.slice(1);
          else document.getElementById('type2').style.visibility = 'hidden';
          document.getElementById('height').textContent = (json.height / 10) + 'm';
          document.getElementById('weight').textContent = (json.weight / 10) + 'kg';

          //Get information from species url
          fetch(json.species.url)
            .then(function(response) {
              if (response.status != 200) {
                console.log('Inner response status: ${response.statusText}');
              }
              return response.json();
            }).then(function(json) {
              document.getElementById('summary').textContent = json.genera.find(element => element.language.name == 'en').genus;
              document.getElementById('number').textContent = 'No. ' + json.id;
              document.getElementById('description').textContent = json.flavor_text_entries.find(element => element.language.name == 'en').flavor_text;
            })
        }
      });
  }
}

document.getElementById('pokemonEnterText').addEventListener('search', search);
