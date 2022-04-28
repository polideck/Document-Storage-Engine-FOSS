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
            const addresses = full_data["addresses"]

            for(var i=0; i< data["Files"].length; i++) {
                data["Files"][i]["Download"] = `<a class='mini-gold-button' href="http://localhost:6969/file?cid=${data["Files"][i]["Hash"]}&filename=${data["Files"][i]["Name"]}">Download</a>`
                data["Files"][i]["Delete"] = `<a id='delete' class='mini-gold-button' href="http://localhost:6969/delete?documentAddress=${addresses[i]}&owner=${localStorage.getItem('address')}">Delete</a>`
                data["Files"][i]["Update"] = `<input type="file" style="font-size: 10px; width:70px;" data-address="${addresses[i]}" id="updatebutton" class="mini-gold-button removeValue"/>`
            }


            $(document).ready(async function() {
                $('table').bootstrapTable({
                    data: data["Files"]
                });
                await updateButton();


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

async function updateButton(){
    $(".removeValue").change(async function() {
        console.log('CHANGE');

        let info = [];
        $.each($(this).closest("tr").find("td"), function() {
            info.push($(this).text())
        });

        info = info.slice(0,2);
        
        $.each($('.removeValue'), function(){
            if($(this).prop('files')[0]){
                info.push($(this).prop('files')[0])
                info.push($(this).attr('data-address'))
            }
        });

        console.log(info)

        const res = await edit(info)
        .then(() => { location.reload(); });
            

        console.log(res);
    });

}

async function edit(info){
    console.log('edit');


    let formData = new FormData();   
    formData.append("name", info[0]);
    formData.append("hash", info[1]);
    formData.append("owner", localStorage.getItem('address'));
    formData.append("contractAddress", info[3])

    formData.append("file", info[2]);


    let res = await fetch('/editFile', {
        method: "PATCH", 
        body: formData
      }); 

    console.log(res);
}