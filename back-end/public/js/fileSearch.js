
var url = "http://localhost:3000/api/authenticate-token";

var bearer = 'Bearer ' + localStorage.getItem('bearer')
console.log('bearer3')
console.log(bearer);

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
    console.log('error')
    console.log(err)
    })
    .then(res =>
        {
            console.log(res.statusText)

            if(res.status != 200)
                window.location.replace('/login')
        }
    );



$(document).ready(function() {
  $('table').bootstrapTable({
      data: mydata
  });

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