import { registerAccount } from "../components/firebaseauth.js";

export function createAccount() {
  //Contenedores de la sección crear cuenta
  const registerContainer = document.createElement("div");
  registerContainer.classList.add("registerContainer");

  // Sección principal de crear cuenta
  const headerRegister = document.createElement("div");
  headerRegister.classList.add("headerRegister");
  registerContainer.appendChild(headerRegister);

  //Flecha de crear cuenta
  const backArrow = document.createElement("img");
  backArrow.classList.add("backArrow");
  backArrow.setAttribute("src", "../images/backArrow.png");
  backArrow.id = "backLogin";
  headerRegister.appendChild(backArrow);

  //Evento para manipular el historial e ir atrás
  backArrow.addEventListener("click", () => {
    history.back();
  });

  //Titulo crear cuenta
  const registerTitle = document.createElement("h1");
  registerTitle.textContent = "Create account";
  registerTitle.classList.add("registerTitle");
  headerRegister.appendChild(registerTitle);

  //Formulario de crear cuenta
  const registerForm = document.createElement("form");
  registerForm.classList.add("registerForm");
  registerContainer.appendChild(registerForm);

  //Input Nombre
  const inputNameRegister = document.createElement("input");
  inputNameRegister.id = "nameAccount";
  inputNameRegister.classList.add("inputNameRegister");
  inputNameRegister.setAttribute("id", "name");
  inputNameRegister.setAttribute("type", "text");
  inputNameRegister.setAttribute("placeholder", "   Full name");
  registerForm.appendChild(inputNameRegister);

  //Input Mail
  const inputMailRegister = document.createElement("input");
  inputMailRegister.classList.add("inputMail");
  inputMailRegister.setAttribute("id", "email");
  inputMailRegister.setAttribute("type", "email");
  inputMailRegister.setAttribute("placeholder", "   Email");
  registerForm.appendChild(inputMailRegister);

  //Input contraseña
  const inputPasswordRegister = document.createElement("input");
  inputPasswordRegister.classList.add("inputPassword");
  inputPasswordRegister.setAttribute("id", "password");
  inputPasswordRegister.setAttribute("type", "password");
  inputPasswordRegister.setAttribute("placeholder", "   Password");
  registerForm.appendChild(inputPasswordRegister);

  //Sección de aceptar términos
  const checkBoxContainer = document.createElement("div");
  checkBoxContainer.classList.add("checkBoxContainer");
  registerForm.appendChild(checkBoxContainer);

  const checkBox = document.createElement("input");
  checkBox.classList.add("checkBox");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("value", "conditionCheckbox");
  checkBoxContainer.appendChild(checkBox);

  const condition = document.createElement("p");
  condition.classList.add("condition");
  condition.textContent = "Agreed to terms and conditions";
  checkBoxContainer.appendChild(condition);

  //Botón de registrarse cambiar nombre para que funcione
  const signUpButton = document.createElement("input");
  signUpButton.classList.add("signUpButton");
  signUpButton.setAttribute("type", "submit");
  signUpButton.setAttribute("value", "Sign up");
  signUpButton.id = "signUpButton";
  registerForm.appendChild(signUpButton);

  // Evento para enviar datos del registro
  signUpButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    registerAccount(email, password);
  });
  return registerContainer;
}
