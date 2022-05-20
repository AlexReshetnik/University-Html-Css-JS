window.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#home").onclick = ()=>{location.reload()}
    document.querySelector("#catalog").onclick = loadCatalog
    loadCatalog()
   
});

function GET(URI, ContentTypy) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('GET', URI, true);
        // request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        // request.setRequestHeader('Accept', 'application/json');
        request.send();
        request.addEventListener('readystatechange', function () {
            if (request.readyState === 4 && request.status === 200) {
                if (ContentTypy == "text") {
                    resolve(request.response)
                }
                if (ContentTypy == "json") {
                    resolve(JSON.parse(request.response))
                }
            } 
        });
    })
}

function insertProperty(string, propName, PropValue) {
    return string.replace(new RegExp("{{" + propName + "}}"), PropValue)
}

let Categories
function loadCatalog() {
    GET("сatalogItem.html", "text").then(сatalogItem => {
        GET("db/categories.json", "json").then(categories => {
            Categories = categories
            let date = ""
            categories.forEach(it => {
                let text = сatalogItem
                Object.keys(it).forEach(nameP => { text = insertProperty(text, nameP, it[nameP]) })
                date += text
            });
            date += `<h1><a href="#"onclick="goToCategory('Specials')">Specials</a></h1>`
            document.querySelector("#insertCategories").innerHTML = date
            document.querySelector("legend").innerHTML = "«Categories»"
        })
    })
}

function goToCategory(category) {
    if (category == "Specials") {
        category = Categories[getRandomArbitrary(0, Categories.length - 1)].shortnameCategory 
    }
    loadCategorie(category)
}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function loadCategorie(categoryName) {
    GET("category.html", "text").then(category => {
        GET(`db/imgs/${categoryName}/${categoryName}.json`, "json").then(tovars => {
            let date = ""
            tovars.forEach(it => {
                let text = category
                Object.keys(it).forEach(nameP => {
                    text = insertProperty(text, nameP, it[nameP])
                })
                text = insertProperty(text, "shortnameCategory", categoryName)
                date += text
            });
            document.querySelector("#insertCategories").innerHTML = date
            document.querySelector("legend").innerHTML = `«${Categories[Categories.findIndex(i=>i.shortnameCategory ==categoryName)].name}»`
        })
    })
}
