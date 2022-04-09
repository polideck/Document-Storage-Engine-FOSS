// let uploadBtn = document.querySelector("#file-upload");
// uploadBtn.addEventListener("change", changeBG);
// function changeBG() {
//   let reader;
//   if (this.files && this.files[0]) {
//     reader = new FileReader();
//     reader.onload = (e) => {
//       bgObject.img.src = e.target.result;
//       drawCanvas();
//     };
//     reader.readAsDataURL(this.files[0]);

//     console.log(reader)
//     console.log(this.files[0])
//   }
// }

async function uploadFile() {
    let formData = new FormData();           
    formData.append("file", fileupload.files[0]);
    await fetch('/add', {
      method: "POST", 
      body: formData
    });    
    alert('The file has been uploaded successfully.');
}