
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
    let data = await getData();
    $(document).ready(function() {
        $('table').bootstrapTable({
            data: data
        });

        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#blockchain-table tr").filter('tr:not(:first)').filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
            deployButtons();
        });

        deployButtons();
    });


    // JSON data
    var mydata = [{
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    {
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    {
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    {
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    {
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    {
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    {
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    {
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    {
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    {
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    {
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    {
        'Name': 'File 1 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'AGHsdcafSDAF254235fWFweqfWaFEr%EWf43%6435435erWF'
    },

    {
        'Name': 'File 2 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'BFADKVJSDFV13weafjf1345GYT%3tfWDFVwerf'
    },

    {
        'Name': 'File 3 Name',
        'DateAdded': Date.now(),
        'CreatedBy': 'asdfsdfFDFCdc%3tfdsafR4'
    },
    ];
}

async function getData(){
    console.log('getData')
    let res = await fetch(`/get_all_files?address=${localStorage.getItem('address')}`, {
            method: "GET", 
        })

    console.log(res);
}

function deployButtons(){
    $('table tr td:nth-child(3)').html("<td><button id='download-button' class='mini-gold-button'>Download</button></td>");
    $('table tr td:nth-child(4)').html("<td><button id='edit-button' class='mini-gold-button'>Edit</button></td>");
    $('table tr td:nth-child(5)').html("<td><button id='delete-button' class='mini-gold-button'>Delete</button></td>");

    $(".mini-gold-button").click(async function() {
        let info = [];
        $.each($(this).closest("tr").find("td"), function() {
            info.push($(this).text())
        });
        
        if($(this).attr('id') == 'download-button')
            await download(info);

        if($(this).attr('id') == 'edit-button')
            edit(info);
        
        if($(this).attr('id') == 'delete-button')
            await deleteVal(info);
    });
}

async function download(info){
    let formData = new FormData();   
    formData.append("name", info[0]);
    formData.append("dateAdded", info[1]);
    formData.append("createdBy", info[2]);

    let res = await fetch('/file', {
        method: "GET", 
        body: formData
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