pragma solidity ^0.4.25;

/**
TODO: 
    1. Add logging for debugging
    2. Add %stake for votes according to amount
    3. Know deadline details
    4. minimumContribution in which unit
    5. public function to show progress
    6. add Test deploy script for local testing
    7. update compiler to latest
 */

contract FundRaising {
    // TODO: adress payable
    mapping(address => uint256) public contributions;
    uint256 public totalContributors; // TOTAL COUNT OF CONTRIBUTORS
    uint256 public minimumContribution;
    uint256 public deadline;
    uint256 public goal;
    uint256 public raisedAmount = 0;
    address public admin;

    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool completed;
        uint256 numberOfVoters;
        mapping(address => bool) hasVoted;
    }
    Request[] public requests;

    constructor(uint256 _deadline, uint256 _goal) public {
        minimumContribution = 1; // minimum amount to contribute
        // TODO: understand
        deadline = block.number + _deadline;
        goal = _goal;
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        require(block.number < deadline);

        if (contributions[msg.sender] == 0) {
            // New investor
            totalContributors++;
        }

        contributions[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getRefund() public {
        require(block.number > deadline);
        require(raisedAmount < goal);
        require(contributions[msg.sender] > 0);

        msg.sender.transfer(contributions[msg.sender]);
        contributions[msg.sender] = 0;
    }

    function createSpendingRequest(
        string memory _description,
        address _recipient,
        uint256 _value
    ) public onlyAdmin {
        Request memory newRequest = Request({
            description: _description,
            value: _value,
            recipient: _recipient,
            numberOfVoters: 0,
            completed: false
        });

        requests.push(newRequest);
    }

    function voteForRequest(uint256 index) public {
        Request storage thisRequest = requests[index];
        require(contributions[msg.sender] > 0);
        require(thisRequest.hasVoted[msg.sender] == false);

        thisRequest.hasVoted[msg.sender] = true;
        thisRequest.numberOfVoters++;
    }

    // Final Payment to company owner
    function makePayment(uint256 index) public onlyAdmin {
        Request storage thisRequest = requests[index];
        require(thisRequest.completed == false);
        require(thisRequest.numberOfVoters > totalContributors / 2); // more than 50% voted
        thisRequest.recipient.transfer(thisRequest.value);
        thisRequest.completed = true;
    }
}
