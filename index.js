// Función para mostrar el modal Trailer
function mostrarModal() {
    document.body.classList.add('no-scroll'); 
    var modal = document.getElementById("modal");
    modal.style.display = "block"; 
    document.getElementById("youtube-player").src = "https://www.youtube.com/embed/ee9i6oMqShk?autoplay=1"; 
}

// Función para cerrar el modal
function cerrarModal() {
    document.body.classList.remove('no-scroll'); 
    document.getElementById("youtube-player").src = ""; 
    var modal = document.getElementById("modal");
    modal.style.display = "none"; 
}

let seleccionados = [];

buscador.addEventListener("input", () => {
  seleccionados.length = 0;
  let fragment = document.createDocumentFragment();
  let elValor = buscador.value;

  if (elValor.length > 0) {
    peliculas.forEach(j => {
      if (j.Title.includes(elValor)) {
        seleccionados.push(j.Title);
      }
    });
   
    seleccionados.forEach(s => {
      let p = document.createElement("p");
      p.innerHTML = s;
      fragment.appendChild(p);
    });
  
    resultado.innerHTML = "";
    resultado.appendChild(fragment);
  }
});


const contenedor = document.getElementById('contenedor');

let peliculas =[];

fetch('peliculas.json').then((data)=>{
    return data.json()
 })
 .then((data) => {
    peliculas = data;
 });

 const mostrarPeliculas = (peliculas) => {

    const peliculasDiv = peliculas.map((pelicula, peliculaIndex)=>{
        const peliculaDiv = document.createElement('div');
        peliculaDiv.classList.add('pelicula');
    
        const index = document.createElement('p')
        index.textContent = 'No.' + (peliculaIndex +1);
        peliculaDiv.appendChild(index);

        const poster = document.createElement('img');
        poster.src=pelicula.Poster;
        peliculaDiv.appendChild(poster);
    
        const tituloP=document.createElement('p');
        tituloP.textContent = pelicula.Title;
        peliculaDiv.appendChild(tituloP);
    
        const añoP = document.createElement('p');
        añoP.textContent = pelicula.Year;
        peliculaDiv.appendChild(añoP);
    
        const tipoP = document.createElement('P');
        tipoP.textContent = pelicula.Rated;
        peliculaDiv.appendChild(tipoP);
    
        const lanzamientoP = document.createElement('P');
        lanzamientoP.textContent = pelicula.Released;
        peliculaDiv.appendChild(lanzamientoP);
    
        const tiempoP = document.createElement('P');
        tiempoP.textContent = pelicula.Runtime;
        peliculaDiv.appendChild(tiempoP);

        
        const div_rate = document.createElement('div'); 

        const ratingsDIv = pelicula.Ratings.map((rating) => {
            const ratingDiv = document.createElement('div');
        
            const sourceP = document.createElement('spam');
            sourceP.textContent = rating.Source;
            ratingDiv.appendChild(sourceP);
        
            const valueP = document.createElement('spam');
            valueP.textContent = rating.Value;
            ratingDiv.appendChild(valueP);
                
            return ratingDiv
        });
        ratingsDIv.forEach((element) =>{
            div_rate.appendChild(element);
        });
        
        peliculaDiv.appendChild(div_rate);
        return peliculaDiv
    });
    peliculasDiv.forEach((element) => {
      contenedor.appendChild(element);  
    });  

   
};    
     

 //top3 peliculas mejor rating
 const top3 = () => {

    contenedor.innerHTML='';
    peliculas.sort((a, b) =>{
        if(a.Metascore < b.Metascore){
            return 1;
        }   else if (b.Metascore < a.Metascore){
            return -1;
        }   else {
            return 0;
        }
    });
    const top_3 =peliculas.slice(0, 3);
    
    mostrarPeliculas(top_3);
};


const stringToDate = (cadenaFecha) => {
    const parteFecha = cadenaFecha.split(" ");

    const dia = parseInt(parteFecha[0],10);
    const mesTexto = parteFecha[1];
    const year = parseInt(parteFecha[2],10);
    const meses =[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const mes = meses.indexOf(mesTexto); 
    return new Date (year, mes, dia);
};

const lanzamiento = () => {

    contenedor.innerHTML='';

    peliculas.sort((a, b) => {
        const fechaA = stringToDate(a.Released);
        const fechaB = stringToDate(b.Released);
        if(fechaA < fechaB){
            return 1;
        }   else if (fechaB < fechaA){
            return -1;
        }   else {
            return 0;
        }
    });
    
    mostrarPeliculas(peliculas);

};

const alfabetico = () => {
    contenedor.innerHTML='';
    
    peliculas.sort((a, b) =>{
        if(a.Title < b.Title){
            return -1;
        }   else if (b.Title < a.Title){
            return 1;
        }   else {
            return 0;
        }
    });
    
    mostrarPeliculas(peliculas);
};

const ejercicio1Button = document.getElementById('button1');
ejercicio1Button.addEventListener('click', top3);

const ejercicio2Button = document.getElementById('button2');
ejercicio2Button.addEventListener('click', lanzamiento);

const ejercicio3Button = document.getElementById('button3');
ejercicio3Button.addEventListener('click', alfabetico);



let loadMoreBtn1 = document.querySelector('#load-more-1');
let currentItem1 = 4;

loadMoreBtn1.onclick = () => {
    let boxes = [...document.querySelectorAll(
        '.box-container-1 .box-1'
    )];
    for(var i = currentItem1; i < currentItem1 + 4; i++) {
        boxes[i].style.display = 'inline-block'; 
    }
    currentItem1 += 4;
    if(currentItem1 >= boxes.length) {
        loadMoreBtn1.style.display ='none'
    }
    
}

let loadMoreBtn2 = document.querySelector('#load-more-2');
let currentItem2 = 4;

loadMoreBtn2.onclick = () => {
    let boxes = [...document.querySelectorAll(
        '.box-container-2 .box-2'
    )];
    for(var i = currentItem2; i < currentItem2 + 4; i++) {
        boxes[i].style.display = 'inline-block'; 
    }
    currentItem2 += 4;
    if(currentItem2 >= boxes.length) {
        loadMoreBtn2.style.display ='none'
    }
    
}

let loadMoreBtn3 = document.querySelector('#load-more-3');
let currentItem3 = 4;

loadMoreBtn3.onclick = () => {
    let boxes = [...document.querySelectorAll(
        '.box-container-3 .box-3'
    )];
    for(var i = currentItem3; i < currentItem3 + 4; i++) {
        boxes[i].style.display = 'inline-block'; 
    }
    currentItem3 += 4;
    if(currentItem3 >= boxes.length) {
        loadMoreBtn3.style.display ='none'
    }
    
}


let peliculasBusquedaResultado = []; 

// Función para mostrar las películas que coinciden con la búsqueda
const mostrarResultados = (resultados) => {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; 
    

    resultados.forEach((pelicula) => {
        const peliculaDiv = document.createElement('div');
        peliculaDiv.classList.add('box-1'); 

        const tituloP = document.createElement('p');
        tituloP.textContent = pelicula.Title;
        peliculaDiv.appendChild(tituloP);

        const posterImg = document.createElement('img');
        posterImg.src = pelicula.Poster;
        peliculaDiv.appendChild(posterImg);

        contenedor.appendChild(peliculaDiv);
    });
};

const buscarPeliculas = () => {
    const busqueda = document.getElementById('buscador').value.toLowerCase(); 
    const resultados = peliculas.filter((pelicula) => pelicula.Title.toLowerCase().includes(busqueda));
    mostrarResultados(resultados);
};

document.getElementById('buscador').addEventListener('input', buscarPeliculas);