pragma solidity ^0.4.8;

contract BorrowerRegistry {
  struct Kyc {
    string directorAadhar;
    string companyPan;
    string directorPan;
    string companyRoC;
  }

  struct BorrowerDetails {
    address borrowerAddress;
    string emailAddress;
    string phoneNumber;
    address registeredAddress;
    address[] plansParticipated;
    int credits; // Since credits can become negative kept as signed int
    Kyc kyc;
  }

  BorrowerDetails[] borrowers;

  function addBorrower(
    address borrowerAddress, 
    string emailAddress, 
    string phoneNumber,
    string aadharHash,
    string companyPanHash,
    string directorPanHash,
    string companyRoCHash
  ) external {
    borrowers.length++;
    uint index = borrowers.length;
    borrowers[index].borrowerAddress = borrowerAddress;
    borrowers[index].emailAddress = emailAddress;
    borrowers[index].phoneNumber = phoneNumber;
    borrowers[index].kyc = Kyc({ 
      directorAadhar: aadharHash,
      companyPan: companyPanHash, 
      directorPan: directorPanHash,
      companyRoC: companyRoCHash
    });
  }

  // TODO: 
  function getBorrower() {

  }

  //TODO: Determine KycDetails
  function updateKyc() {

  }

  //TODO: Find the data of particular borrower and update his score
  function updateCreditScore(address borrowerAddress, int newCredit) {
    
  }

  //TODO: 
  function getCreditScore() {

  }
}
