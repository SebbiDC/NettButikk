const produkter = {
    banan: {
        navn: "Hele bananer",
        pris: 43,
        bilde: "product_img/banan.jpg",
        beskrivelse: "4.2 Hele bananer"
    },

    skruer: {
        navn: "Skru",
        pris: 5,
        bilde: "product_img/skruer.jpg",
        beskrivelse: "Skruer i rustfylt stål."
    },

    robotstøvsuger: {
        navn: "Robotstøvsuger",
        pris: 4000,
        bilde: "product_img/robotstøvsuger.jpg",
        beskrivelse: "Lager lyd og hjelper ikke."
    },

    ram: {
        navn: "16 GB DDR5 RAM",
        pris: 15000000,
        bilde: "product_img/ram.jpg",
        beskrivelse: "DDR5 RAM, super tilbud."
    },

    datasenter: {
        navn: "Datasenter",
        pris: 130000,
        bilde: "product_img/datasenter.jpg",
        beskrivelse: "Et helt datasenter. (RAM ikke inkludert)"
    }
}

const id = new URLSearchParams(window.location.search).get("id")
const produkt = produkter[id]

let handlekurv = []

const lagret = localStorage.getItem("handlekurv")
if (lagret !== null) {
    handlekurv = JSON.parse(lagret)
}

function add_kurv() {
    handlekurv.push(id)
    localStorage.setItem("handlekurv", JSON.stringify(handlekurv))
}

function fjern_fra_kurv(index) {
    handlekurv.splice(index, 1)
    localStorage.setItem("handlekurv", JSON.stringify(handlekurv))
    location.reload()
}

function tom_kurv() {
    handlekurv = []
    localStorage.setItem("handlekurv", JSON.stringify(handlekurv))
    document.getElementById("kurv-innhold").innerHTML = ""
    document.getElementById("sum").textContent = "Sum: 0 Kr"
}

const produktSide = document.getElementById("produkt-side")

if (produktSide) {
    if (produkt) {
        document.title = produkt.navn
        document.getElementById("bilde").src = produkt.bilde
        document.getElementById("bilde").alt = produkt.navn
        document.getElementById("navn").textContent = produkt.navn
        document.getElementById("pris").textContent = produkt.pris + " Kr"
        document.getElementById("beskrivelse").textContent = produkt.beskrivelse
    }
    else {
        produktSide.innerHTML = "<h1>fant ikke produktet</h1>"
    }
}





const boks = document.getElementById("kurv-innhold")

if (boks) {
    let sum = 0

    for (let i = 0; i < handlekurv.length; i++) {
        const vare = produkter[handlekurv[i]]

        boks.innerHTML += `
            <div class="kurv-rad">
                <img src="${vare.bilde}" alt="${vare.navn}">
                <span>${vare.navn}</span>
                <span>${vare.pris} Kr</span>
                <button onclick="fjern_fra_kurv(${i})">Fjern</button>
            </div>
            `
        
        sum = sum + vare.pris
    }

    document.getElementById("sum").textContent = "Sum: " + sum + " Kr"
}


const container = document.getElementById("produktContainer");
const sokefelt = document.getElementById("sokefelt");


let alleIder = Object.keys(produkter);

function visProdukter(liste) {

    container.innerHTML = "";

    for (let produktId of liste) {

        let produkt = produkter[produktId];

        container.innerHTML += `
            <a class="product" href="product.html?id=${produktId}">
                <img src="${produkt.bilde}" alt="${produkt.navn}">
                <h3>${produkt.navn}</h3>
                <h2>${produkt.pris} Kr</h2>
            </a>
        `;
    }
}

if (container && sokefelt) {

    visProdukter(alleIder);

    sokefelt.addEventListener("input", () => {

        let sok = sokefelt.value.toLowerCase();

        let resultat = alleIder.filter(produktId =>
            produkter[produktId].navn.toLowerCase().includes(sok)
        );

        if (resultat.length === 0) {
            container.innerHTML = "<p>Ingen produkter funnet.</p>";
        } else {
            visProdukter(resultat);
        }
    });
}