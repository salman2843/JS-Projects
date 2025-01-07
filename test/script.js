document.getElementById("addButton").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Validation
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
  errorElement.style.color = "red";
  errorElement.innerText = message;
  inputElement.insertAdjacentElement("afterend", errorElement);
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((error) => error.remove());
}

function addData(name, age, phone) {
  const dataContainer = document.getElementById("dataContainer");
  const dataItem = document.createElement("div");
  dataItem.className = "data-item";

  // Content Section
  const contentDiv = document.createElement("div");
  contentDiv.className = "data-item-content";
  contentDiv.innerHTML = `
      <div><strong>Name:</strong> ${name}</div>
      <div><strong>Age:</strong> ${age}</div>
      <div><strong>Phone Number:</strong> ${phone}</div>
    `;

  // Action Buttons
  const actionsDiv = document.createElement("div");
  actionsDiv.className = "action-buttons";

  const editButton = document.createElement("button");
  editButton.className = "edit-btn";
  editButton.innerText = "Edit";
  editButton.addEventListener("click", () =>
    editData(dataItem, name, age, phone)
  );

  const removeButton = document.createElement("button");
  removeButton.className = "remove-btn";
  removeButton.innerText = "Remove";
  removeButton.addEventListener("click", () => removeData(dataItem));

  actionsDiv.appendChild(editButton);
  actionsDiv.appendChild(removeButton);

  // Append to data item
  dataItem.appendChild(contentDiv);
  dataItem.appendChild(actionsDiv);

  dataContainer.appendChild(dataItem);
}

function editData(dataItem, oldName, oldAge, oldPhone) {
  const name = prompt("Edit Name:", oldName);
  const age = prompt("Edit Age:", oldAge);
  const phone = prompt("Edit Phone Number:", oldPhone);

  if (name && age && /^\d{10}$/.test(phone)) {
    dataItem.querySelector(".data-item-content").innerHTML = `
        <div><strong>Name:</strong> ${name}</div>
        <div><strong>Age:</strong> ${age}</div>
        <div><strong>Phone Number:</strong> ${phone}</div>
      `;
  } else {
    alert("Invalid input. Please provide valid details.");
  }
}

function removeData(dataItem) {
  if (confirm("Are you sure you want to remove this entry?")) {
    dataItem.remove();
  }
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("phone").value = "";
}
