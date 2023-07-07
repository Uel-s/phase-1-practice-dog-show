//document.addEventListener('DOMContentLoaded', () => {

// Get references to the necessary elements
const dogTable = document.querySelector('#table-body');
const editForm = document.querySelector('#dog-form');

// Function to create a table row for a dog
function createDogTableRow(dog) {
  const row = document.createElement('tr');

  const nameCell = document.createElement('td');
  nameCell.textContent = dog.name;

  const breedCell = document.createElement('td');
  breedCell.textContent = dog.breed;

  const sexCell = document.createElement('td');
  sexCell.textContent = dog.sex;

  const editBtnCell = document.createElement('td');
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';

  // Add event listener to populate form with dog information on edit button click
  editBtn.addEventListener('click', () => {
    populateFormWithDogInfo(dog);
  });

  editBtnCell.appendChild(editBtn);

  // Append cells to the row
  row.appendChild(nameCell);
  row.appendChild(breedCell);
  row.appendChild(sexCell);
  row.appendChild(editBtnCell);

  return row;
}

// Function to render the dog table
function renderDogTable(dogs) {
  dogTable.innerHTML = '';
  dogs.forEach((dog) => {
    const dogTableRow = createDogTableRow(dog);
    dogTable.appendChild(dogTableRow);
  });
}

// Function to fetch the list of dogs from the API
function fetchDogs() {
  fetch('http://localhost:3000/dogs')
    .then((response) => response.json())
    .then((dogs) => {
      renderDogTable(dogs);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function to populate the form with dog information for editing
function populateFormWithDogInfo(dog) {
  editForm.dataset.id = dog.id;
  editForm.name.value = dog.name;
  editForm.breed.value = dog.breed;
  editForm.sex.value = dog.sex;
}

// Event listener for form submission
editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const dogId = editForm.dataset.id;
  const name = editForm.name.value;
  const breed = editForm.breed.value;
  const sex = editForm.sex.value;

  // Send PATCH request to update dog information
  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      breed: breed,
      sex: sex,
    }),
  })
    .then(() => {
      // Fetch the updated list of dogs and re-render the table
      fetchDogs();
      editForm.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});

// Fetch the list of dogs on page load
fetchDogs();