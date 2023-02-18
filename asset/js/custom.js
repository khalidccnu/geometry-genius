// unit convert from centimeter sq to meter sq
let uniConverter = function (value) {
    let cm = value.parentNode.previousElementSibling.firstElementChild;
    cm.textContent = (cm.textContent * 0.0001).toFixed(4);
    cm.nextElementSibling.textContent = "m";
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

// show data in area calculation box
let serial = 0;
let showData = function (name, num1, num2) {
    let result = partialCalc(num1, num2);
    let areaResult = area(name, result);
    let areaResultLength = arLength(areaResult);

    let areaCalc = document.getElementById("area-calc");
    let tableRow = document.createElement("tr");
    serial++;

    tableRow.innerHTML = `
        <td class="capitalize">${serial} ${name}</td>
        <td><span>${areaResultLength}</span><span>cm</span><sup>2</sup></td>
        <td><button class="btn btn-xs btn-info inline text-white normal-case">Convert to m<sup>2</sup></button></td>
    `;

    tableRow.children[2].firstElementChild.onclick = function () {
        uniConverter(this);
        this.setAttribute("disabled", "true");
    }

    areaCalc.appendChild(tableRow);
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

document.querySelectorAll(".card").forEach((e) => {
    e.addEventListener("mouseenter", function () {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        this.style.backgroundColor = "#" + randomColor;
    });
});