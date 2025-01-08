// Load saved data from localStorage
let savedData = JSON.parse(localStorage.getItem("userData")) || [];

// Display saved data on page load
window.addEventListener("DOMContentLoaded", () => {
  savedData.forEach((item) => {
    addDataToDOM(item.name, item.age, item.phone);
  });
});

document.getElementById("addButton").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (validateInputs(name, age, phone)) {
    addData(name, age, phone);
    clearInputs();
  }
});

function validateInputs(name, age, phone) {
  clearErrors();
  let isValid = true;

  if (name === "") {
    showError("name", "Name is required");
    isValid = false;
  }

  if (age === "" || isNaN(age) || age <= 0) {
    showError("age", "Please enter a valid age");
    isValid = false;
  }

  if (!/^\d{10}$/.test(phone)) {
    showError("phone", "Phone number must be 10 digits");
    isValid = false;
  }

  return isValid;
}

function showError(inputId, message) {
  const inputElement = document.getElementById(inputId);
  const errorElement = document.createElement("div");
  errorElement.className = "error";
  errorElement.innerText = message;
  inputElement.parentElement.appendChild(errorElement);
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((error) => error.remove());
}

function addData(name, age, phone) {
  addDataToDOM(name, age, phone);
  savedData.push({ name, age, phone });
  localStorage.setItem("userData", JSON.stringify(savedData));
}

function addDataToDOM(name, age, phone) {
  const dataContainer = document.getElementById("dataContainer");
  const dataItem = document.createElement("div");
  dataItem.className = "data-item";

  const contentDiv = document.createElement("div");
  contentDiv.className = "data-item-content";
  contentDiv.innerHTML = `
    <table>
      <tr>
        <td><strong>Name:</strong></td>
        <td>${name}</td>
      </tr>
      <tr>
        <td><strong>Age:</strong></td>
        <td>${age}</td>
      </tr>
      <tr>
        <td><strong>Phone:</strong></td>
        <td>${phone}</td>
      </tr>
    </table>
  `;

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "action-buttons";

  const editButton = document.createElement("button");
  editButton.className = "edit-btn";
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.addEventListener("click", () =>
    editData(dataItem, name, age, phone)
  );

  const removeButton = document.createElement("button");
  removeButton.className = "remove-btn";
  removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  removeButton.addEventListener("click", () => removeData(dataItem, name));

  actionsDiv.appendChild(editButton);
  actionsDiv.appendChild(removeButton);

  dataItem.appendChild(contentDiv);
  dataItem.appendChild(actionsDiv);
  dataContainer.appendChild(dataItem);
}

function editData(dataItem, oldName, oldAge, oldPhone) {
  const name = prompt("Edit Name:", oldName);
  const age = prompt("Edit Age:", oldAge);
  const phone = prompt("Edit Phone Number:", oldPhone);

  if (name && age && /^\d{10}$/.test(phone)) {
    const index = savedData.findIndex((item) => item.name === oldName);
    savedData[index] = { name, age, phone };
    localStorage.setItem("userData", JSON.stringify(savedData));

    dataItem.querySelector(".data-item-content").innerHTML = `
      <table>
        <tr>
          <td><strong>Name:</strong></td>
          <td>${name}</td>
        </tr>
        <tr>
          <td><strong>Age:</strong></td>
          <td>${age}</td>
        </tr>
        <tr>
          <td><strong>Phone:</strong></td>
          <td>${phone}</td>
        </tr>
      </table>
    `;
  } else {
    alert("Invalid input. Please provide valid details.");
  }
}

function removeData(dataItem, name) {
  if (confirm("Are you sure you want to remove this entry?")) {
    savedData = savedData.filter((item) => item.name !== name);
    localStorage.setItem("userData", JSON.stringify(savedData));
    dataItem.remove();
  }
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("phone").value = "";
}
