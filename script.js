// script.js

const mario = document.getElementById('mario');
const block = document.getElementById('block');

let marioPositionX = 0;
let marioPositionY = 0;
let gravity = 0;
let isJumping = false;

// Mover a Mario con las teclas de flecha
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        moveRight();
    } else if (event.key === 'ArrowLeft') {
        moveLeft();
    } else if (event.key === ' ') {
        jump();
    }
});

function moveRight() {
    marioPositionX += 5;
    mario.style.transform = `translateX(${marioPositionX}px)`;
}

function moveLeft() {
    marioPositionX -= 5;
    mario.style.transform = `translateX(${marioPositionX}px)`;
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        gravity = -10;
        marioPositionY = 100; // altura máxima del salto
        let jumpInterval = setInterval(() => {
            marioPositionY += gravity;
            mario.style.bottom = `${50 + marioPositionY}px`;
            
            // Si Mario vuelve al suelo
            if (marioPositionY <= 0) {
                clearInterval(jumpInterval);
                mario.style.bottom = '50px';
                isJumping = false;
            }

            // Simular gravedad
            if (marioPositionY > 0) {
                gravity += 1; // La gravedad hará que Mario caiga
            }
        }, 20);
    }
}

// Detección de colisiones (simplificada)
function checkCollision() {
    const marioRect = mario.getBoundingClientRect();
    const blockRect = block.getBoundingClientRect();

    if (
        marioRect.right > blockRect.left &&
        marioRect.left < blockRect.right &&
        marioRect.bottom > blockRect.top &&
        marioRect.top < blockRect.bottom
    ) {
        alert('¡Has chocado con el bloque!');
        marioPositionX = 0; // Reiniciar la posición de Mario
        mario.style.transform = `translateX(${marioPositionX}px)`;
    }
}

setInterval(checkCollision, 50);
