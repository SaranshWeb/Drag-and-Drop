document.addEventListener("DOMContentLoaded", function () {
  const addItemBtn = document.getElementById("addItemBtn");
  const itemInput = document.getElementById("itemInput");
  const shoppingList = document.getElementById("shoppingListItems");
  const groceriesList = document.getElementById("groceries");
  const stationaryList = document.getElementById("stationary");
  const darkModeBtn = document.getElementById('darkModeBtn');


  // Variable to store the dragged item
  let draggedItem = null;

  // Function to add item to list
  function addItemToList(list, itemText) {
    const item = document.createElement("div");
    item.className =
      "bg-gray-200 p-2 rounded-md mb-2 cursor-move flex justify-between items-center";
    item.draggable = true;
    // Set data-id attribute as unique identifier
    item.setAttribute("data-id", itemText);

    // Item text
    const itemTextNode = document.createElement("span");
    itemTextNode.textContent = itemText;

    // Edit input
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className =
      "edit-input px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500";
    editInput.value = itemText;
    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const newItemText = editInput.value.trim();
        if (newItemText !== "") {
          itemTextNode.textContent = newItemText;
          item.setAttribute("data-id", newItemText);
          editInput.classList.add("edit-input");
        }
      } else if (event.key === "Escape") {
        editInput.classList.add("edit-input");
      }
    });

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "text-blue-500 hover:text-blue-700 focus:outline-none";
    editBtn.addEventListener("click", function () {
      editInput.classList.remove("edit-input");
      editInput.focus();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className =
      "text-red-500 hover:text-red-700 focus:outline-none ml-2";
    deleteBtn.addEventListener("click", deleteItem);

    item.appendChild(itemTextNode);
    item.appendChild(editInput);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);

    item.addEventListener("dragstart", function (event) {
      // Store the dragged item in a variable
      draggedItem = item;
      event.dataTransfer.setData("text/plain", itemText);
    });

    list.appendChild(item);
  }

  // Event listener for add item button
  addItemBtn.addEventListener("click", function () {
    addItem();
  });

  // Event listener for 'Enter' key press in input field
  itemInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addItem();
    }
  });

  // Function to add item to the shopping list
  function addItem() {
    const itemText = itemInput.value.trim();
    if (itemText !== "") {
      addItemToList(shoppingList, itemText);
      itemInput.value = "";
    }
  }

  // Prevent default behavior for drag and drop events
  document.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  // Drop event handler for all lists
  function dropEventHandler(event) {
    event.preventDefault();
    const targetList = event.target.closest(".list");
    // Use the data-id attribute to identify the dragged item
    if (draggedItem) {
      // Remove the dragged item from its current list
      draggedItem.parentNode.removeChild(draggedItem);
      // Add the dragged item to the target list
      targetList.appendChild(draggedItem);
      // Clear the dragged item variable
      draggedItem = null;
    }
  }

  groceriesList.addEventListener("drop", dropEventHandler);
  stationaryList.addEventListener("drop", dropEventHandler);
  shoppingList.addEventListener("drop", dropEventHandler);

  // Delete item function
  function deleteItem(event) {
    const itemDiv = event.target.parentNode;
    itemDiv.parentNode.removeChild(itemDiv);
  }

  // Function to toggle dark mode
  function toggleDarkMode() {
    // Toggle the 'dark-mode' class on the body element
    document.body.classList.toggle('dark-mode');
}

// Event listener for dark mode button
darkModeBtn.addEventListener('click', toggleDarkMode);
});
