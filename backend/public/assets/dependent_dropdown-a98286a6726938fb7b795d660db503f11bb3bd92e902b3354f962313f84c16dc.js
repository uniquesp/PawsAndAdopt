document.addEventListener("turbo:load", function () {
  console.log("Turbo loaded!");

  const categorySelect = document.getElementById("category-select");
  const breedSelect = document.getElementById("breed-select");

  if (!categorySelect || !breedSelect) {
    console.warn("Dropdown elements not found!");
    return;
  }

  function fetchBreeds(categoryId, preselectedBreedId = null) {
    if (categoryId) {
      console.log("Fetching breeds for category:", categoryId);

      fetch(`/admin/pets/get_breeds?category_id=${categoryId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Breeds received:", data);

          breedSelect.innerHTML = '<option value="">Select Breed</option>';
          data.forEach((breed) => {
            let option = document.createElement("option");
            option.value = breed.id;
            option.textContent = breed.breed_name;
            breedSelect.appendChild(option);
          });

          breedSelect.disabled = false;

          // If a breed is already selected (edit form), set it
          if (preselectedBreedId) {
            breedSelect.value = preselectedBreedId;
          }
        })
        .catch((error) => {
          console.error("Error fetching breeds:", error);
          alert("Error fetching breeds. Please try again.");
        });
    } else {
      console.log("No category selected, resetting breed dropdown.");
      breedSelect.innerHTML = '<option value="">Select Breed</option>';
      breedSelect.disabled = true;
    }
  }

  // Handle change event when selecting a category
  categorySelect.addEventListener("change", function () {
    fetchBreeds(categorySelect.value);
  });

  // Auto-load breeds if a category is already selected (Edit Form)
  const preselectedCategory = categorySelect.value;
  const preselectedBreed = breedSelect.dataset.selected; // Store pre-selected breed ID in `data-selected`

  if (preselectedCategory) {
    fetchBreeds(preselectedCategory, preselectedBreed);
  }
});
