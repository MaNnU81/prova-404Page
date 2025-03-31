export default class Giovanni extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

    }
    connectedCallback():void {
        this.styling();
        this.render();
        this.startAnimation();
    }


    styling(): void {
        const style = document.createElement("style");
        style.innerText = `
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 100vh; 
  display: flex;
  align-items: center;  
  overflow: hidden;  /* Evita lo scroll */
}

header {
  position: absolute;
  top: 10px; /* Distanza dal bordo superiore */
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between; /* Distribuisce gli elementi agli estremi */
  padding: 0 20px; /* Spazio ai lati */
  background: rgb(245,255,3);
background: linear-gradient(196deg, rgba(245,255,3,1) 0%, rgba(2,0,36,1) 20%, rgba(245,255,3,1) 40%, rgba(2,0,36,1) 60%, rgba(245,255,3,1) 100%);

  background-size: 200% 100%;
  background-clip: text;
  color: transparent;
  animation: gradient-move 3s linear infinite;
}

@keyframes gradient-move {
  0% {
      background-position: 100% 0; /* Inizia da destra */
  }
  100% {
      background-position: 0 0; /* Termina a sinistra */
  }
}



header h1 {
  margin: 0;
  font-size: 40px; /* Regola la grandezza del testo */
  font-family: "Sixtyfour Convergence", sans-serif;
  font-weight: 400;
  font-style: normal;
text-align: left;
}

footer {
  position: fixed;
  bottom: 10px; /* Distanza dal bordo superiore */
  right: 0%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px; /* Spazio ai lati */
  background: rgb(245,255,3);
background: linear-gradient(196deg, rgba(245,255,3,1) 0%, rgba(2,0,36,1) 20%, rgba(245,255,3,1) 40%, rgba(2,0,36,1) 60%, rgba(245,255,3,1) 100%);

  background-size: 200% 100%;
  background-clip: text;
  color: transparent;
  animation: gradient-move 3s linear infinite;
}

footer h1 {
  margin: 0;
  font-size: 40px; /* Regola la grandezza del testo */
  font-family: "Sixtyfour Convergence", sans-serif;
  font-weight: 400;
  font-style: normal;
text-align: right;
}


.car-left {
  position: absolute;
  width: auto;
  height: 30vh;  /* Altezza dinamica basata sul viewport */
  bottom: 10%;  /* Più spazio per auto su mobile */
  left: -20%;  
  transition: left 8s cubic-bezier(.1, .5, .5, 1);  
}

.car-right {
  position: absolute;
  width: auto;
  height: 30vh;  /* Altezza dinamica basata sul viewport */
  bottom: 50%;  
  right: -55%;  
  transition: right 8s cubic-bezier(.1, .5, .5, 2);
  opacity: 0;  /* Partenza invisibile */
}

@media (max-width: 1000px) {
  .header-main, .footer-main {
    padding: 0 5px;
  }

  body, html {
    height: 100%;
  }

  header h1, footer h1 {
    font-size: 50px;
    text-align: left;
  }

  .car-left, .car-right {
    height: 25vh;
  }

  .car-left {
    bottom: -30px;
    left: -120%;
    transition: left 8s cubic-bezier(.1, .5, .5, 1);
  }

  .car-right {
    bottom: 50%;
    right: -50%;  
    transition: right 8s cubic-bezier(.1, .5, .5, 2);
  }
}
  
    `
        this.shadowRoot!.appendChild(style);
    }

    render(): void {
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('bar')
        mainDiv.innerHTML = `
             <header>
    <h1>-Page Not Found-</h1>
    
  </header>

<main>
  <a href="./#home">
    <img class="car-left" src="./okCar404-Photoroom.png" id="leftCar" alt="Car Left">
  </a>
  <a href="./#home">
    <img class="car-right" src="./okCarTap-Photoroom.png" id="rightCar" alt="Car Right">
  </a>
  
  <footer> 
    
      
      <h1>-Error 404-</h1>
    
  </footer>
</main>
</body>
        `;
        this.shadowRoot!.appendChild(mainDiv);
    }
      

    startAnimation(): void {
        const leftCar = document.getElementById('leftCar') as HTMLElement;
        const rightCar = document.getElementById('rightCar') as HTMLElement;
    
        // Calcola dinamicamente le posizioni in base alla larghezza dello schermo
        const screenWidth = window.innerWidth;
    
        // Posizione finale per la macchina di sinistra (esce completamente)
        const leftCarEndPosition = screenWidth + 500; // Esce completamente dallo schermo
        rightCar.style.right = '-150%';
    
        // Posizione finale per la macchina di destra (si ferma a metà schermo)
        const rightCarEndPosition = (screenWidth / 2 - rightCar.offsetWidth / 2) - 100;
    
        // Avvia l'animazione della macchina di sinistra
        leftCar.style.left = `${leftCarEndPosition}px`; // La macchina attraversa lo schermo ed esce
    
        // Quando la macchina di sinistra esce, parte quella di destra
        setTimeout(() => {
            rightCar.style.right = `${rightCarEndPosition}px`; // Si muove fino a metà schermo
            rightCar.style.opacity = '1'; // Rende l'auto visibile durante l'ingresso
        }, 2000); // Attendi 2 secondi per la partenza dell'auto di destra
    }
    

}
customElements.define("Giovanni-component", Giovanni);