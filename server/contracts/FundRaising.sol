pragma solidity ^0.8.0;

/**
TODO: 
    1. public function to show progress/ description and previos requests
    2. add Test deploy script for local testing
 */

contract FundRaising {
    mapping(address => uint256) private contributions;
    uint256 public totalContributors; // TOTAL COUNT OF CONTRIBUTORS
    uint256 public minimumContribution;
    uint256 public deadline;
    uint256 public goal;
    uint256 public raisedAmount = 0;
    address public owner;

    struct Request {
        string description;
        uint256 value;
        address recipient;
        uint256 voteAmount;
        bool completed;
        mapping(address => bool) hasVoted;
    }
    Request[] public requests;

    constructor(uint256 deadlineDays, uint256 _goal) {
        minimumContribution = 100000000000000000; // minimum amount to contribute in wei (0.1 ether)
        deadline = block.timestamp + (deadlineDays * 1 days);
        goal = _goal;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /** ********** Methods *********** */

    // Contribute to the project
    function contribute() public payable {
        require(
            msg.value > minimumContribution,
            "Amount is less than minimum contribution amount"
        );
        require(block.timestamp < deadline, "Project deadline has passed");

        // new investor
        if (contributions[msg.sender] == 0) {
            totalContributors++;
        }

        contributions[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    // Get Balance of smart contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Create a request to get money from the fund to spend
    function createSpendingRequest(
        string memory description,
        address recipient,
        uint256 value // in wei
    ) public onlyOwner {
        require(
            value <= address(this).balance,
            "Requested amount is greater than fund balance"
        );

        Request storage newRequest = requests.push();
        newRequest.value = value;
        newRequest.description = description;
        newRequest.recipient = recipient;
        newRequest.voteAmount = 0;
        newRequest.completed = false;
    }

    // Get refund if the fund goal is not reached
    function getRefund() public {
        require(
            block.timestamp > deadline,
            "Project deadline hasn't been reached"
        );
        require(raisedAmount < goal, "Fund Goal amount has been reached");
        require(
            contributions[msg.sender] > 0,
            "You haven't contributed to this fund"
        );

        payable(msg.sender).transfer(contributions[msg.sender]);
        contributions[msg.sender] = 0;
    }

    // Contributors can vote to decide if the spending request is acceptable
    function voteForRequest(uint256 index) public {
        require(
            contributions[msg.sender] > 0,
            "You haven't contributed to this fund"
        );
        Request storage thisRequest = requests[index];
        require(
            thisRequest.hasVoted[msg.sender] == false,
            "Contributor has already voted"
        );

        thisRequest.hasVoted[msg.sender] = true;
        thisRequest.voteAmount += contributions[msg.sender];
    }

    // get the amount if a spending request is accepted by contributors
    function makePayment(uint256 index) public onlyOwner {
        Request storage thisRequest = requests[index];
        require(
            thisRequest.completed == false,
            "Payment for the request is already done"
        );
        require(
            thisRequest.voteAmount * 2 > raisedAmount,
            "Not enough votes in favour of the request"
        ); // atleast 50% voted

        payable(thisRequest.recipient).transfer(thisRequest.value);
        thisRequest.completed = true;
    }
}
