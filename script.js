const produkter =  {
    banan: {
        navn: "Hele bananer",
        pris: "43 Kr",
        bilde: "product_img/banan.jpg",
        beskrivelse: "Hele bananer"
    },

    skruer: {
        navn: "Skru",
        pris: "5 Kr",
        bilde: "product_img/skruer.jpg",
        beskrivelse: "Skruer i rustfritt stål."
    },

    robotstøvsuger: {
        navn: "Robotstøvsuger",
        pris: "4000 Kr",
        bilde: "product_img/robotstøvsuger.jpg",
        beskrivelse: "Støvsuger gulvet helt selv."
    },

    ram: {
        navn: "16 GB DDR5 RAM",
        pris: "15 000 000 Kr",
        bilde: "product_img/ram.jpg",
        beskrivelse: "Raskt RAM med RGB-lys."
    },

    datasenter: {
        navn: "Datasenter",
        pris: "130 000 Kr",
        bilde: "product_img/datasenter.jpg",
        beskrivelse: "Et helt datasenter."
    }
    
}

const id = new URLSearchParams(window.location.search).get("id")

const produkt = produkter[id]

if (produkt) {
    document.title = produkt.navn
    document.getElementById("bilde").src = produkt.bilde
    document.getElementById("bilde").alt = produkt.bilde
    document.getElementById("navn").textContent = produkt.navn
    document.getElementById("pris").textContent = produkt.pris
    document.getElementById("beskrivelse").textContent = produkt.beskrivelse
}
else {
    document.getElementById("produkt-side").innerHTML = "<h1>fant ikke produktet</h1>"
}