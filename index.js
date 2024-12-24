/*
Grandpa has a Christmas wish list to keep track of all the gifts he wants to ask for. But there’s a problem: if he forgets he’s already added something, the list gets clogged up with duplicates. This happened last year, and he ended up with 8 talking picture frames on Christmas Day!

Your task is to complete the `checkDuplicate()` function 👇 to ensure no duplicates are added to the list. But here’s the tricky part: Grandpa sometimes hits the spacebar more than once, making it harder to spot duplicates.

For example, only one of these entries should be added to the list — the others should be flagged as duplicates:

- "talking picture frames"
- "talking  picture frames"
- "talking picture    frames"
- " talking picture frames "

**Your tasks:**
1. Ensure no duplicates can be added to the list.
2. Account for extra spaces at the beginning/end and between words.

**Stretch Goals:**
1. Case Sensitivity: Handle cases where capitalization differs. For example:
  - `"Cat Hammock"` should be flagged as a duplicate of `"cat hammock"`.
  - Preserve Grandpa’s original capitalization (e.g., if `"Cat Hammock"` is added first, that should be added to the list). Do not simply convert all entries to lower case - Grandpa might well want to capitalize some words. 

2. Additional Features: Add functionality to delete or edit items on the list.
*/

// Get references to DOM elements
const itemInput = document.getElementById('item-input')
const addItemButton = document.getElementById('add-item-button')
const editSaveBtn = document.getElementById('edit-save-button')
const editCancelBtn = document.getElementById('edit-cancel-button')
const shoppingList = document.getElementById('shopping-list')
const listArr = []
const listArrLowercased = []
let editModeOn = false
let itemIndexOnEdit = null

// Function to check item is not duplicate
function checkDuplicate() {

  /* ⚠️ You need to add code to this function! ⚠️*/

  const itemText = itemInput.value
  const normalizedItemText = itemText.trim().replace(/\s{2,}/gm, " ");
  const normalizedItemTextLowercased = normalizedItemText.toLowerCase()

  if (normalizedItemText === "") {
    alert("Grandpa, you gotta type in something!");
    return;
  }

  if (listArrLowercased.includes(normalizedItemTextLowercased)) {
    alert("Grandpa, you've already added this item to your list!");
    return
  } else {
    if (editModeOn) {
      listArr.splice(itemIndexOnEdit, 1, normalizedItemText)
      listArrLowercased.splice(itemIndexOnEdit, 1, normalizedItemTextLowercased)
    } else {
      listArr.push(normalizedItemText);
      listArrLowercased.push(normalizedItemTextLowercased);
    }
  }

  renderList()
}

// Function to add an item to the shopping list
function renderList() {
  shoppingList.innerHTML = ''
  listArr.forEach((gift, index) => {
    const listItem = document.createElement('li')

    listItem.innerHTML = `
            <span>${gift}</span>
            <button title='Delete' class='material-symbols-rounded' id='delete-btn-${index}'>delete</button>
            <button title='Edit' class='material-symbols-rounded' id='edit-btn-${index}'>edit</button>
        `

    shoppingList.appendChild(listItem)

    // Add event listeners to edit/delete buttons
    document.getElementById(`delete-btn-${index}`).addEventListener('click', () => deleteItem(index))
    document.getElementById(`edit-btn-${index}`).addEventListener('click', () => editItem(index))
  })
  itemInput.value = ''; // Clear the input field
}

// Add event listener to button
addItemButton.addEventListener('click', checkDuplicate)

// Allow adding items by pressing Enter key
itemInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    checkDuplicate()
    editModeOn && cancelEdit()
  }
})

// Function to delete an item from the shopping list
function deleteItem(id) {
  listArr.splice(id, 1);
  listArrLowercased.splice(id, 1);
  renderList();
  editModeOn && cancelEdit()
}

// Function to edit an item in the shopping list
function editItem(id) {
  editModeOn = true
  itemIndexOnEdit = id
  itemInput.value = listArr[id]
  itemInput.focus()
  addItemButton.style.display = 'none'
  editSaveBtn.style.display = 'inline'
  editCancelBtn.style.display = 'inline'
}

function cancelEdit() {
  editModeOn = false
  itemInput.value = ''
  addItemButton.style.display = 'inline'
  editSaveBtn.style.display = 'none'
  editCancelBtn.style.display = 'none'
}

function saveEdit() {
  checkDuplicate(itemIndexOnEdit)
  cancelEdit()
}

// Add event listeners to the save/cancel buttons
editSaveBtn.addEventListener('click', saveEdit)
editCancelBtn.addEventListener('click', cancelEdit)
