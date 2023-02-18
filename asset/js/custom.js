// check item in area calculation card is exist or not
let serial;
let existItem = function () {
    let title;
    let areaCalcCard = document.querySelector(".end-col");

    if (areaCalcCard.querySelectorAll(".table-row").length < 1) {
        title = document.createElement("h5");
        title.className = "text-center";
        title.innerText = "Empty";

        areaCalcCard.querySelector("h2").parentNode.appendChild(title);
        serial = 0;
    } else {
        title = areaCalcCard.querySelector("h5");
        if (title) title.parentNode.removeChild(title);
    }
}

// unit convert from centimeter sq to meter sq
let uniConverter = function (value) {
    let cm = value.parentNode.previousElementSibling.firstElementChild;
    cm.textContent = (cm.textContent * 0.0001).toFixed(4);
    cm.nextElementSibling.textContent = "m";
}

// delete area item from area calculation card
let deleteArea = function (value) {
    let item = value.closest(".table-row");
    item.parentNode.removeChild(item);

    existItem();
}

// multiply of any two numbers
let partialCalc = function (num1, num2) {
    return num1 * num2;
}

// get area from any item
let area = function (name, partialResult) {
    switch (name) {
        case "rectangle":
        case "parallelogram":
            return partialResult;
        case "triangle":
        case "rhombus":
        case "pentagon":
            return 0.5 * partialResult;
        case "ellipse":
            return 3.14 * partialResult;
    }
}

// check area is integer or not
let arLength = function (val) {
    if (Number.isInteger(val)) return val;
    else return val.toFixed(2);
}

// show data in area calculation card
let showData = function (name, num1, num2) {
    let result = partialCalc(num1, num2);
    let areaResult = area(name, result);
    let areaResultLength = arLength(areaResult);

    let areaCalc = document.getElementById("area-calc");
    let tableRow = document.createElement("tr");

    tableRow.className = "table-row";

    tableRow.innerHTML = `
        <td class="capitalize">${++serial}. ${name}</td>
        <td><span>${areaResultLength}</span><span>cm</span><sup>2</sup></td>
        <td class="space-x-1"><button class="btn btn-xs btn-info inline text-white normal-case">Convert to m<sup>2</sup></button><button class="btn btn-xs btn-warning text-white"><i class="bx bx-trash"></i></button></td>
    `;

    tableRow.children[2].firstElementChild.onclick = function () {
        uniConverter(this);
        this.setAttribute("disabled", "true");
    }

    tableRow.children[2].lastElementChild.onclick = function () {
        deleteArea(this);
    }

    areaCalc.appendChild(tableRow);

    existItem();
}

// check correct input value
let inputValidation = function (name, num1, num2) {
    if (num1 === "" || num2 === "") return alert("One or more field required.");
    else if (num1 < 0 || num2 < 0) return alert("Negative value is not supported.");
    else if (isNaN(num1) === true || isNaN(num2) === true) return alert("Only number supported.");

    showData(name, num1, num2);
}

// select & assign function to all calculation button
let btnCalc = document.getElementsByClassName("btn-calc");
for(let btn of btnCalc) {
    btn.addEventListener("click", () => {
        let title = btn.parentNode.firstElementChild.textContent;
        let firstNumber = btn.previousElementSibling.querySelectorAll("input")[0].value;
        let secondNumber = btn.previousElementSibling.querySelectorAll("input")[1].value;

        inputValidation(title, firstNumber, secondNumber);
    });
}

// change item card background color
document.querySelectorAll(".start-col .card").forEach((e) => {
    e.addEventListener("mouseenter", () => {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        e.style.backgroundColor = "#" + randomColor;
    });
});

// call function on window load
onload = function () {
    existItem();
}