// Buttons
const selectMokeponButton = document.getElementById("select-mokepon-button")
const fireAttackButton = document.getElementById("fire-attack-button")
const waterAttackButton = document.getElementById("water-attack-button")
const earthAttackButton = document.getElementById("earth-attack-button")
const restartAttackButton = document.getElementById("restart-game-button")

// Sections
const selectAttackSection = document.getElementById("select-attack")
const showResultsSection = document.getElementById("show-results")
const restartGameSection = document.getElementById("restart-game")
const selectMokeponSection = document.getElementById("select-mokepon")
const showPlayerAttacksSection = document.getElementById("show-player-attacks")
const showEnemyAttacksSection = document.getElementById("show-enemy-attacks")

// Player mokepon
const capipepo = document.getElementById("capipepo")
const ratigueya = document.getElementById("ratigueya")
const hipodoge = document.getElementById("hipodoge")
const spanPlayerMokepon = document.getElementById("player-mokepon")
const playerMokeponImg = document.getElementById("player-mokepon-img")
const spanPlayerLives = document.getElementById("player-lives")

// Enemy mokepon
const spanEnemyMokepon = document.getElementById("enemy-mokepon")
const spanEnemyLives = document.getElementById("enemy-lives")
const enemyMokeponImg = document.getElementById("enemy-mokepon-img")


// Game Variables Global
let playerAttack
let enemyAttack
let playerLives = 5
let enemyLives = 5


function startGame() {
    // Select mokepon button event
    selectMokeponButton.addEventListener("click", selectPlayerMokepon) 
    
    // Attack buttons event
    fireAttackButton.addEventListener("click", fireAttack)
    waterAttackButton.addEventListener("click", waterAttack)
    earthAttackButton.addEventListener("click", earthAttack)

    // Restart button event
    restartAttackButton.addEventListener("click", restartGame)
    
    // Hide Sections
    selectAttackSection.style.display = "none"
    showResultsSection.style.display = "none"
    restartGameSection.style.display = "none"
}

function selectPlayerMokepon() {
    if (capipepo.checked) {
        spanPlayerMokepon.innerHTML = "Capipepo"
        playerMokeponImg.src = "./assets/mokepons_mokepon_capipepo_attack.png"
        playerMokeponImg.alt = "Capipepo"
    } else if (ratigueya.checked) {
        spanPlayerMokepon.innerHTML = "Ratigueya"
        playerMokeponImg.src = "./assets/mokepons_mokepon_ratigueya_attack.png"
        playerMokeponImg.alt = "Ratigueya"
    } else if (hipodoge.checked) {
        spanPlayerMokepon.innerHTML = "Hipodoge"
        playerMokeponImg.src = "./assets/mokepons_mokepon_hipodoge_attack.png"
        playerMokeponImg.alt = "Hipodoge"
    }

    // Select Enemy Mokepon    
    selectEnemyMokepon()
}


function selectEnemyMokepon() {
    // Select a random mokepon for the enemy.
    let randomMokepon = randomNumber(1, 3)

    if (randomMokepon == 1) {
        spanEnemyMokepon.innerHTML = "Capipepo"
        enemyMokeponImg.src = "./assets/mokepons_mokepon_capipepo_attack.png"
        enemyMokeponImg.alt = "Capipepo"
    } else if (randomMokepon == 2) {
        spanEnemyMokepon.innerHTML = "Ratigueya"
        enemyMokeponImg.src = "./assets/mokepons_mokepon_ratigueya_attack.png"
        enemyMokeponImg.alt = "Ratigueya"
    } else if (randomMokepon == 3) {
        spanEnemyMokepon.innerHTML = "Hipodoge"
        enemyMokeponImg.src = "./assets/mokepons_mokepon_hipodoge_attack.png"
        enemyMokeponImg.alt = "Hipodoge"
    }

    selectMokeponSection.style.display = "none"
    selectAttackSection.style.display = "flex"
    showResultsSection.style.display = "block"

    spanEnemyLives.innerHTML = enemyLives
    spanPlayerLives.innerHTML = playerLives 
}


function fireAttack() {
    playerAttack = "FIRE"
    selectEnemyAttack()
}


function waterAttack() {
    playerAttack = "WATER"
    selectEnemyAttack()
}


function earthAttack() {
    playerAttack = "EARTH"
    selectEnemyAttack()
}

function selectEnemyAttack() {
    let randomEnemyAttack = randomNumber(1, 3)

    if (randomEnemyAttack == 1) {
        enemyAttack = "FIRE"
    } else if (randomEnemyAttack == 2) {
        enemyAttack = "WATER"
    } else if (randomEnemyAttack == 3) {
        enemyAttack = "EARTH"
    }

    battle()
}


function battle() {
    if (playerAttack == enemyAttack) {
        showBattleOutcome("Draw", "orange", "orange")
    } else if (playerAttack == "FIRE" && enemyAttack == "WATER") {
        playerLives--
        spanPlayerLives.innerHTML = playerLives
        showBattleOutcome("The Enemy Wins", "red", "green")
    } else if (playerAttack == "WATER" && enemyAttack == "EARTH") {
        playerLives--
        spanPlayerLives.innerHTML = playerLives
        showBattleOutcome("The Enemy Wins", "red", "green")
    } else if (playerAttack == "EARTH"  && enemyAttack == "FIRE") {
        playerLives--
        spanPlayerLives.innerHTML = playerLives
        showBattleOutcome("The Enemy Wins", "red", "green")
    } else {
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
        showBattleOutcome("The Player Wins", "green", "red")
    }

    decideWinner()
}


function showBattleOutcome(result, colorPlayer, ColorEnemy) {
    
    let paragraphEnemy = document.createElement("p")
    paragraphEnemy.style.color = ColorEnemy
    let paragraphPlayer = document.createElement("p")
    paragraphPlayer.style.color = colorPlayer

    showResultsSection.innerHTML = result
    paragraphPlayer.innerHTML = playerAttack
    paragraphEnemy.innerHTML = enemyAttack

    showPlayerAttacksSection.appendChild(paragraphPlayer)
    showEnemyAttacksSection.appendChild(paragraphEnemy)
}


function decideWinner() {
    if (playerLives <= 0) {
        showFinalOutcome("The Enemy Won!")
    } else if (enemyLives <= 0) {
        showFinalOutcome("The Player Won!")
    }

}


function showFinalOutcome(result) {
    showResultsSection.innerHTML = result
    fireAttackButton.disabled = true
    fireAttackButton.style.backgroundColor = "#6C48C5"
    waterAttackButton.disabled = true
    waterAttackButton.style.backgroundColor= "#6C48C5"
    earthAttackButton.disabled = true
    earthAttackButton.style.backgroundColor = "#6C48C5"
    restartGameSection.style.display = "block"
}

function restartGame() {
    location.reload()
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


window.addEventListener("load", startGame)