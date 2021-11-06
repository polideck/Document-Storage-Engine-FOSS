window.onload = function(){
  const inputElement = document.getElementById("submitButton");
  inputElement.addEventListener("click", handleFile, false);
}

function handleFile() {
  console.log('test')
  fileUpload = document.getElementById("inputForm");
  const file = fileUpload.files[0];
  console.log(file);
}