let cidade = document.querySelector('.nome_cidade');
let diaHora = document.querySelector('.dia_hora'); //colocar manualmente passando a tag e etc
let icon = document.querySelector('.icon_clima'); //colocar manualmente passando a tag e etc
let descricaoTempo = document.querySelector('.descricao_tempo');
let temperatura = document.querySelector('.temp_graus');
let imagemFundo = document.querySelector('.fundo'); //colocar manualmente passando a tag e etc
let botaoPesquisa = document.querySelector('#button_addon');
let inputPesquisa = document.querySelector(".input_search");

const api = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: 'https://api.openweathermap.org/data/2.5/',
    lang: 'pt-br',
    units: 'metric'

}

inputPesquisa.addEventListener('keyup', function () {
    if(inputPesquisa.value == ""){
        return;
    }else{
        setTimeout(insereHTML,1000);
        function insereHTML(){
            let valorCidade = inputPesquisa.value;
            getDados(valorCidade);
        }

    }
});

inputPesquisa.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        let valorCidade = inputPesquisa.value;
        getDados(valorCidade);
    }
})


function getDados(cidade) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt_br&units=metric&appid=64ed82577ced7f69cb1687f0ce536131`
    )
    .then(response => {
        if (!response.ok) {
            // throw new Error(`http error: status ${response.status}`);
            // return;
        }
        return response.json();
    })
    .catch(error => {
        alert(error.message);
    })
    
    .then(response => {
        display(response);
    })

}

async function display(dados) {
    cidade.innerHTML = await `<p>${dados.name}</p>`;
    temperatura.innerHTML = `${Math.round(dados.main.temp)}°`;
    icon.innerHTML = `<img src="icons/${dados.weather[0].icon}.png"><span class="descricao_tempo">${dados.weather[0].description}</span>`;
   
}