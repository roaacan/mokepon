let playerAttack = ""
let enemyAttack = ""
let playerLives = 5
let enemyLives = 5

function startGame() {
    let selectMokeponButton = document.getElementById("select-mokepon-button")
    selectMokeponButton.addEventListener("click", selectPlayerMokepon) 
    
    // Attack Buttons
    let fireAttackButton = document.getElementById("fire-attack-button")
    fireAttackButton.addEventListener("click", fireAttack)
    let waterAttackButton = document.getElementById("water-attack-button")
    waterAttackButton.addEventListener("click", waterAttack)
    let earthAttackButton = document.getElementById("earth-attack-button")
    earthAttackButton.addEventListener("click", earthAttack)

    // Restart button
    let restartAttackButton = document.getElementById("restart-game-button")
    restartAttackButton.addEventListener("click", restartGame)

    // Hide Sections
    let selectAttackSection = document.getElementById("select-attack")
    let showResultsSection = document.getElementById("show-results")
    let restartGameSection = document.getElementById("restart-game")

    selectAttackSection.style.display = "none"
    showResultsSection.style.display = "none"
    restartGameSection.style.display = "none"
}


function selectPlayerMokepon() {
    // Get mokepon selected by the player.
    let capipepo = document.getElementById("capipepo")
    let ratigueya = document.getElementById("ratigueya")
    let hipodoge = document.getElementById("hipodoge")
    let spanPlayerMokepon = document.getElementById("player-mokepon")

    if (capipepo.checked) {
        spanPlayerMokepon.innerHTML = "Capipepo"
    } else if (ratigueya.checked) {
        spanPlayerMokepon.innerHTML = "Ratigueya"
    } else if (hipodoge.checked) {
        spanPlayerMokepon.innerHTML = "Hipodoge"
    }

    // Get Enemy Mokepon    
    selectEnemyMokepon()
}


function selectEnemyMokepon() {
    // Get a random mokepon for the enemy.
    let randomMokepon = randomNumber(1, 3)
    let spanEnemyMokepon = document.getElementById("enemy-mokepon")
    let selectAttackSection = document.getElementById("select-attack")
    let showResultsSection = document.getElementById("show-results")
    let selectMokepoSection = document.getElementById("select-mokepon")
    let spanEnemyLives = document.getElementById("enemy-lives")
    let spanPlayerLives = document.getElementById("player-lives")

    if (randomMokepon == 1) {
        spanEnemyMokepon.innerHTML = "Capipepo"
    } else if (randomMokepon == 2) {
        spanEnemyMokepon.innerHTML = "Ratigueya"
    } else if (randomMokepon == 2) {
        spanEnemyMokepon.innerHTML = "Hipodoge"
    }

    selectMokepoSection.style.display = "none"
    selectAttackSection.style.display = "block"
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
    let spanEnemyLives = document.getElementById("enemy-lives")
    let spanPlayerLives = document.getElementById("player-lives")

    if (playerAttack == enemyAttack) {
        showBattleOutcome("Draw")
    } else if (playerAttack == "FIRE" && enemyAttack == "WATER") {
        playerLives--
        spanPlayerLives.innerHTML = playerLives
        showBattleOutcome("The enemy wins")
    } else if (playerAttack == "WATER" && enemyAttack == "EARTH") {
        playerLives--
        spanPlayerLives.innerHTML = playerLives
        showBattleOutcome("The enemy wins")
    } else if (playerAttack == "EARTH"  && enemyAttack == "FIRE") {
        playerLives--
        spanPlayerLives.innerHTML = playerLives
        showBattleOutcome("The enemy wins")
    } else {
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
        showBattleOutcome("The player wins")
    }

    decideWinner()
}

function showBattleOutcome(result) {
    let showResultsSection = document.getElementById("show-results")
    let paragraph = document.createElement("p")

    paragraph.innerHTML = "The player attacked with " + playerAttack.toLowerCase() + ", the enemy with " + enemyAttack.toLowerCase() + ". " + result +"!"
    showResultsSection.appendChild(paragraph)
}

function decideWinner() {
    if (playerLives <= 0) {
        showFinalOutcome("The enemy won!")
    } else if (enemyLives <= 0) {
        showFinalOutcome("The player won!")
    }

}

function showFinalOutcome(result) {
    let fireAttackButton = document.getElementById("fire-attack-button")
    let waterAttackButton = document.getElementById("water-attack-button")
    let earthAttackButton = document.getElementById("earth-attack-button")
    let restartGameSection = document.getElementById("restart-game")
    let showResultsSection = document.getElementById("show-results")
    let paragraph = document.createElement("p")
    
    paragraph.innerHTML = result
    showResultsSection.appendChild(paragraph)
    fireAttackButton.disabled = true
    waterAttackButton.disabled = true
    earthAttackButton.disabled = true
    restartGameSection.style.display = "block"
}

function restartGame() {
    location.reload()
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


window.addEventListener("load", startGame)