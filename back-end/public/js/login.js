const loginButton = document.getElementById("loginWithWallet");
loginButton.addEventListener('click', function (event) {
    if (typeof window.ethereum !== 'undefined') {
        loginWithWallet();
    } else {
        alert("Ethereum Wallet Not Found. Please Install A Wallet.")
    }
});


async function loginWithWallet() {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    .catch((e) => {
        console.error(e.message);
        return;
    });
    if(!accounts) {
        return;
    }

    publicAddress = window.ethereum.selectedAddress;
    let url = new URL('/api/getNonce', window.location.origin)
    let params = { publicAddress: publicAddress }
    url.search = new URLSearchParams(params);

    var nonce;
    fetch(url)
    .then(response=>response.json())
    .then(data=>{ 
        nonce = data.nonce;
        signNonce(publicAddress, nonce);
    }).catch(function (err) {
        return;
    });
}

async function signNonce(publicAddress, nonce){
    var msg = "Welecome to Polideck! Please sign this message to verify your account. \n\nNonce: " + nonce;

    const options = JSON.stringify({
        domain: {
          name: 'Polideck Login',
          version: '1',
          chainId: '1',
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        message: {
          contents: msg,
        },
        primaryType: 'Person',
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' }
          ],
          Person: [
            { name: 'contents', type: 'string' },
          ]
        },
      });
    
      window.ethereum.sendAsync(
        {
          method: 'eth_signTypedData_v4',
          params: [publicAddress, options],
          from: publicAddress,
        }, function (err, result) {
          if (err) return console.dir(err);

          if (result.error) {
            alert(result.error.message);
          }

          if (result.error) return console.error('ERROR', result);

          const signature = JSON.stringify(result.result);
          let url = new URL('/api/getJWT', window.location.origin)
          let params = {address: publicAddress, data: options, sig: signature}
          url.search = new URLSearchParams(params);

          fetch(url)
          .then(response=>response.json())
          .then(data=>{
            console.log("JWT: " + data.JWT);
          }).catch(function (err) {
              return;
          });
        }
      );
}