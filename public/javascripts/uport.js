const appName = 'KauriID';
const Connect = window.uportconnect.Connect;
const SimpleSigner = window.uportconnect.SimpleSigner;

// Uncomment after sometime since the App Profile is not deployed yet
    const uport = new Connect('kauri-login', {
        clientId: '2oy1eyQuGutToy3R1mjuWydE2NQXXXsxxYZ',
        network: 'rinkeby',
        signer: SimpleSigner('591d9071d49c91f0b15694a7f0fd9c82698f974b0010b2d55463fe81206ca77d')
    });

// const uport = new Connect(appName);

const web3 = uport.getWeb3();
// const uportRequest = {
//     requested: ['name', 'avatar', 'country', 'email', 'phone'],
//     notifications: true
// };

function uportLogin(){
    // Add the Request params after the Profile is verified
    uport.requestCredentials({
        requested: ['name', 'phone', 'country'],
        notifications: true // We want this if we want to recieve credentials
    })
        .then((credentials) => {
            localStorage.setItem("name", credentials.name);
                            localStorage.setItem("phone", credentials.phone);
                            localStorage.setItem("country", credentials.country);
                               console.log(location.protocol+"://"+location.host+'/home');
                    location.href = '/kyc';
        });

    // Attest specific credentials
    uport.attestCredentials({
        sub: THE_RECEIVING_UPORT_ADDRESS,
        claim: {
            CREDENTIAL_NAME: CREDENTIAL_VALUE
        },
        exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    })
        .catch(console.log)
}



  