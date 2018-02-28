// Change the App Skin Color here
const appSkinColor = "yellow";

// API calls
const userPost = "/home";
const kycAdd = "/kyc";
const kycGet = "/kyc/details";

// IP is kept static bind here dynamically;
const dashboardUrl = "/dashboard";
const kycUrl = "/kyc";
const plansUrl = "/plans";
const creditscoreUrl = "/creditscore";

const credentials = window.localStorage.getItem('credentials') ? JSON.parse(window.localStorage.getItem('credentials')) : null;
const isLoggedIn = false;

const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/";
const username = "Vishnu's Business";
