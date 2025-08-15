const uname = document.getElementById("uname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const select = document.getElementById("role");
const table =document.getElementById("table").getElementsByTagName("tbody")[0] ||document.getElementById("table");
const filterOption=document.getElementById("filter")

let allUser = [];
document.addEventListener("DOMContentLoaded", () => {
  let storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    allUser = JSON.parse(storedUsers);
    allUser.forEach((user, index) => {
      addRowToTable(user, index);
    });
  }

});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const user = {
    name: uname.value.trim(),
    email: email.value.trim(),
    gender: genderInput.value,
    role: select.value,
    password: password.value,
  };

  allUser.push(user);
  localStorage.setItem("users", JSON.stringify(allUser));
  addRowToTable(user, allUser.length - 1);

  uname.value = "";
  email.value = "";
  password.value = "";
  genderInput.checked = false;
  select.value = "";
});

function addRowToTable(user, index) {
  const newRow = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = user.name;

  const emailCell = document.createElement("td");
  emailCell.textContent = user.email;

  const genderCell = document.createElement("td");
  genderCell.textContent = user.gender;

  const roleCell = document.createElement("td");
  roleCell.textContent = user.role;

  const passCell = document.createElement("td");
  passCell.textContent = user.password;

  const editCell = document.createElement("td");
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square edit-icon"></i>';

  editBtn.addEventListener("click",()=>{
    localStorage.setItem("editUser", JSON.stringify(user));
    localStorage.setItem("editIndex", index);
    window.location.href = "update.html";
  });

  editCell.appendChild(editBtn);
  newRow.appendChild(editCell);
  newRow.appendChild(nameCell);
  newRow.appendChild(emailCell);
  newRow.appendChild(genderCell);
  newRow.appendChild(roleCell);
  newRow.appendChild(passCell);
  newRow.appendChild(editCell);

  table.appendChild(newRow);
}
filterOption.addEventListener("change", () => {
  let selValue = filterOption.value.toLowerCase();
  
  let headerRow = table.rows[0];
  table.innerHTML = "";
  table.appendChild(headerRow);

  let filteredUsers =
    selValue === "all"
      ? allUser
      : allUser.filter(user =>
          user.role.toLowerCase() === selValue ||
          user.gender.toLowerCase() === selValue
        );
  filteredUsers.forEach((user, index) => {
    addRowToTable(user, index);
  });
});


