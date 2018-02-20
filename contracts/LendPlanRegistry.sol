pragma solidity ^0.4.8;
import './LendPlan.sol' as Lend;

contract LendPlanRegistry {
  struct LendPlan {
    string planName;
    address planAddress;
    bool deployed;
    bool active;
  }

  LendPlan[] plans;

  //TODO: 
  function createNewPlan() {
    
  }

  //TODO: 
  function updateDeployStatus(address planAddress) {
    
  }

  //TODO: 
  function updateActiveStatus(address planAddress) {
    
  }
}
