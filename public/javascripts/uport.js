const appName = 'KauriID';
const Connect = window.uportconnect.Connect;
const SimpleSigner = window.uportconnect.SimpleSigner;

// Uncomment after sometime since the App Profile is not deployed yet
/* const uport = new Connect(appName, {
    clientId: '2ojLdqE5tXTFiHkVaAYYWqD6GpJvyRPjq3A',
    network: 'rinkeby',
    signer: SimpleSigner('4f8c71fc8b2327bd3717b9d602facfd3f8d5f512f3a5d4de74f36365b3c092f6')
}); */

const uport = new Connect(appName);

const web3 = uport.getWeb3();
const uportRequest = {
    requested: ['name', 'avatar', 'country', 'email', 'phone'],
    notifications: true
}

function uportLogin(){
    // Add the Request params after the Profile is verified
    uport.requestCredentials()
        .then((credentials) => {
            window.localStorage.setItem('credentials', JSON.stringify(credentials));
            // console.log(location.protocol+"://"+location.host+'/home');
            location.href = '/home';
        })
        .catch(console.log)
}



  