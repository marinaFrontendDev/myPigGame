var currentScore, totalScores, activePlayer, dice, winningScore;

function initGame() {
    totalScores = [0,0];
    activePlayer = 0;
    currentScore = 0;
    currentScores = [];
    playing = true;

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.user-score').value = '';
    document.querySelector('.user-score').placeholder = 'Set the winning score';

    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');

    firstDice = document.querySelector('.first_dice');
    secondDice = document.querySelector('.second_dice');
    firstDice.style.display = 'none';
    secondDice.style.display = 'none';
}

function nextPlayer() {
    currentScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (playing) {
        var firstNum = Math.floor(Math.random() * 6) + 1;
        var secondNum = Math.floor(Math.random() * 6) + 1;

        firstDice.style.display = 'block';
        secondDice.style.display = 'block';

        firstDice.src = 'img/dice-' + firstNum + '.png';
        secondDice.src = 'img/dice-' + secondNum + '.png';

        if (firstNum === 1 || secondNum === 1) {
            nextPlayer();
        // } else if (firstNum == 6 && secondNum == 6) {
        //     nextPlayer();
        } else {
            currentScore += firstNum + secondNum;
            document.querySelector('#current-' + activePlayer).textContent = currentScore;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (playing) {
        totalScores[activePlayer] += currentScore;
        document.querySelector('#score-' + activePlayer).textContent = totalScores[activePlayer];

        var userScore = document.querySelector('.user-score').value;
        var winningScore;

        if(userScore) {
            winningScore = userScore;
        } else {
            winningScore = 100;
        }

        if (totalScores[activePlayer] >= winningScore) {
            playing = false;
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', function() {
    initGame();
});
