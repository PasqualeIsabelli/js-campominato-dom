/* Eserczio: Campo Minato Dom
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/


// VARIABILI (richiamano i dati inseriti nell'HTML)
const squareNumbersSelect = document.querySelector("[name='squareNumbers']");
const btnStart = document.getElementById("btn-start");

const gridContainer = document.querySelector(".grid-container");


// SCATENO UN EVENTO AL CLICK
btnStart.addEventListener("click", function () {
  gridContainer.innerHTML = "";
  // Prendo il valore inserito nella select e lo salvo in una variabile
  const squareNumbers = squareNumbersSelect.value;
  // Stampo il valore della select per vedere se funziona
  //console.log(squareNumbers);

  // INVOCO LA FUNZIONE: Genero la griglia al click inserendogli il numero di quadrati che seleziona l'utente (valore preso tramite variabile)
  const gridSize = createGrid(squareNumbers);
  // Stampo il risultato per vedere se funziona
  //console.log(gridSize);

  //INVOCO LA FUNZIONE: Aggiunge all'HTML i quadrati
  printGrid(gridContainer, gridSize);
  // INVOCO LA FUNZIONE: Array delle bombe
  generateBombs(squareNumbers);

});


// FUNZIONE (Genero i quadrati della griglia)
function createSquare(squareContent, squareNumbers) {
  // Uso il createElement per creare i div che saranno i quadrati
  const square = document.createElement("div");

  // Calcolo il numero di quadrati per riga
  const squareRow = Math.sqrt(squareNumbers);

  // Aggiungo classe e contenuto all'elemento
  square.classList.add("grid-square", "d-flex", "align-items-center", "justify-content-center", "border", "border-dark");
  square.innerHTML = squareContent;
  // Calcolo il numero di quadrati da inserire
  square.style.flexBasis = `calc(100% / ${squareRow})`

  // Scateno un evento al click (calbio colore al quadrato al click)
  square.addEventListener("click", function () {
    // Aggiungo la classe bg-primary al posto di quella che c'è già
    square.classList.toggle("bg-primary");
  })

  // Ritorno il valore di square
  return square;
}


// FUNZIONE (Genero la griglia contenente i quadrati)
function createGrid(squareNumber) {
  // Creo un array dove mettere i quadrati all'interno
  const grid = [];

  // CICLO FOR (sistemazione dei quadrati)
  for (i = 1; i <= squareNumber; i++) {
    // Salvo l'output di questa funzione in una variabile
    const newSquare = createSquare(i, squareNumber);
    // Pusho il risultato nell'array
    grid.push(newSquare);
  }
  // Ritorno il valore di grid
  return grid;
}


// FUNZIONE (Stampo la griglia all'interno dell'HTML)
function printGrid(container, squareSize) {
  for (let i = 0; i < squareSize.length; i++) {
    container.append(squareSize[i]);
  }
}

// FUNZIONE (Genero le 16 bombe)  // Sistemare... genera una quantità diversa di elementi all'interno dell'array
function generateBombs(squareNumbers) {
  // Creo un array vuoto per le bombe
  let arrayBomb = [];
  // Creo ciclo for per generare le 16 bombe
  for (let i = 1; i <= 16; i++) {
    // Salvo il valore in una costante
    const bomb = Math.floor(Math.random() * squareNumbers) + 1;
    // Tramite un IF evito che i numeri delle bombe si ripetono
    if (arrayBomb.indexOf(bomb) === -1) {
      // Pusho le bombe random dentro l'array
      arrayBomb.push(bomb);
    }
  }
console.log(arrayBomb);
return arrayBomb;
}

