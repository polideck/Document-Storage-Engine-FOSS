async function uploadFile() {
  if(!fileupload.files[0]){
    return;
  }

    let formData = new FormData();   

    formData.append("file", fileupload.files[0]);

    await fetch('/add', {
      method: "POST", 
      body: formData
    });    
    alert('The file has been uploaded successfully.');
}