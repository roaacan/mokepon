// Buttons
const selectMokeponButton = document.getElementById("select-mokepon-button")
const restartAttackButton = document.getElementById("restart-game-button")

// Sections
const selectAttackSection = document.getElementById("select-attack")
const showResultsSection = document.getElementById("show-results")
const restartGameSection = document.getElementById("restart-game")
const selectMokeponSection = document.getElementById("select-mokepon")
const showPlayerAttacksSection = document.getElementById("show-player-attacks")
const showEnemyAttacksSection = document.getElementById("show-enemy-attacks")
const cardContainer = document.getElementById("card-container")

const showMapSection = document.getElementById("show-game-map")
const map = document.getElementById("game-map")

// Player mokepon
const spanPlayerMokepon = document.getElementById("player-mokepon")
const playerMokeponImg = document.getElementById("player-mokepon-img")
const spanPlayerLives = document.getElementById("player-lives")
const attackButtonsSection = document.getElementById("attack-buttons") 

// Enemy mokepon
const spanEnemyMokepon = document.getElementById("enemy-mokepon")
const spanEnemyLives = document.getElementById("enemy-lives")
const enemyMokeponImg = document.getElementById("enemy-mokepon-img")

// Attack buttons
let fireAttackButton = document.getElementById("fire-attack-button")
let waterAttackButton = document.getElementById("water-attack-button")
let earthAttackButton = document.getElementById("earth-attack-button")


// Inputs
let inputCapipepo
let inputRatigueya
let inputHipodoge
let inputLangostelvis
let inputPydos
let inputTucapalma


// Game Variables 
let mokepons = []
let enemyMokepons = []
let playerVictories = 0
let enemyVictories = 0
let playerAttacks = []
let enemyAttacksAvailable = []
let enemyAttacks = []

let enemyMokepon
let playerMokepon
let attackButtons

let matches = 5

// Game map
let canva = map.getContext("2d") // Draw canva in 2d 
let intervalo
let mapBackground = new Image()
mapBackground.src = "./assets/mokemap.png"

let mapWidth = window.innerWidth - 20
const maxWidthMap  = 350

if (mapWidth > maxWidthMap) {
    mapWidth = maxWidthMap
}

let mapHeight = mapWidth * 600 / 800
map.width = mapWidth
map.height = mapHeight


class Mokepon {
    constructor(name, img, live, element, imgMap, x = 10, y = 10) {
        this.name = name
        this.img = img
        this.live = live
        this.attacks = []
        this.element = element
        this.x = x
        this.y = y
        this.width = 40
        this.height = 40
        this.mokeponMapImage = new Image()
        this.mokeponMapImage.src = imgMap
        this.speedX = 0
        this.speedY = 0
    }

    paintMokepon() {
        canva.drawImage(
            this.mokeponMapImage, 
            this.x, 
            this.y, 
            this.width, 
            this.height
        )
    }
}

// Mokepons for the player
let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "Water", "./assets/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "Earth", "./assets/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "Fire", "./assets/ratigueya.png")
let tucapalma = new Mokepon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.png", 5, "Earth")
let langostelvis = new Mokepon("Langostelvis", "./assets/mokepons_mokepon_langostelvis_attack.png", 5, "Fire",)
let pydos = new Mokepon("Pydos", "./assets/mokepons_mokepon_pydos_attack.png", 5, "Water", "./assets/pydos.png")

hipodoge.attacks.push(
    // Objetos literales
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"},  
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Water", "id": "water-attack-button"} 
)

capipepo.attacks.push(
    // Objetos literales
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"},   
    {"name": "Earth", "id": "earth-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"}
)

ratigueya.attacks.push(
    // Objetos literales
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"},  
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Fire", "id": "fire-attack-button"}
)

tucapalma.attacks.push(
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"},  
    {"name": "Earth", "id": "earth-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"} 
)

langostelvis.attacks.push(
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"},  
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Fire", "id": "fire-attack-button"} 
)

pydos.attacks.push(
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"},  
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Water", "id": "water-attack-button"} 
)




// Mokepons for the enemy 
let hipodogeEnemy = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "Water", "./assets/hipodoge.png", 150, 150)
let capipepoEnemy = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "Earth", "./assets/capipepo.png", 150, 150)
let ratigueyaEnemy = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "Fire", "./assets/ratigueya.png", 150, 150)


hipodogeEnemy.attacks.push(
    // Objetos literales
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"},  
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Water", "id": "water-attack-button"} 
)

capipepoEnemy.attacks.push(
    // Objetos literales
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"},   
    {"name": "Earth", "id": "earth-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"}
)

ratigueyaEnemy.attacks.push(
    // Objetos literales
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Water", "id": "water-attack-button"},
    {"name": "Earth", "id": "earth-attack-button"},  
    {"name": "Fire", "id": "fire-attack-button"},
    {"name": "Fire", "id": "fire-attack-button"}
)





