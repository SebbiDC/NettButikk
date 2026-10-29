const produkter = {
    banan: {
        navn: "Hele bananer",
        pris: 43,
        bilde: "product_img/banan.jpg",
        beskrivelse: "Hele bananer"
    },

    skruer: {
        navn: "Skru",
        pris: 5,
        bilde: "product_img/skruer.jpg",
        beskrivelse: "Skruer i rustfritt stål."
    },

    robotstøvsuger: {
        navn: "Robotstøvsuger",
        pris: 4000,
        bilde: "product_img/robotstøvsuger.jpg",
        beskrivelse: "Støvsuger gulvet helt selv."
    },

    ram: {
        navn: "16 GB DDR5 RAM",
        pris: 15000000,
        bilde: "product_img/ram.jpg",
        beskrivelse: "Raskt RAM med RGB-lys."
    },

    datasenter: {
        navn: "Datasenter",
        pris: 130000,
        bilde: "product_img/datasenter.jpg",
        beskrivelse: "Et helt datasenter."
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
    console.log(handlekurv)
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


