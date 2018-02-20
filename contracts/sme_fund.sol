pragma solidity ^0.4.0;

contract SmeFund {
    
    uint128 number_of_members = 0;
    uint128 monthly_installment = 0;
    uint128 total_months = 0;
    uint128 start_time = 0;
    address[] public participents;
    
    //Planned to call at the time of create funding proposal.
    function SmeFund(uint128 number_of_members, uint128 monthly_installment, uint128 total_months, uint128 start_time) {
        number_of_members = number_of_members;
        monthly_installment = monthly_installment;
        total_months = total_months;
        start_time = start_time;
    }
    
    
    //planned to call at start time of the funding cycle.
    function initilizeFunding(address[] par)
    {
        // As planned a funding proposal must be satisfy numbaer of members required.
        if(par.length == number_of_members)
        {
            //assignning passed participents to internal list of participents.
            participents = par;
        }
    }
    
    
    function drawProposal()
    {
        
    }
    
    function monthlyDraw()
    {
        
    }

}