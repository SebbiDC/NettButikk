const produkter = {
    banan: {
        navn: "Hele bananer",
        pris: 43,
        tag: "mat",
        bilde: "product_img/banan.jpg",
        beskrivelse: "4.2 Hele bananer"
    },

    skruer: {
        navn: "Skru",
        pris: 5,
        tag: "værtøy",
        bilde: "product_img/skruer.jpg",
        beskrivelse: "Skruer i rustfylt stål."
    },

    robotstøvsuger: {
        navn: "Robotstøvsuger",
        pris: 4000,
        tag: "teknologi",
        bilde: "product_img/robotstøvsuger.jpg",
        beskrivelse: "Lager lyd og hjelper ikke."
    },

    ram: {
        navn: "16 GB DDR5 RAM",
        pris: 15000000,
        tag: "teknologi",
        bilde: "product_img/ram.jpg",
        beskrivelse: "DDR5 RAM 2GB 8X, super tilbud."
    },

    datasenter: {
        navn: "Datasenter",
        pris: 130000,
        tag: "infastruktur",
        bilde: "product_img/datasenter.jpg",
        beskrivelse: "Et helt datasenter. (RAM ikke inkludert)"
    },
    hammer: {
        navn: "Hammer",
        pris: 149,
        tag: "verktøy",
        bilde: "product_img/hammer.jpg",
        beskrivelse: "Løser de fleste problemer. Skaper noen nye."
    },

    skrutrekker: {
        navn: "Skrutrekker",
        pris: 89,
        tag: "verktøy",
        bilde: "product_img/skrutrekker.jpg",
        beskrivelse: "Passer til alle skruer unntatt den du trenger."
    },

    smarthøyttaler: {
        navn: "Smarthøyttaler",
        pris: 1200,
        tag: "teknologi",
        bilde: "product_img/smarthoyttaler.jpg",
        beskrivelse: "Lytter alltid. Forstår sjelden."
    },

    musematte: {
        navn: "RGB-musematte",
        pris: 499,
        tag: "teknologi",
        bilde: "product_img/musematte.jpg",
        beskrivelse: "Lyser i alle farger. Gjør deg ikke bedre i spill."
    },

    server: {
        navn: "Serverskap",
        pris: 45000,
        tag: "infrastruktur",
        bilde: "product_img/server.jpg",
        beskrivelse: "Varmer opp rommet gratis. Støyer også gratis."
    },

    nettverkskabel: {
        navn: "Nettverkskabel 100 m",
        pris: 350,
        tag: "infrastruktur",
        bilde: "product_img/kabel.jpg",
        beskrivelse: "Garantert floket ved levering."
    },

    knekkebrod: {
        navn: "Knekkebrød",
        pris: 35,
        tag: "mat",
        bilde: "product_img/knekkebrod.jpg",
        beskrivelse: "Knasende godt. Knasende høyt."
    },

    kaffe: {
        navn: "Kaffe 1 kg",
        pris: 129,
        tag: "mat",
        bilde: "product_img/kaffe.jpg",
        beskrivelse: "Drivstoff for utviklere."
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

const filterKnapper = document.querySelectorAll(".filterKnapp")

filterKnapper.forEach(knapp => {
    knapp.addEventListener("click", () => {
        let tag = knapp.dataset.tag

        if (tag === "alle") {
            visProdukter(alleIder)
        }
        else {
            let filtereteIder = alleIder.filter(
                produktId => produkter[produktId].tag === tag
            )
            visProdukter(filtereteIder)
        }   
    })
})