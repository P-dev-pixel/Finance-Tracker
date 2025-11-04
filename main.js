 const addList = document.querySelectorAll("button")[0];
 
  const deletRoom = document.getElementById("deleteRoom");
  const deleteGrocery = document.getElementById("deleteGrocery");
  const clearRoom = document.getElementById("clearRoom");
  const clearGrocery = document.getElementById("clearGrocery");
 
  const totalGrocery = document.getElementById("totalGrocery");
  const totalRoom = document.getElementById("totalRoom");
  const ce = document.createElement("h1");

  const room = document.getElementById("room");
  const grocery = document.getElementById("grocery");

  const roomRows = room.getElementsByTagName("tr");
  const groceryRows = grocery.getElementsByTagName("tr");

  const select = document.getElementsByTagName("select")[0];
  const name = document.getElementById("name");

  addList.style.display = "none";

  // Selector control
  select.addEventListener("click", () => {
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
    if (select.value === "RE") {
      addList.style.display = "block";
      name.style.display = "none";
    } else if (select.value === "Gi") {
      name.style.display = "block";
      addList.style.display = "block";
    } else addList.style.display = "none";
  });

  let roomCount = 1;
  let groceryCount = 1;

  // Add Row (Room / Grocery)
  addList.addEventListener("click", () => {
    const currentTable = select.value; // always read fresh
    const Product = document.querySelectorAll("input")[0].value.trim();
    const price = parseFloat(document.querySelectorAll("input")[1].value);
    const date = new Date();

    // Grocery table
    if (currentTable === "Gi") {
      let nameVal = name.value.trim();
      if (!nameVal) {
        name.style.border = "2px solid red";
        return;
      }
      name.style.border = "none";

      if (Product === "" || price <= 0 || isNaN(price)) {
        document.querySelectorAll("input")[0].style.border = "2px solid red";
        document.querySelectorAll("input")[1].style.border = "2px solid red";
        return;
      }

      document.querySelectorAll("input")[0].style.border = "none";
      document.querySelectorAll("input")[1].style.border = "none";

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
          <td>${groceryCount++}</td>
          <td>${nameVal}</td>
          <td>${Product}</td>
          <td>${price}</td>`;
      grocery.appendChild(newRow);
    }

    // Room table
    else if (currentTable === "RE") {
      if (Product === "" || price <= 0 || isNaN(price)) {
        document.querySelectorAll("input")[0].style.border = "2px solid red";
        document.querySelectorAll("input")[1].style.border = "2px solid red";
        return;
      }

      document.querySelectorAll("input")[0].style.border = "none";
      document.querySelectorAll("input")[1].style.border = "none";
  
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
          <td>${roomCount++}</td>
          <td>${date.getDate()}/${date.getMonth() + 1} (Hrs: ${date.getHours()})</td>
          <td>${Product}</td>
          <td>${price}</td>`;
      room.appendChild(newRow);
    }

    document.querySelectorAll("input")[0].value = "";
    document.querySelectorAll("input")[1].value = "";
    saveData();
  });

  // Total calculation
  
 

  // Save & Restore
  function saveData() {
    const rows = room.querySelectorAll("tr:not(:first-child)");
    const grRow = grocery.querySelectorAll("tr:not(:first-child)");
    const rowsHTML = Array.from(rows).map((row) => row.outerHTML).join("");
    const grHtml = Array.from(grRow).map((row) => row.outerHTML).join("");
  sessionStorage.setItem("GrRow", grHtml);
    sessionStorage.setItem("List", rowsHTML);
  }

  function showTask() {
    const savedData = sessionStorage.getItem("List");
    const grData = sessionStorage.getItem("GrRow");
    if (savedData || grData) {
      room.innerHTML =
        `<tr>
          <th>S.No</th>
          <th>Date(DD/MM/hrs)</th>
          <th>Product Name</th>
          <th>Price</th>
        </tr>` + (savedData || "");
      grocery.innerHTML =
        `<tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Product Name</th>
          <th>Price</th>
        </tr>` + (grData || "");
      roomCount = room.rows.length;
      groceryCount = grocery.rows.length;
    }
  }

document.getElementById('saveName').addEventListener('click', () => {
  const addName = document.getElementsByTagName('select')[1]; // your select
  const options = Array.from(addName.options); // get all <option> elements

  // store their text or value
  const names = options.map(opt => opt.value || opt.text);

  sessionStorage.setItem('Names', JSON.stringify(names)); // store safely as JSON
  alert('Stored successfully!');
});
  showTask();