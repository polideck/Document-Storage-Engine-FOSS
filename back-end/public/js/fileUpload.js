async function uploadFile() {
  if(!fileupload.files[0]){
    return;
  }

    let formData = new FormData();   

    formData.append("file", fileupload.files[0]);
    formData.append('address', localStorage.getItem('address'));

    await fetch('/add', {
      method: "POST", 
      body: formData
    });    

    location.reload();
}