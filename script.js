const words = [
  'desafio',
  'carro',
  'mulher',
  'mouse',
  'alerta',
  'visual',
  'globo',
  'jogo',
]

let actualWord  = ''
let indexGame = 0
let lettersRepeated = []
let flagWin = 0

const wrapperStart = document.querySelector('.wrapper-start')
const wrapperNewWord = document.querySelector('.wrapper-new-word')
const wrapperGame = document.querySelector('.wrapper-game')
const lettersCorrect = document.querySelector('.game-word')
const divErrorOutput = document.querySelector('.case-error')
const rectangles = document.querySelectorAll('.rectangle')

function newWord(event) {
  wrapperStart.style.display = 'none';
  wrapperNewWord.style.display = 'flex';
}

function saveNewWord() {
  const inputNewWord = document.getElementById('new-word').value
  words.push(inputNewWord)
  wrapperNewWord.style.display = 'none'
  newGame()
}

function cancel() {
  wrapperNewWord.style.display = 'none';
  wrapperStart.style.display = 'flex';
}

function gameOver() {
  alert('Game Over...')
  giveUp()
}

function caseError(letter) {
  if (lettersRepeated.includes(letter)) {
    return
  }
  
  lettersRepeated.push(letter)
  divErrorOutput.innerText += letter
  indexGame++  

  if (indexGame > rectangles.length - 1 ) {
    gameOver()
  }
  rectangles[indexGame].style.display = 'flex'
}

function checkWord(keyEvent) {
  let letter = keyEvent.key
  if (!(/^[a-zA-Z]+$/.test(letter)) || letter.length > 1) {
    return
  }

  if (!actualWord.includes(letter)) {
    caseError(letter)
    return
  }

  let spanLetters = document.querySelectorAll('span')
  spanLetters.forEach((spanLetter) => {
    if (spanLetter.innerText === letter) {
      spanLetter.style.color = '#0A3871'
      flagWin++
      if (flagWin === actualWord.length) alert('Você Ganhou!')
    }
  })
}

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function newGame() {
  wrapperStart.style.display = 'none';
  wrapperGame.style.display = 'flex'

  lettersCorrect.innerHTML = ''
  
  actualWord = getWord()

  for (letter of actualWord) {
    let spanLetter = document.createElement('span')
    let spanLetterContent = document.createTextNode(letter)
    spanLetter.style.color = 'transparent'
    spanLetter.appendChild(spanLetterContent)
    lettersCorrect.appendChild(spanLetter)
  }
 
  window.addEventListener('keydown', checkWord) 
}

function giveUp() {
  window.removeEventListener('keydown', checkWord)
  lettersCorrect.innerText = ''
  divErrorOutput.innerText = ''
  indexGame = 0
  actualWord = ''
  lettersRepeated = []
  rectangles.forEach((rectangle) => {
    rectangle.style.display = 'none'
  })
  rectangles[0].style.display = 'flex'

  wrapperGame.style.display = 'none'
  wrapperStart.style.display = 'flex';
}
