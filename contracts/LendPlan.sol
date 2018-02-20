pragma solidity ^0.4.8;

contract LendPlan {
  enum Periodicity { Daily, Weekly, Monthly }

  struct PaymentDetails {
    uint paidInstAmount;
    uint loanInterest;
    uint depositIntesest;
    uint returnedBenefits;
    uint penaltyAmount;
  }

  struct ParticipantDetails {
    address participantAddress;
    uint wallet;
    bool redeemed;
    uint redeemedAmount;
    uint redeemedOn;
    PaymentDetails[] payments;
  }

  struct CyclicSummary {
    uint totalCollection;
    uint maxWithdrawalAmount;
    uint maxBorrowersAllowed;
    uint numOfRedemption;
    uint amountRedeemed;
    uint amountInvested;
    uint roiReturned;
    uint lendInterestAmount;
    uint depositInterestRate;
    uint depositInterestAmount;
    uint commissionAmount;
  }

  string public planName;
  uint private startDate;
  uint private installmentAmount;
  uint private lendInterest;
  Periodicity private periodicity; 
  uint private numOfCycles;
  uint private currentCycle;
  uint private participantsCount;
  CyclicSummary[] private summary;
  ParticipantDetails[] public participants;

  function LendPlan(
    string _planName,
    uint _startDate,
    uint _installmentAmount,
    uint _numOfCycles,
    uint _numOfParticipants,
    uint _lendInterest,
    address[] _participants
  ) {
    planName = _planName;
    startDate = _startDate;
    installmentAmount = _installmentAmount;
    lendInterest = _lendInterest;
    numOfCycles = _numOfCycles;
    participantsCount = _numOfParticipants;
    currentCycle = 0;
    //addParticipants(_participants);
  }

  //TODO: 
  function addParticipants(address[] _participants) external {
    for (uint i = 0; i < _participants.length; i++) {
      participants[i].participantAddress = _participants[i];
      participants[i].wallet = 0;
      participants[i].redeemed = false;
      // initPayments(i, numOfCycles);
    }
  }
  
  function initPayments(uint participantIndex, uint cyclesCount) internal {
    for (uint i = 0; i < cyclesCount; i++) {
      participants[participantIndex].payments[i] = PaymentDetails({
        paidInstAmount: 0,
        loanInterest: 0,
        depositIntesest: 0,
        returnedBenefits: 0,
        penaltyAmount: 0
      });
    }
  }
  
  function getParticipantsLength() constant returns (uint) {
      return participants.length;
  }

  function startNextCycle() {
    currentCycle++;
  }

  function calculateMaxWithdrawal(uint cycleNum) constant internal returns (uint) {
    uint totalCollection = summary[currentCycle].totalCollection;
    uint interestAmount = (totalCollection * lendInterest * (numOfCycles - currentCycle)) / numOfCycles * 100; 
    return totalCollection - interestAmount;
  }

  function setEligibleBorrowers() {
    uint maxBorrowers = calculateEligibleBorrowers(currentCycle);
    summary[currentCycle].maxBorrowersAllowed = maxBorrowers;
    summary[currentCycle].maxWithdrawalAmount = calculateMaxWithdrawal(currentCycle);
  }

  function calculateAmountInvested(uint cycleNum) constant internal returns (uint) {
    uint totalCol = summary[currentCycle].totalCollection;
    uint numOfBorrowers = summary[currentCycle].numOfRedemption;
    return totalCol - (installmentAmount * numOfCycles * numOfBorrowers);
  }

  function calculateRoi(uint cycleNum) constant internal returns (uint) {
    uint roiReturn = 0;
    if(cycleNum > 0){
      roiReturn = (summary[cycleNum - 1].amountInvested * summary[cycleNum - 1].depositInterestRate) / numOfCycles;
    }
    return roiReturn;
  }

  function setCollectionForNextCyle (uint cycleNum, uint amountInvested) {
    if(cycleNum+1 != numOfCycles)
      summary[cycleNum+1].totalCollection = amountInvested;
  }

  function setCyclicSummary(uint _numOfRedemption) {
    summary[currentCycle].amountInvested = calculateAmountInvested(currentCycle);
    summary[currentCycle].numOfRedemption = _numOfRedemption;
    summary[currentCycle].amountRedeemed = summary[currentCycle].maxWithdrawalAmount * _numOfRedemption;
    summary[currentCycle].lendInterestAmount = (installmentAmount*numOfCycles*summary[currentCycle].numOfRedemption) - summary[currentCycle].amountRedeemed;
    summary[currentCycle].depositInterestAmount = (summary[currentCycle].depositInterestRate * summary[currentCycle].amountInvested)/12;
    summary[currentCycle].roiReturned = calculateRoi(currentCycle);
  }

  function getCyclicSummary(uint cycleNum) constant returns (
      uint totalCollection,
      uint maxWithdrawalAmount,
      uint maxBorrowersAllowed,
      uint numOfRedemption,
      uint amountRedeemed,
      uint amountInvested,
      uint roiReturned,
      uint lendInterestAmount,
      uint depositInterestRate,
      uint depositInterestAmount,
      uint commissionAmount
      ) {
      totalCollection = summary[cycleNum-1].totalCollection;
      maxWithdrawalAmount = summary[cycleNum-1].maxWithdrawalAmount;
      maxBorrowersAllowed = summary[cycleNum-1].maxBorrowersAllowed;
      numOfRedemption = summary[cycleNum-1].numOfRedemption;
      amountRedeemed = summary[cycleNum-1].amountRedeemed;
      amountInvested = summary[cycleNum-1].amountInvested;
      roiReturned = summary[cycleNum-1].roiReturned;
      lendInterestAmount = summary[cycleNum-1].lendInterestAmount;
      depositInterestRate = summary[cycleNum-1].depositInterestRate;
      depositInterestAmount = summary[cycleNum-1].depositInterestAmount;
      commissionAmount = summary[cycleNum-1].commissionAmount;
  }  

  function calculateEligibleBorrowers(uint cycleNum) constant internal returns (uint) {
    uint eligibleBorrowers = 0;
    for (uint i = 0; i < participants.length; i++) {
      if(!participants[i].redeemed)
        eligibleBorrowers++;
    }
    return eligibleBorrowers;
  }

  function getCurrentCycleNum() constant returns(uint) {
    return currentCycle + 1;
  }

  function getParticipantIndex(address participantAddress) constant private returns (uint) {
    uint index = 0;
    while((participants[index].participantAddress != participantAddress) && (index < participantsCount)){
      index++;
    }
    return index;
  }

  //TODO: 
  function getParticipantDetails(address participantAddress) constant returns (uint wallet) {
    uint index = getParticipantIndex(participantAddress);
    wallet = participants[index].wallet;
  }

  function getParticipantPaymentDetails() {

  }
  
  function calculateLoanInterestToReturn() constant internal returns (uint interestAmount) {
    uint cycleNum = summary.length - 1;
    interestAmount = (summary[cycleNum].numOfRedemption * installmentAmount * numOfCycles) - summary[cycleNum].amountRedeemed;
  }

  //TODO: 
  function calculateDepositInterest() constant internal returns (uint) {
    return (summary[currentCycle].totalCollection * summary[currentCycle].depositInterestRate) / (numOfCycles*100);
  }

  //TODO: 
  function distributeInterest(uint loanInterest) internal {
    for (uint i=0; i<participants.length; i++) {
      if (!participants[i].redeemed)
        participants[i].payments[currentCycle].loanInterest = loanInterest;
    }
  }

  //TODO: 
  function sendInstallment(address participantAddress, uint _installmentAmount) external {
    uint index = getParticipantIndex(participantAddress);
    participants[index].payments[currentCycle].paidInstAmount = _installmentAmount;
    summary[currentCycle].totalCollection += _installmentAmount;
  }

  //TODO: 
  function lendLoan(address participantAddress) external {
    uint index = getParticipantIndex(participantAddress);
    participants[index].redeemed = true;
    participants[index].redeemedOn = now;
    participants[index].redeemedAmount = summary[currentCycle].maxWithdrawalAmount;
  }
  
  //TODO: 
  function setDepositInterest(uint depositInterest) {
    summary[currentCycle].depositInterestRate = depositInterest;
  }

  //TODO:
  function setPeriodicity(uint index) {
    
  }

  //TODO: 
  function handleDefaulters() {
    
  }
}
