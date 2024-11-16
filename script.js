class Usuario {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class Juego {
    constructor() {
        this.usuarios = [];
        this.usuarioActual = null;
    }

    registrarUsuario(username, password) {
        const usuario = new Usuario(username, password);
        this.usuarios.push(usuario);
        alert('Usuario registrado con éxito!');
        this.toggleForms();
    }

    iniciarSesion(username, password) {
        const usuario = this.usuarios.find(user => user.username === username && user.password === password);
        if (usuario) {
            this.usuarioActual = usuario;
            this.mostrarJuego();
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    }

    mostrarJuego() {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        document.getElementById('playerName').innerText = this.usuarioActual.username;
    }

    jugar(opcionJugador) {
        const opciones = ['piedra', 'papel', 'tijeras', 'lagarto', 'spock'];
        const opcionMaquina = opciones[Math.floor(Math.random() * 5)];
        let resultado = '';

        if (opcionJugador === opcionMaquina) {
            resultado = 'Empate!';
        } else if (
            (opcionJugador === 'piedra' && (opcionMaquina === 'tijeras' || opcionMaquina === 'lagarto')) ||
            (opcionJugador === 'papel' && (opcionMaquina === 'piedra' || opcionMaquina === 'spock')) ||
            (opcionJugador === 'tijeras' && (opcionMaquina === 'papel' || opcionMaquina === 'lagarto')) ||
            (opcionJugador === 'lagarto' && (opcionMaquina === 'papel' || opcionMaquina === 'spock')) ||
            (opcionJugador === 'spock' && (opcionMaquina === 'piedra' || opcionMaquina === 'tijeras'))
        ) {
            resultado = 'Ganaste!';
        } else {
            resultado = 'Perdiste!';
        }

        const emojis = {
            piedra: '✊',
            papel: '✋',
            tijeras: '✌',
            lagarto: '🦎',
            spock: '🖖'
        };

        document.getElementById('result').innerText = `${emojis[opcionJugador]} vs ${emojis[opcionMaquina]} -> ${resultado}`;
    }

    toggleForms() {
        const loginForm = document.getElementById('login');
        const registerForm = document.getElementById('register');
        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        }
    }
}

const juego = new Juego();

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    juego.registrarUsuario(username, password);
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    juego.iniciarSesion(username, password);
});

function play(opcion) {
    juego.jugar(opcion);
}

function toggleForms() {
    juego.toggleForms();
}
