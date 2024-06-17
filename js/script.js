const container = document.querySelector(".container")
const qrCodeBtn = document.querySelector("#qr-form button")

const qrCodeInput = document.querySelector("#qr-form input")
const qrCodeFileInput = document.querySelector("#qrCodeFileInput")
const qrCodeFileInputBtn = document.querySelector("#to-sender label")

const qrCodeArea = document.querySelector("#qr-code")

const qrCodeImg = document.querySelector("#qr-code img")

const urlOptionInput = document.querySelector("#urlOptionInput")
const titleOptionInput = document.querySelector("#titleOptionInput")
const backgroudOptionInput = document.querySelector("#backgroudOptionInput")

const fileChose = ""
var jsonArray = []

const toSender = []

// Função

function carregarCSV() {
    var input = document.getElementById("qrCodeFileInput");
    var file = input.files[0];

    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = function (e) {
            var csvContent = e.target.result;
            jsonArray = csvToJSON(csvContent);
            // console.log(jsonArray);
        };

        reader.onerror = function (e) {
            console.log("Erro ao ler o arquivo");
        };
    }
}

function csvToJSON(csvContent) {
    var lines = csvContent.trim().split("\n");
    var result = [];
    var headers = lines[0].split(";");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentLine = lines[i].split(";");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentLine[j].trim();
        }

        result.push(obj);
    }

    return result;
}

function gareneratorQrCode() {
    const titleChecked = titleOptionInput.checked
    const urlChecked = urlOptionInput.checked

    if (!qrCodeInput.value) {
        console.log("Vazio");
    }
    else(
        qrCodeArea.insertAdjacentHTML('beforeend',
            `<article>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInput.value}&bgcolor=ffffff00&format=png" alt="Imagem exemplo" srcset="">
                <p style=display:${urlChecked ? 'block' : 'none'};" class="qr-code-url">${qrCodeInput.value}</p>
            </article>`
        )
    )
    
    
    jsonArray.forEach(Array => {
        // console.log(Array);
        qrCodeArea.insertAdjacentHTML('beforeend',
            `<article>
                <h3 style=display:${titleChecked ? 'block' : 'none'};" class="qr-code-title">${Array.titulo}</h3>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${Array.url}&bgcolor=ffffff00&format=png" alt="Imagem exemplo" srcset="">
                <p style=display:${urlChecked ? 'block' : 'none'};" class="qr-code-url">${Array.url}</p>
            </article>`
        )
    });

    qrCodeBtn.innerText = "Gerando codigo..."

    qrCodeBtn.innerText = "Codigo gerado!"
    setTimeout(() => {
        qrCodeBtn.innerText = "Gerar outro QR Code"
    }, 2000);
}

function convertToArray() {
    
}

// Eventos
qrCodeBtn.addEventListener("click", () => {
    gareneratorQrCode()
})

qrCodeInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        gareneratorQrCode()
    }
})

qrCodeInput.addEventListener("click", () => {
    qrCodeFileInput.value = ""
    jsonArray = []
    qrCodeInput.placeholder = "Digite uma URL ou texto"
    qrCodeFileInputBtn.innerHTML = `<i class="fa-solid fa-file-import"></i>`
})

qrCodeFileInputBtn.addEventListener("click", () => {
    qrCodeFileInput.click();
});

qrCodeFileInput.addEventListener("change", () => {
    if (qrCodeFileInput.files.length > 0) {
        const files = qrCodeFileInput.files;
        for (let i = 0; i < files.length; i++) {
            qrCodeFileInputBtn.innerHTML = `<i class="fa-solid fa-file-csv"></i>`
            let fileChose = files[i].name;
            qrCodeInput.placeholder = fileChose
            qrCodeInput.value = ""
            carregarCSV()
        }
    }
});

backgroudOptionInput.addEventListener("input", () => {
    const qrCodes = document.querySelectorAll("article")

    qrCodes.forEach((qrCode) => {
        qrCode.style.backgroundColor = backgroudOptionInput.value
    })
})
titleOptionInput.addEventListener("change", () => {
    const qrCodeTitles = document.querySelectorAll(".qr-code-title")

    if (titleOptionInput.checked === true) {
        qrCodeTitles.forEach((qrCodeTitle) => {
            qrCodeTitle.style.display = "block"
        })
    }
    else {
        qrCodeTitles.forEach((qrCodeTitle) => {
            qrCodeTitle.style.display = "none"
        })
    }
})
urlOptionInput.addEventListener("change", () => {
    const qrCodeUrls = document.querySelectorAll(".qr-code-url")

    if (urlOptionInput.checked === true) {
        qrCodeUrls.forEach((qrCodeUrl) => {
            qrCodeUrl.style.display = "block"
        })
    }
    else {
        qrCodeUrls.forEach((qrCodeUrl) => {
            qrCodeUrl.style.display = "none"
        })
    }
})