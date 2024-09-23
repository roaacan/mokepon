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
    let playerMokeponImg = document.getElementById("player-mokepon-img")


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

    // Get Enemy Mokepon    
    selectEnemyMokepon()
}


function selectEnemyMokepon() {
    // Get a random mokepon for the enemy.
    let randomMokepon = randomNumber(1, 3)
    let spanEnemyMokepon = document.getElementById("enemy-mokepon")
    let selectAttackSection = document.getElementById("select-attack")
    let showResultsSection = document.getElementById("show-results")
    let selectMokeponSection = document.getElementById("select-mokepon")
    let spanEnemyLives = document.getElementById("enemy-lives")
    let spanPlayerLives = document.getElementById("player-lives")
    let enemyMokeponImg = document.getElementById("enemy-mokepon-img")

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
    let spanEnemyLives = document.getElementById("enemy-lives")
    let spanPlayerLives = document.getElementById("player-lives")

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
    let showResultsSection = document.getElementById("show-results")
    let showPlayerAttacksSection = document.getElementById("show-player-attacks")
    let showEnemyAttacksSection = document.getElementById("show-enemy-attacks")
    
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
    let fireAttackButton = document.getElementById("fire-attack-button")
    let waterAttackButton = document.getElementById("water-attack-button")
    let earthAttackButton = document.getElementById("earth-attack-button")
    let restartGameSection = document.getElementById("restart-game")
    let showResultsSection = document.getElementById("show-results")

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