let employees = [];
var validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var tbody = document.getElementById("tbody");
function save() {
  const isInvalid = [
    document.getElementById("fname").value,
    document.getElementById("gender").value,
    document.getElementById("date").value,
    document.getElementById("email").value,
    document.getElementById("position").value,
  ].includes("");
  const isValidEmail = document.getElementById("email").value.match(validRegex);
  if (isInvalid) {
    alert("Please input correct value");
  } else if (!isValidEmail) {
    alert("Invalid email address!");
    document.getElementById("email").focus();
  } else {
    name = document.getElementById("fname").value;
    gender = document.getElementById("gender").value;
    date = document.getElementById("date").value;
    email = document.getElementById("email").value;
    position = document.getElementById("position").value;
    const employee = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      gender: gender,
      date: date,
      email: email,
      position: position,
    };
    // console.log(employee);
    /////pust object to array and convert array to string and  store in localStorage /////
    employees.push(employee);
    employeesAsString = JSON.stringify(employees);

    localStorage.setItem("employees", employeesAsString);

    clearField(); //call function clear field
    getEmployeeList(); //call function
  }
}

//////get value from form and into the form
function editEmployee(id) {
  const editValue = employees.find((item) => item.id == id);
  // console.log(ReturnValue);
  document.getElementById("id").value = editValue.id;
  document.getElementById("fname").value = editValue.name;
  document.getElementById("gender").value = editValue.gender;
  document.getElementById("date").value = editValue.date;
  document.getElementById("email").value = editValue.email;
  document.getElementById("position").value = editValue.position;
}

//////function editreturn for get value from form that was updated and send to table / /////////////////
function editReturn(id) {
  // console.log(id);
  const ReturnValue = employees.find((item) => item.id == id);
  // console.log("ok", ReturnValue);
  ReturnValue.name = document.getElementById("fname").value;
  ReturnValue.gender = document.getElementById("gender").value;
  ReturnValue.date = document.getElementById("date").value;
  ReturnValue.email = document.getElementById("email").value;
  ReturnValue.position = document.getElementById("position").value;

  //////access value of returnValue As Sring in to LocalStorage///
  employeesAsString = JSON.stringify(employees);

  localStorage.setItem("employees", employeesAsString);
  getEmployeeList();
  clearField();
}
//////Delete///////////

function deleteEmployee(id) {
  isConfirm = confirm("Are you sure you want to delete ?");
  if (isConfirm) {
    const indexEmp = employees.findIndex((item) => item.id == id);
    employees.splice(indexEmp, 1);
    employeesAsString = JSON.stringify(employees);
    localStorage.setItem("employees", employeesAsString);
    getEmployeeList();
    clearField();
  }
}
//////button Save and Edit////////////////

function submitEmp() {
  const isEdit = Boolean(document.getElementById("id").value);
  const valueEdit = document.getElementById("id").value;
  console.log(isEdit);
  if (isEdit) {
    // alert("is edit");
    editReturn(valueEdit);
  } else {
    // alert("is saved");
    save();
  }
}
////clear field//////////////////////////////

function clearField() {
  document.getElementById("id").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("gender").value = "Select Gender";
  document.getElementById("date").value = "";
  document.getElementById("email").value = "";
  document.getElementById("position").value = "Select Position";
}

////////////////get value from localStorage like object/////////////
function getEmployeeList() {
  // employees = []; //?
  employees = JSON.parse(localStorage.getItem("employees")) || [];
  let tableContent = ""; //?
  tbody.innerHTML = tableContent; //we want to table is empty for get value new from localStorage .
  listEmployee();
  // console.log(employees);
}
///////// when we click the button save ,table will generate down.
function listEmployee() {
  employees.forEach((emp, i) => {
    let tableContent = ""; //?
    tableContent += `
    <tr>
    <td>${i + 1}</td>
    <td>${emp.name}</td>
    <td>${emp.gender}</td>
    <td>${emp.date}</td>
    <td>${emp.email}</td>
    <td>${emp.position}</td>
    <td><span><button type="button" class="button1" onclick="editEmployee(${
      emp.id
    })"><i class="fa-solid fa-pencil"></i
    ></button>
    <button class="button2" onclick="deleteEmployee(${
      emp.id
    })">  <i class="fa-solid fa-trash-can"></i></button></span></td>
  </tr> 
    `;
    tbody.innerHTML += tableContent;
  });
}

/////////search name///////////////////////

function searchButton() {
  employees = JSON.parse(localStorage.getItem("employees"));
  const searchName = document
    .getElementById("searchName")
    .value.trim()
    .toLowerCase();
  employees = employees.filter((employee) => {
    return employee.name.toLowerCase().includes(searchName);
  });
  if (!searchName) {
    //this condition is mean if input no value is it will get value from localstorage;
    employees = JSON.parse(localStorage.getItem("employees"));
  }
  tbody.innerHTML = ""; ///this condition is mean don't want to add new row when we click on button search;
  listEmployee();
}
////clear input//////////////
function clearInput() {
  searchName.value = "";
}
