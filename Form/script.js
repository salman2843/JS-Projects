document.getElementById("addButton").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Validation
  let error = false;
  clearErrors();

  if (name === "") {
    showError("name", "Name is required");
    error = true;
  }

  if (age === "" || isNaN(age) || age <= 0) {
    showError("age", "Please enter a valid age");
    error = true;
  }

  if (!/^\d{10}$/.test(phone)) {
    showError("phone", "Phone number must be 10 digits");
    error = true;
  }

  if (!error) {
    addData(name, age, phone);
    clearInputs();
  }
});

function showError(inputId, message) {
  const inputElement = document.getElementById(inputId);
  const errorElement = document.createElement("div");
  errorElement.className = "error";
  errorElement.innerText = message;
  inputElement.insertAdjacentElement("afterend", errorElement);
}

function clearErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => error.remove());
}

function addData(name, age, phone) {
  const dataContainer = document.getElementById("dataContainer");
  const dataItem = document.createElement("div");
  dataItem.className = "data-item";
  dataItem.innerHTML = `
        <strong>Name:</strong> ${name}<br>
        <strong>Age:</strong> ${age}<br>
        <strong>Phone:</strong> ${phone}
    `;
  dataContainer.appendChild(dataItem);
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("phone").value = "";
}
