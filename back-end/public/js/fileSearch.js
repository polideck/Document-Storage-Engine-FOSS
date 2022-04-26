
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
            }
            editAndDeleteButtons();

            $(document).ready(function() {
                $('table').bootstrapTable({
                    data: data["Files"]
                });

                $("#myInput").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                    $("#blockchain-table tr").filter('tr:not(:first)').filter(function() {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    });
                    editAndDeleteButtons();
                });
            });
        }
    }).catch(err => console.error(err));
}

async function editAndDeleteButtons(){
    $('table tr td:nth-child(3)').html("<td><button type='file' id='editbutton' class='mini-gold-button'>Edit</button></td>");
    $('table tr td:nth-child(4)').html("<td><button id='delete-button' class='mini-gold-button'>Delete</button></td>");


    $(".mini-gold-button").click(async function() {
        let info = [];
        $.each($(this).closest("tr").find("td"), function() {
            info.push($(this).text())
        });

        if($(this).attr('id') == 'editbutton'){
            let formData = new FormData();   
            formData.append("file", editbutton.files[0]);

            await edit(info, formData)
            .then(() => { location.reload(); });
        }
            
        if($(this).attr('id') == 'delete-button'){
            await deleteVal(info)
            .then(() => { location.reload(); });
        }

        console.log(res);
    });
}

async function edit(info, formData){
    await fetch(`/editFile?cid=${info[0]}&filename=${info[1]}`, {
        method: "PATCH", 
        body: formData
      }); 
}

async function deleteFile(info){
    await fetch(`/delete?cid=${info[0]}&address=${localStorage.getItem('address')}`, {
        method: "DELETE", 
      }); 
}