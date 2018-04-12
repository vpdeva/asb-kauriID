$(".loader").show();
$(document).ready(() => {
     postRequest(userPost, { name: credentials.name, address: credentials.address })
        .then(res => res.json())
        .then(result =>{
            console.log(result);
            $(".loader").hide();
        })
});
