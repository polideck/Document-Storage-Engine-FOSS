
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

function showTable(){
    $(document).ready(function() {
        $('table').bootstrapTable({
            data: mydata
        });

        $('table tr td:nth-child(4)').html("<tr><td><button class='mini-gold-button' onclick='download()'>Download</button></td></tr>");
        $('table tr td:nth-child(5)').html("<tr><td><button class='mini-gold-button' onclick='edit()'>Edit</button></td></tr>");
        $('table tr td:nth-child(6)').html("<tr><td><button class='mini-gold-button' onclick='deleteVal()'>Delete</button></td></tr>");

        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#blockchain-table tr").filter('tr:not(:first)').filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
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

function download(){
    console.log('download')
}

function deleteVal(){
    console.log('del')
}

function edit(){
    console.log('edit')
}