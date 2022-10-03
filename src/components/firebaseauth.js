import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

import { app, db } from "./firebaseconfig.js";
import { router } from "./router.js";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
  query,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();

//Función para loguearse con cuentas de Google. (Popup Google)
const logInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      return credential;
    })
    .catch((error) => {
      const errorCode = error.code;
      return errorCode;
    });
};

// Función de registro de nuevos usuarios
const registerAccount = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //window.location.hash = '#/muro';

      // Promesa para enviar correo de verificación
      const user = userCredential.user;
      return sendEmailVerification(user); //este return se convierte en promesa y tiene como parametro el usuario creado
    })
    .then((successEmail) => {
      console.log(successEmail);
    })
    .catch((error) => {
      const errorCode = error.code;

      // Alertas en caso de errores
      switch (errorCode) {
        case "auth/email-already-in-use":
          alert("The email address is already in use");
          break;
        case "auth/missing-email":
          alert("Please enter your email");
          break;
        case "auth/invalid-email":
          alert("Verify your email");
          break;
        case "auth/weak-password":
          alert("Your password must be at least 6 characters");
          break;
        case "auth/internal-error":
          alert("Enter your password");
          break;
      }
    });
};

//Función para loguearse con email y password (Luego de crear una cuenta)
const logInWithEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;

      //Alertas en caso de no ingresar bien los valores del input
      switch (errorCode) {
        case "auth/wrong-password":
          alert("Wrong password");
          break;
        case "auth/user-not-found":
          alert("The email is not registered");
          break;
        case "auth/invalid-email":
          alert("Verify your email");
          break;
        case "auth/internal-error":
          alert("Enter your password");
          break;
      }
    });
};

//Observador: permite validar el estado de la sesión de un usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    router("#/post");
    window.location.hash = "#/post";
    console.log("Ingresaste");
  } else {
    router("#/login");
    window.location.hash = "#/login";
    console.log("no estás logeado");
  }
});

//Función para cerrar sesión
const logout = () => {
  signOut(auth)
    .then(() => {
      window.location.hash = "#/login";
    })
    .catch((error) => {
      return error;
      // An error happened.
    });
};

// Función para agregar datos
const showPost = async (posting) => {
  const docRef = await addDoc(collection(db, "Post"), {
    description: posting,
    uid: auth.currentUser.uid,
    name: auth.currentUser.displayName,
    date: Timestamp.fromDate(new Date()),
    likes: [],
    likesCount: 0,
  });
  document.getElementById("inputPost").value = "";
  console.log("Document written with ID: ", docRef.id);
};

//Función para que se impriman los post en el contenedor en tiempo real (OnSnapshot)
// const printPost = (userPost) => {
//   onSnapshot(query(collection(db, "Post")), (docs) => {
//     //userPost.innerHTML = "";
//     docs.forEach((doc) => {
//       doc.data();
//       //console.log(`${doc.id} => ${doc.data().description}`);
//       userPost.innerHTML += `<div id="userPostContainer">
//       <div id="containerPost">
//       <h6 id="userName">${doc.data().name}</h6>
//       <p id="descriptionPost">${doc.data().description}</p>
//       </div>
//       <div id="iconsContainer">
//       <button id="pencilBtn" class = "postBtn" data-id="${
//         doc.id
//       }"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
//       <button id="likeBtn" class = "postBtn"><i class="fa-solid fa-heart"></i> Likes</button>
//       <button id="trashBtn" class = "postBtn" data-id="${
//         doc.id
//       }"><i class="fa-solid fa-trash"></i> Delete</button>
//       </div>
//       </div>
//       </div>`;
//     });
//   });

//Función para que se impriman los post en el contenedor (No real time)
const printPost = async (userPost) => {
  const querySnapshot = await getDocs(collection(db, "Post"));
  userPost.innerHTML = "";
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().description}`);
    userPost.innerHTML += `<div id="userPostContainer">
      <div id="containerPost">
      <h6 id="userName">${doc.data().name}</h6>
      <p id="descriptionPost">${doc.data().description}</p>
      </div>
      <div id="iconsContainer"> 
      <button id="pencilBtn" class = "postBtn" data-id="${doc.id}"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
      <button id="likeBtn" class = "postBtn"><i class="fa-solid fa-heart"></i> Likes</button>
      <button id="trashBtn" class = "postBtn" data-id="${doc.id}"><i class="fa-solid fa-trash"></i> Delete</button>
      </div>
      </div>`;
  });

  //Evento de delegación para darle funcionalidad a los botones
  const iconsContainer = userPost.querySelectorAll(".postBtn");
  iconsContainer.forEach((icon) => {
    icon.addEventListener("click", delegacion);

    function delegacion(e) {
      console.log("delegacion");
      e.preventDefault();
      const idBtn = e.target.id;
      const idDoc = e.target.getAttribute("data-id");
      const user = auth.currentUser.uid;
      console.log("este es el id documento " + idDoc);
      console.log("este es el usuario " + user);

      switch (idBtn) {
        case "trashBtn":
          deletePost(idDoc, user);
          console.log("diste click en eliminar");
          break;
        case "likeBtn":
          console.log("diste click en like");
          break;
        case "pencilBtn":
          editPost(idDoc);
          console.log("Editar comentario");
          break;
      }
    }
  });
};

//OnSnapShot (me permite ver solo en consola lo que está ocurriendo en tiempo real)
const displayPosts = () => {
  const consulta = query(collection(db, "Post"));
  //onsnapshot utiliza observers,
  //los observers devuelven resultados mediante callbacks
  onSnapshot(consulta, (resultadoConsulta) => {
    const misPosts = [];
    resultadoConsulta.forEach((doc) => {
      // console.log({ doc });
      // console.log({ data: doc.data() });

      //spread operator
      misPosts.push({ ...doc.data(), id: doc.id });
    });
    console.log(misPosts);
  });
};
//postObtenidos es un arreglo
displayPosts();

//Función borrar datos
function deletePost(id) {
  deleteDoc(doc(db, "Post", id))
    .then(() => {
      // location.reload()
      console.log("exito al borrar");
    })
    .catch((error) => {
      console.log("Hiciste click en eliminar: ", error);
    });
}

//Función editar (no fue posible enlazarla)
async function editPost(posting, idDoc) {
  posting.innerHTML("inputPost").value = posting;
  const edit = doc(db, "Post", idDoc);
  await updateDoc(edit, {
    description: posting,
  });
  console.log(editPost, "Editando función");
}

export {
  app,
  auth,
  registerAccount,
  logInWithGoogle,
  logInWithEmailAndPassword,
  logout,
  showPost,
  printPost,
};
