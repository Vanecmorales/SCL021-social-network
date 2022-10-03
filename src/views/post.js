import { logout } from "../components/firebaseauth.js";
import { showPost, printPost } from "../components/firebaseauth.js";

export function createPost() {
  //Contenedor de todos los elemntos de la sección crear post y timeline
  const postContainer = document.createElement("div");
  postContainer.classList.add("postContainer");

  //Encabezado
  const headerPost = document.createElement("div");
  headerPost.classList.add("headerPost");
  postContainer.appendChild(headerPost);

  //Logo header
  const logoHeader = document.createElement("div");
  logoHeader.classList.add("logoHeader");
  headerPost.appendChild(logoHeader);

  //Titulo
  const titlePost = document.createElement("h3");
  titlePost.classList.add("titlePost");
  titlePost.textContent = "Go Wild Nature";
  headerPost.appendChild(titlePost);

  //Contedor con elementos de crear post
  const createPostContainer = document.createElement("div");
  createPostContainer.classList.add("createPostContainer");
  createPostContainer.setAttribute("id", "postContainer");
  postContainer.appendChild(createPostContainer);

  //Contenedor de foto e input
  const userPost = document.createElement("div");
  userPost.classList.add("userPost");
  createPostContainer.appendChild(userPost);

  //Foto de perfil
  const profilePhoto = document.createElement("img");
  profilePhoto.setAttribute("id", "addImage");
  profilePhoto.classList.add("profilePhoto");
  userPost.appendChild(profilePhoto);

  //Input para escribir el post
  const inputCreatePost = document.createElement("input");
  inputCreatePost.classList.add("inputCreatePost");
  inputCreatePost.setAttribute("type", "text");
  inputCreatePost.setAttribute("id", "inputPost");
  inputCreatePost.setAttribute("placeholder", "What are you thinking?");
  userPost.appendChild(inputCreatePost);

  //Contenedor de enlazar imagen, ubicación y boton GO
  const extraContainer = document.createElement("div");
  extraContainer.classList.add("extraContainer");
  createPostContainer.appendChild(extraContainer);

  //Opción de añadir imagen
  const addImage = document.createElement("i");
  addImage.classList.add("addImage");
  addImage.setAttribute("class", "fa-solid fa-image fa-xl");
  extraContainer.appendChild(addImage);

  //Opción para añadir ubicación
  const addLocation = document.createElement("i");
  addLocation.classList.add("addLocation");
  addLocation.setAttribute("class", "fa-solid fa-location-dot fa-xl");
  extraContainer.appendChild(addLocation);

  //Botón para publicar post
  const goButton = document.createElement("button");
  goButton.classList.add("goButton");
  goButton.textContent = "Go";
  extraContainer.appendChild(goButton);

  // Evento que envía la información ingresada a la base de datos
  goButton.addEventListener("click", (event) => {
    event.preventDefault();
    const posting = document.getElementById("inputPost").value;
    const userPost = document.getElementById("timelime");
    showPost(posting);
    printPost(userPost);
  });

  //Contenedor para cada post
  const timelimeContainer = document.createElement("div");
  timelimeContainer.classList.add("timelimeContainer");
  timelimeContainer.setAttribute("id", "timelime");
  postContainer.appendChild(timelimeContainer);

  //Contenedor del botón logout
  const logoutContainer = document.createElement("div");
  logoutContainer.classList.add("logoutContainer");
  postContainer.appendChild(logoutContainer);

  //Boton de cerrar sesión
  const logoutButton = document.createElement("button");
  logoutButton.classList.add("logoutButton");
  logoutButton.textContent = "Logout";
  logoutContainer.appendChild(logoutButton);

  //Evento para cerrar sesión
  logoutButton.addEventListener("click", () => {
    logout();
  });

  return postContainer;
}
