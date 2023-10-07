const game = () => {
    let playerScore = 0;
    let computerScore = 0;

    const rollNumber = (arr) => {
        let num = Math.floor(Math.random() * arr.length);
        return num;        
    };

    const startGame = () => {
        const startBtn = document.querySelector('.intro button');
        const intro = document.querySelector('.intro');
        const match = document.querySelector('.match');

        startBtn.addEventListener('click', function(){
            intro.classList.add('fadeOut');
            match.classList.remove('fadeOut');
            match.classList.add('fadeIn');
        });
    };

    const updateScore = () => {
        const pScore = document.querySelector('.score__player p');
        const cScore = document.querySelector('.score__computer p');

        pScore.textContent = playerScore;
        cScore.textContent = computerScore;
    };

    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.hands__player');
        const computerHand = document.querySelector('.hands__computer');
        const hands = document.querySelectorAll('.hands img');

        hands.forEach(hand => {
            hand.addEventListener('animationend', function(){
                this.style.animation = '';                
            });
        });

        const computerOptions = ['rock', 'paper', 'scissors'];  
        
        options.forEach(option => {
            option.addEventListener('click', function(){
                hands.forEach(hand => {
                    hand.src = './img/rock.png';
                });
                const computerChoice = computerOptions[rollNumber(computerOptions)];
                
                setTimeout(()=>{
                    comparison(this.textContent, computerChoice);
                    // Изменение картинки в соответствии с выбором
                    let btnText = this.textContent;                
                    playerHand.src = './img/' + btnText + '.png';
                    computerHand.src = './img/' + computerChoice + '.png';
                    } , 2000);
                
                

                playerHand.style.animation = 'shakePlayer 2s ease';
                computerHand.style.animation = 'shakeComputer 2s ease'
            });
        });
    };
    
    const comparison = (playerChoice, computerChoice) => {
        const winner = document.querySelector('.winner');

        const computerResult = () => {
            winner.textContent = 'Компьютер победил';
            computerScore++;
            updateScore();
            return;
        };
    
        const playerResult = () => {
            winner.textContent = 'Игрок победил';
            playerScore++;
            updateScore();
            return;
        };


        if (playerChoice === computerChoice) {
            winner.textContent = 'Ничья';
            return;
        }

        if (playerChoice === 'rock') {
            if (computerChoice === 'paper') {
                computerResult(); 
            } else {
                playerResult();
            }            
        }

        if (playerChoice === 'paper') {
            if (computerChoice === 'scissors') {
                computerResult();
            } else {
                playerResult();
            }            
        }

        if (playerChoice === 'scissors') {
            if (computerChoice === 'rock') {
                computerResult();
            } else {
                playerResult();
            }            
        }

    };

    startGame();    
    playMatch();
}

game();