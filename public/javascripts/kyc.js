function setError(eleName) {
    const errMessage = 'Please Fill the Required Field'
    // const errorBlock = ''+ errMessage +'</span>';
    $("div[name=" + eleName + "]").addClass('has-error');
    $(".help-block").text(errMessage);
    $(".help-block").show();
}

function removeError(eleName) {
    $("div[name=" + eleName + "]").removeClass('has-error');
    $(".help-block").hide();
}

function uploadFiles(userName, json, proofs = {}) {
    let files = Object.keys(proofs).map(key => proofs[key]);
    let jsonBlob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    let jsonFile = new File([jsonBlob], userName + "-kyc.json");
    //console.log(jsonFile.name)
    return addToIpfs([jsonFile, ...files])
        .then((hash) => ({
            dirHash: hash,
            kycFile: userName + "-kyc.json",
            proofs: Object.keys(proofs)
        }))
}

$(document).ready(() => {
    let kycDetails = {};
    let files = {};
    $(".help-block").hide();
    // For now assuming that only one file is allowed for each kyc fields kept as first value
    $('.kyc-file').change(e => files[e.target.name] = e.target.files[0]);
    $('input[type=text]').change(e => removeError(e.target.name));
    $("#kyc-form").submit(function (event) {
        event.preventDefault();
        const { name, address } = credentials;
        $(this).serializeArray().map(({ name, value }, key) => {
            if (value !== "")
                kycDetails[name] = value;
            else
                setError(name)
        })
        if (Object.keys(kycDetails).length === $('input[type=text]').length) {
            return uploadFiles(name, kycDetails, files)
                .then((response) => {
                    let body = { name: name, address: address, kyc: response }
                    return postRequest(kycAdd, body)
                })
        }
    });
});
