var data = {};
var xhr = new XMLHttpRequest();
var requestUrl = "https://fakestoreapi.com/products";
var tbody = document.getElementById("tableBodyData");
var btnRemove = document.getElementById("btnRemove");
var btnLoad = document.getElementById("btnLoad");
var btnSearch = document.getElementById("btnSearch");
var inputSearch = document.getElementById("inputSearch");

btnRemove.addEventListener("click", function (e) {
    tbody.innerHTML = "";
});

function genTr(json) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    td1.innerText = json.id;
    td2.innerText = json.title;
    td3.innerText = json.price;
    td4.innerText = json.description;
    td5.innerText = json.category;
    tr.append(td1, td2, td3, td4, td5);
    return tr;
}

function renderRows(array) {
    tbody.innerHTML = "";
    array.forEach(element => {
        console.log(element);
        tbody.append(genTr(element));
    });
}

// consumir api
function getData() {
    xhr.open("GET", requestUrl, true);
    xhr.onload = function () {
        console.log(xhr.responseText);
        // Handle data
        const array = JSON.parse(xhr.responseText);
        data.json = array;
        renderRows(array);
    };
    xhr.send();
}

btnLoad.addEventListener("click", function () {
    getData();
});

btnSearch.addEventListener("click", function (e) {
    e.preventDefault();
    if (!Array.isArray(data.json)) {
        return;
    }
    const query = inputSearch.value.trim().toLowerCase();
    const filtered = data.json.filter(function (item) {
        return item.title.toLowerCase().includes(query);
    });
    console.log(filtered);
    renderRows(filtered);
});

getData();
