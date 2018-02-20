$(document).ready(function () {
    $("#kyc-side").addClass('active');
    $('.kyc-file').change((e) => {
        uploadFiles(e.target.files[0])
            .then(({ dirHash, fileName }) => {
                let ipfsLink = ipfsBaseUrl + dirHash +"/"+ fileName;
                $('.' + e.target.id).html('<a href="'+ ipfsLink +'" target="_blank">' + fileName + '</a>');
            });
    })
});

function uploadFiles(file) {
    return addToIpfs([file])
        .then((hash) => ({
            dirHash: hash,
            fileName: file.name
        }))
}