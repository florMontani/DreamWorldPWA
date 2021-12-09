//load
window.addEventListener('load', event => {

    if ( navigator.onLine === false ) {

        offlineNav();
        // console.log(inputS.value);


    }
    else {

        onlineNav();
        // console.log(inputS.value);

    }
});

//online
    window.addEventListener('online', () => {
        onlineNav();
    });
//offline
    window.addEventListener('offline',()=> {
        offlineNav();
    });
function onlineNav(){
    document.querySelector('.online').classList.remove('hidden');
        document.querySelector('.offline').classList.add('hidden');
        console.log('online');

}
function offlineNav() {
    document.querySelector('.offline').classList.remove('hidden');
    document.querySelector('.online').classList.add('hidden');
    console.log('offline');
}



//API
const d = document;
const KEY = '13b25533';
const div = d.querySelector('#filmLoad');
let btn = d.querySelector('#submite');
const inputS = d.querySelector('#search');
let favlink = d.querySelector('#favlink');
let getJSON = "";




// inputS.addEventListener('keypress', (event) =>{
//     if(event.keyCode == 13){
//         console.log(inputS.value);
//         getMovie(inputS.value);
//     }
// });

favlink.addEventListener('click', blockbtn);
function blockbtn () {
    btn = null;
}




//click
if (btn != null){
    btn.addEventListener('click', clickSend);
function clickSend () {
    if(inputS.value =='undefined'){
        createMov(movie);
        
    }else{
        console.log(inputS.value);
        getMovie(inputS.value);
    }
}
}


function getMovie(mov){
    fetch(`https://www.omdbapi.com/?t=${mov}&apikey=${KEY}`
    ).then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (responseJSON) {
        console.log('imprimo json', responseJSON);
        createMov(responseJSON);
        saveLocalStorage(responseJSON);
        return responseJSON;
    }).catch(function (error) {
            console.log('Fallo!', error)
        });
}