// Add mokepon to the list
mokepons.push(hipodoge, capipepo, ratigueya)
enemyMokepons.push(capipepoEnemy, ratigueyaEnemy, capipepoEnemy)


function startGame() {
    // Hide Sections
    selectAttackSection.style.display = "none"
    showMapSection.style.display = "none"
    showResultsSection.style.display = "none"
    restartGameSection.style.display = "none"
    
    
    // Add mokepon cards into select section
    mokepons.forEach((mokepon) => {
        // Templates literarios
        let mokeponCard = `
        <input id="${mokepon.name.toLowerCase()}" type="radio" name="mokepon" value="${mokepon.name.toLowerCase()}">
        <label class="mokepon-card" for="${mokepon.name.toLowerCase()}">
            <img src="${mokepon.img}" alt="${mokepon.name}">
            <p>${mokepon.name}</p>
        </label>
        `
        cardContainer.innerHTML += mokeponCard
    })

    inputCapipepo = document.getElementById("capipepo")
    inputRatigueya = document.getElementById("ratigueya")
    inputHipodoge = document.getElementById("hipodoge")
    inputLangostelvis = document.getElementById("langostelvis")
    inputPydos = document.getElementById("pydos")
    inputTucapalma = document.getElementById("tucapalma")

    // Select mokepon button event
    selectMokeponButton.addEventListener("click", selectPlayerMokepon) 

    // Restart button event
    restartAttackButton.addEventListener("click", restartGame)
    
}

function selectPlayerMokepon() {
    
    if (inputCapipepo.checked) {
        playerMokepon = capipepo
    } else if (inputRatigueya.checked) {
        playerMokepon = ratigueya
    } else if (inputHipodoge.checked) {
        playerMokepon = hipodoge
    }
   
    spanPlayerMokepon.innerHTML = playerMokepon.name
    playerMokeponImg.src = playerMokepon.img
    playerMokeponImg.alt = playerMokepon.name

    selectEnemyMokepon()
    selectMokeponSection.style.display = "none"

    // Show map and draw
    showMapSection.style.display = "flex"
    startMap()
    //canva.fillRect(50, 50, 100, 100)

}


function selectEnemyMokepon() {
    // Select a random mokepon for the enemy.
    let n = randomNumber(0, mokepons.length - 1)
    enemyMokepon = enemyMokepons[n]

    spanEnemyMokepon.innerHTML = enemyMokepon.name
    enemyMokeponImg.src = enemyMokepon.img
    enemyMokeponImg.alt = enemyMokepon.name

    spanEnemyLives.innerHTML = enemyVictories
    spanPlayerLives.innerHTML = playerVictories

    // Add attack Buttons
    whoIsTheStrongerElement()    
}


function whoIsTheStrongerElement() {
    if (playerMokepon.element == enemyMokepon.element) {
        console.log("Same element")
    } else if (playerMokepon.element == "Fire" && enemyMokepon.element == "Water") {
        enemyMokepon.attacks.push({"name": enemyMokepon.element, "id": `${enemyMokepon.element.toLowerCase()}-attack-button`})
    } else if (playerMokepon.element == "Water" && enemyMokepon.element == "Earth") {
        enemyMokepon.attacks.push({"name": enemyMokepon.element, "id": `${enemyMokepon.element.toLowerCase()}-attack-button`})
    } else if (playerMokepon.element == "Earth"  && enemyMokepon.element == "Fire") {
        enemyMokepon.attacks.push({"name": enemyMokepon.element, "id": `${enemyMokepon.element.toLowerCase()}-attack-button`})
    } else {
        playerMokepon.attacks.push({"name": playerMokepon.element, "id": `${playerMokepon.element.toLowerCase()}-attack-button`})
    }

    addAttackButtons()
}

function addAttackButtons() {
    playerMokepon.attacks.forEach((attack) => {
        let attackButton = `<button id="${attack.id}" class="attack-button">${attack.name}</button>`
        attackButtonsSection.innerHTML += attackButton      
    })

    // Get elements with attack-button class
    attackButtons = document.querySelectorAll(".attack-button")
    sequenceAttackPlayer()
}


function sequenceAttackPlayer(){
    attackButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (e.target.textContent == "Fire") {
                playerAttacks.push(e.target.textContent)
                button.style.background = "#6C48C5"
                button.disabled = true
                selectEnemyAttack()
            } else if (e.target.textContent == "Water") {
                playerAttacks.push(e.target.textContent)
                button.style.background = "#6C48C5"
                button.disabled = true
                selectEnemyAttack()
            } else if (e.target.textContent == "Earth") {
                playerAttacks.push(e.target.textContent)
                button.style.background = "#6C48C5"
                button.disabled = true
                selectEnemyAttack()
            }
        })
    })

    // Attacks available
    getEnemyAttacksAvailable()
}


function getEnemyAttacksAvailable() {
    // Attacks available
    enemyAttacksAvailable = []
    enemyMokepon.attacks.forEach((attack) => {
        enemyAttacksAvailable.push(attack.name)
    })   
}

