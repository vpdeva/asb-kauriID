function configureLinks() {
    $('.kyc-url').prop('href', kycUrl);
    $('.plans-url').prop('href', plansUrl);
    $('.creditscore-url').prop('href', creditscoreUrl);
    $('.register-url').prop('href', registerUrl);
};

function getRequest(url) {
    return fetch(url, {
        method: 'GET'
    })
}

function postRequest(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

$(document).ready(() => {
    $('body').addClass('skin-' + appSkinColor);
    $('.user-name').text(username);
    configureLinks();
})

console.log(location.pathname);