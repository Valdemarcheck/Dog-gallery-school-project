const queryImage = document.querySelector("#query-image");

function setupBreedOptions(data) {
  document.getElementById("breed").innerHTML = `
    <select>
      <option>Choose a dog breed</option>
      ${Object.keys(data)
        .map((breed) => {
          return `<option>${breed}</option>`;
        })
        .join("")}
    </select>
    `;
}

async function getBreeds() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  setupBreedOptions(data.message);
}

function createSlideshow(images, breed) {
  const slideshow = document.getElementById("slideshow");
  slideshow.innerHTML = "";

  console.log(images);

  for (let i = 0; i < images.length; i++) {
    if (i >= 50) break;
    slideshow.innerHTML += `<div><img src="${images[i]}" alt="A ${breed}"/></div>`;
  }
}

async function getRandomImage() {
  const breed = document.querySelector("#breed select").value;

  if (breed === "Choose a dog breed") return;

  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  const data = await response.json();

  createSlideshow(data.message, breed);
}

queryImage.addEventListener("click", getRandomImage);
getBreeds();