function selectEnemyAttack() {
    let randomAttack = randomNumber(1, enemyAttacksAvailable.length)
    let attack = enemyAttacksAvailable[randomAttack - 1]
    enemyAttacks.push(attack)
    
    // Delete attack available
    enemyAttacksAvailable.splice(randomAttack - 1, 1)

    // start battle?
    areAllAttacksSelected()
}


function areAllAttacksSelected() {
    if (playerAttacks.length == matches) {
        battle()
    }
}

function battle() {
    for (let index = 0; index < playerAttacks.length; index++)
    {   
        if (playerAttacks[index] == enemyAttacks[index]) {
            showBattleOutcome(index, "orange", "orange")
        } else if (playerAttacks[index] == "Fire" && enemyAttacks[index] == "Water") {
            enemyVictories++
            showBattleOutcome(index, "red", "green")
        } else if (playerAttacks[index] == "Water" && enemyAttacks[index] == "Earth") {
            enemyVictories++
            showBattleOutcome(index, "red", "green")
        } else if (playerAttacks[index] == "Earth"  && enemyAttacks[index] == "Fire") {
            enemyVictories++
            showBattleOutcome(index, "red", "green")
        } else {
            playerVictories++
            showBattleOutcome(index, "green", "red")
        }
    }
    
    // Winner
    updateVictories()
    whoIsTheWinner()
}


function updateVictories() {
    // Update Victories
    spanEnemyLives.innerHTML = enemyVictories
    spanPlayerLives.innerHTML = playerVictories
}

function showBattleOutcome(index, playerColor, enemyColor) {
    let enemyAttack = document.createElement("p")
    let playerAttack = document.createElement("p")
    
    enemyAttack.innerHTML = enemyAttacks[index]
    playerAttack.innerHTML = playerAttacks[index]

    enemyAttack.style.color = enemyColor
    playerAttack.style.color = playerColor

    showPlayerAttacksSection.appendChild(playerAttack)
    showEnemyAttacksSection.appendChild(enemyAttack)
}


function whoIsTheWinner() {
    if (playerVictories > enemyVictories) {
        showFinalOutcome("Player Won")
    } else if (enemyVictories > playerVictories) {
        showFinalOutcome("Enemy Won")
    } else {
        showFinalOutcome ("Draw")
    }
}


function showFinalOutcome(result) {
    showResultsSection.innerHTML = result
    restartGameSection.style.display = "block"
}

function restartGame() {
    location.reload()
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Intercambio
    }
    return array;
  }


// Drawing on the map
function paintCanvas() {
    playerMokepon.x = playerMokepon.x + playerMokepon.speedX
    playerMokepon.y = playerMokepon.y + playerMokepon.speedY
    canva.clearRect(0, 0, map.width, map.height)
    canva.drawImage(mapBackground, 0, 0, map.width,map.height)
    playerMokepon.paintMokepon()
    enemyMokepon.paintMokepon()

    // Check collision only if the user stop
    if (playerMokepon.speedY !== 0 || playerMokepon.speedX !== 0){
        checkCollision(enemyMokepon)
    }

}


function moveUp() {
    playerMokepon.speedY = -5
}

function moveDown() {
    playerMokepon.speedY = 5
}

function moveLeft() {
    playerMokepon.speedX = -5
}
 
function moveRight() {
    playerMokepon.speedX = 5
}

function stopMove() {
    playerMokepon.speedX = 0
    playerMokepon.speedY = 0
}

function keyPressed(e) {
    switch (e.key) {
        case "ArrowUp":
            moveUp()
            break
        case "ArrowDown": 
            moveDown()
            break
        case "ArrowLeft":
            moveLeft()
            break
        case "ArrowRight":
            moveRight()
            break
        default:
            break
    }

}


function startMap() {
    // Draw Map
    intervalo = setInterval(paintCanvas, 50)
    
    //Move with keywords
    window.addEventListener("keydown", keyPressed)
    window.addEventListener("keyup", stopMove)
}


function checkCollision(enemyMokepon) {
    let playerLeft = playerMokepon.x
    let playerRight = playerMokepon.x + playerMokepon.width
    let playerUp = playerMokepon.y
    let playerDown = playerMokepon.y + playerMokepon.height
    let enemyLeft = enemyMokepon.x
    let enemyRight = enemyMokepon.x + enemyMokepon.width
    let enemyUp = enemyMokepon.y
    let enemyDown = enemyMokepon.y + enemyMokepon.height

    if (
        playerUp > enemyDown ||
        playerRight < enemyLeft ||
        playerDown < enemyUp ||
        playerLeft > enemyRight
    ) {
        return
    }

    stopMove()

    clearInterval(intervalo)
    showMapSection.style.display = "none"
    selectAttackSection.style.display = "flex"
    showResultsSection.style.display = "block"
}


window.addEventListener("load", startGame)