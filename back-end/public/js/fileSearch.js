
var url = "/api/authenticate-token";
var authenticated = false;
var bearer = 'Bearer ' + localStorage.getItem('bearer')

fetch(url, {
        method: 'GET',
        redirect: 'follow',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    })
    .catch(err =>{
    console.log(err)
    })
    .then(res =>
        {
            if(res.status != 200){
                window.location.replace('/login')
            }
            else{
                //Authenticated
                showTable();
            }
        }
    );

async function showTable(){
    await fetch(`/get_all_files?address=${localStorage.getItem('address')}`, {
        method: "GET", 
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        }
    }).then(full_data => {
        if(full_data) {
            const data = full_data["data"]
            for(var i=0; i< data["Files"].length; i++) {
                data["Files"][i]["Download"] = `<a class='mini-gold-button' href="http://192.168.100.50:6969/file?cid=${data["Files"][i]["Hash"]}&filename=${data["Files"][i]["Name"]}">Download</a>`
                data["Files"][i]["Edit"] = `<a class='mini-gold-button' href="http://192.168.100.50:6969/">Edit</a>`
                data["Files"][i]["Delete"] = `<a class='mini-gold-button' href="http://192.168.100.50:6969/delete?cid=${data["Files"][i]["Hash"]}&address=${localStorage.getItem('address')}">Delete</a>`
            }
            $(document).ready(function() {
                $('table').bootstrapTable({
                    data: data["Files"]
                });

                $("#myInput").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                    $("#blockchain-table tr").filter('tr:not(:first)').filter(function() {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    });
                });
            });
        }
    }).catch(err => console.error(err));
}

async function download(info){
    console.log(info)

    let res = await fetch(`/file?cid=${info[1]}&filename=${info[0]}`, {
        method: "GET", 
      }); 

    console.log(res);
}

async function deleteVal(info){
    let formData = new FormData();   
    formData.append("name", info[0]);
    formData.append("dateAdded", info[1]);
    formData.append("createdBy", info[2]);

    let res = await fetch('/delete', {
        method: "DELETE", 
        body: formData
      });    
    
    console.log(res);
}

async function edit(info){
    let formData = new FormData();   
    formData.append("name", info[0]);
    formData.append("dateAdded", info[1]);
    formData.append("createdBy", info[2]);

    let res = await fetch('/editFile', {
        method: "PATCH", 
        body: formData
      }); 

    console.log(res);
}