function createMov(movie){
// console.log(movie);

if(movie.Response == 'False'){
    div.innerHTML="";
let p = d.createElement('p');
p.innerText=`${movie.Error} Try again!`;
let p1 = d.createElement('p');
p.classList.add('wrong');
div.appendChild(p);


} else {
    //pelicula encontrada
    div.innerHTML="";
    // let p1 = d.createElement('p');
// p1.innerText='pelicula encontrada.';
// div.appendChild(p1);
const cont = d.createElement('div');
cont.classList.add('container', 'card');
cont.style.width='20rem';
div.appendChild(cont);

//title
let h2 = d.createElement('h2');
h2.classList.add('title');
h2.innerText = movie.Title;
cont.appendChild(h2);

//img
let img = d.createElement('img');
img.src = movie.Poster;
        img.alt = `imagen de la película ${movie.Title}`;
        img.classList.add('card-img-top');
        cont.appendChild(img);

 //div contenedor del texto
// let divtxt = d.createElement('div');
// divtxt.innerHTML='prueba';
// divtxt.id = 'divcont';
// cont.appendChild(divtxt);

//sinopsis
let sinopsis = d.createElement('div');
sinopsis.innerText = movie.Plot;
sinopsis.id='divtxt';
cont.appendChild(sinopsis);

//score
let info = d.createElement('p');
info.innerHTML = `score: ${movie.imdbRating} `;
info.classList.add('info');
info.style.fontWeight = 'bold';
cont.appendChild(info);

    //star
let score = d.createElement('span');
score.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-star" viewBox="0 0 16 16">
<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg>`;
score.id = 'score';
info.appendChild(score);
score.style.fontWeight = 'bold';

//-------------------------
validarFavs (movie);

}//else

}//create

function validarFavs (movie){
    let jsmovie = JSON.parse(localStorage.getItem('API request favorites'));
if ( jsmovie != null) {
    let JsonItem = jsmovie.some(item => item.Title === movie.Title);
    if (JsonItem){
        btnRemove(movie);
    }  else {
        btnadd(movie);
    }
}
 else {
     btnadd(movie);
      }
}






function btnRemove(movie){
    let Divtext = d.querySelector('#divtxt');
    let Delete = d.createElement('a');
    Delete.innerHTML = 'Remove';
    Delete.classList.add('btn', 'btn-danger','boton');

    //click
    Delete.addEventListener('click', () => {
        console.log('remove');
        deleteFav(movie.Title);
        Delete.remove();
        btnadd(movie);
    })
    Divtext.appendChild(Delete);
}


function btnadd(movie){
    let Divtext = d.querySelector('#divtxt');
    let btnfav = d.createElement('a');
    btnfav.id = 'favoritos';
    btnfav.innerText = 'Add to Fav!';
    btnfav.classList.add('btn','btn-info', 'boton');

//click
    btnfav.addEventListener('click', () => {
        console.log('add');
        // alert(` Film added!`);
        saveMovieToStorageFAV(movie);
        btnfav.remove();
        btnRemove(movie);
    })
    Divtext.appendChild(btnfav);
}

//save favorites
const saveMovieToStorageFAV = (movie) => {
    getJSON = JSON.parse(localStorage.getItem('API request favorites'));
    if (getJSON == null) {
        const newJson = [];
        newJson.push(movie);
        localStorage.setItem('API request favorites', JSON.stringify(newJson));
    } else {
        const JsonItem = getJSON.some(item => item.Title === movie.Title);
        if (!JsonItem) {
            getJSON.push(movie);
            localStorage.setItem('API request favorites', JSON.stringify(getJSON));

        }

    }

}
//remove favorites
function deleteFav(movie) {
    getJSON = JSON.parse(localStorage.getItem('API request favorites'));
    if (getJSON == null) {
        const nuevaLista = [];
        nuevaLista.push(movie);
        localStorage.setItem('API request favorites', JSON.stringify(nuevaLista));
    } else {
        const JsonItem = getJSON.some(item => item.Title === movie);
        if (JsonItem) {
           let nuevaLista = getJSON.filter(item => item.Title !== movie);
            localStorage.setItem('API request favorites', JSON.stringify(nuevaLista));
        }

    }

}
//ls
const lastRequest = JSON.parse(localStorage.getItem('API request'));
if (btn != null){
if (lastRequest != null){
    createMov(lastRequest);
}
}
function saveLocalStorage (movie){
    localStorage.setItem('API request', JSON.stringify(movie));

}


function NoFavs() {
if (getJSON === null || getJSON.length === 0) {
    fav.innerHTML="";
}}


//favoritos

function MostrarFavs() {
    let divFav = d.querySelector('#fav');
    getJSON = JSON.parse(localStorage.getItem('API request favorites'));
divFav.innerHTML="";

    if (getJSON !== null || getJSON.length > 0) {
       
        console.log(getJSON);
        for( movies of getJSON){
            let divData = d.createElement('div');
            divData.classList.add('container', 'card');
            divData.style.width = '20rem';
            divFav.appendChild(divData);

            //title
            let h2Fav = d.createElement('h2');
            h2Fav.innerHTML = movies.Title;
            h2Fav.classList.add('title');
            divData.appendChild(h2Fav);

            //img
            let imgFav = d.createElement('img');
            imgFav.src = movies.Poster;
            imgFav.alt = 'Card image cap';
            imgFav.classList.add('card-img-top');
            divData.appendChild(imgFav);

            //contenedor
            let divSinopsis = d.createElement('div');
            divData.appendChild(divSinopsis);

            //sinopsis
            let sinopsisFav = d.createElement('p');
            sinopsisFav.innerHTML = movies.Plot;
            sinopsisFav.id ='divfav';
            divSinopsis.appendChild(sinopsisFav);

            //score
            let infoFav = d.createElement('p');
            infoFav.innerHTML = `Score: ${movies.imdbRating} `;
            infoFav.classList.add('info');
            infoFav.style.fontWeight = 'bold';
            divData.appendChild(infoFav);

            //star
            let scoreFav = d.createElement('span');
                scoreFav.innerHTML=`<svg xmlns="http://www.w3.org/ 2000/svg" width="16" height="16" fill="orange" class="bi bi-star" viewBox="0 0 16 16">
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
    </svg>`;
    infoFav.appendChild(scoreFav);
    scoreFav.style.fontWeight = 'bold';
    
            //btn
            let favDelete = d.createElement('a');
            favDelete.innerHTML = 'Remove';
            favDelete.id = movies.Title;
            favDelete.classList.add('btn', 'btn-danger', 'boton');
            divSinopsis.appendChild(favDelete);

            favDelete.addEventListener('click', () => {
                deleteFav(favDelete.id)
                divFav.innerHTML="";
                MostrarFavs();
         


            })


        }//for
        
        
    }//else
}
