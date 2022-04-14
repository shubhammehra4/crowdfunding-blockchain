// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract FundRaising {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        uint256 voteAmount;
        bool completed;
        uint8 minimumVotePercent;
        mapping(address => bool) hasVoted;
    }

    struct Report {
        uint256 timestamp;
        string link;
    }

    uint32 private totalContributors;
    mapping(address => uint256) private contributions;
    address[] private contributors;

    uint256 private minimumContribution;
    uint256 private deadline;
    uint256 private goal;

    // requests made without sharing any profit
    uint8 private consecutiveRequests = 0;
    Report[] private reports;
    uint256 private raisedAmount = 0;
    address private owner;

    Request[] public requests;

    constructor(
        uint256 _deadline,
        uint256 _goal,
        uint256 _minimumContribution
    ) {
        minimumContribution = _minimumContribution;
        deadline = block.timestamp + _deadline;
        goal = _goal;
        owner = msg.sender;
        Report storage report = reports.push();
        report.link = "Intial report";
        report.timestamp = block.timestamp;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /** ********** Methods *********** */

    // Get fund details
    function getDetails()
        public
        view
        returns (
            address, // owner
            uint256, // raisedAmount
            uint256, // totalContributors
            uint256, // balance
            address[] memory, // contributors
            string[] memory, // descriptions of requests
            uint256[] memory, // values of requests
            address[] memory, // recipients of requests
            bool[] memory // status of requests
        )
    {
        string[] memory descriptions = new string[](requests.length);
        uint256[] memory values = new uint256[](requests.length);
        address[] memory recipients = new address[](requests.length);
        bool[] memory status = new bool[](requests.length);

        for (uint32 i = 0; i < requests.length; i++) {
            Request storage req = requests[i];
            descriptions[i] = req.description;
            values[i] = req.value;
            recipients[i] = req.recipient;
            status[i] = req.completed;
        }

        return (
            owner,
            raisedAmount,
            totalContributors,
            address(this).balance,
            contributors,
            descriptions,
            values,
            recipients,
            status
        );
    }

    // Contribute to the project
    function contribute() public payable {
        require(
            msg.value > minimumContribution,
            "Amount is less than minimum contribution amount"
        );
        require(block.timestamp < deadline, "Project deadline has passed");

        // new investor
        if (contributions[msg.sender] == 0) {
            contributors.push(msg.sender);
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
        uint256 value, // in wei
        uint8 minimumVotePercent
    ) public onlyOwner {
        require(
            value <= address(this).balance,
            "Requested amount is greater than fund balance"
        );
        require(
            consecutiveRequests <= 5,
            "Cannot make 5 consecutive spending request without sharing profits"
        );
        require(
            reports[reports.length - 1].timestamp >= block.timestamp - 30 days,
            "Please share a company report before making a request"
        );
        require(
            minimumVotePercent >= 50,
            "Minimum Vote Percent cannot be less than 50%"
        );

        Request storage newRequest = requests.push();
        newRequest.value = value;
        newRequest.description = description;
        newRequest.recipient = recipient;
        newRequest.minimumVotePercent = minimumVotePercent;
        newRequest.voteAmount = 0;
        newRequest.completed = false;
        consecutiveRequests++;
    }

    // Share company report with stake holders
    function shareReport(string memory link) public onlyOwner {
        Report storage report = reports.push();
        report.link = link;
        report.timestamp = block.timestamp;
    }

    // Get all reports shared
    function getReports() public view returns (Report[] memory) {
        Report[] memory sharedReports = new Report[](reports.length - 1);
        for (uint32 i = 1; i < reports.length; i++) {
            sharedReports[i - 1] = reports[i];
        }

        return sharedReports;
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
        uint256 idx = 0;
        for (; idx < contributors.length; idx++) {
            if (contributors[idx] == msg.sender) break;
        }
        delete contributors[idx];
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

    // Get the amount if a spending request is accepted by contributors
    function makePayment(uint256 index) public onlyOwner {
        Request storage thisRequest = requests[index];
        require(
            thisRequest.completed == false,
            "Payment for the request is already done"
        );
        require(
            thisRequest.voteAmount * 100 >=
                raisedAmount * thisRequest.minimumVotePercent,
            "Not enough votes in favour of the request"
        ); // atleast minimumVotePercent voted

        payable(thisRequest.recipient).transfer(thisRequest.value);
        thisRequest.completed = true;
    }

    // Calculate (x*y)/scale
    // @ref-https://ethereum.stackexchange.com/questions/55701/how-to-do-solidity-percentage-calculation
    function mulScale(
        uint256 x,
        uint256 y,
        uint256 scale
    ) internal pure returns (uint256) {
        uint256 a = x / scale;
        uint256 b = x % scale;
        uint256 c = y / scale;
        uint256 d = y % scale;

        return a * c * scale + a * d + b * c + (b * d) / scale;
    }

    // Owner can share the profit with contributors
    function shareProfit() public payable onlyOwner {
        require(goal <= raisedAmount, "Goal hasn't been reached");
        require(msg.value > 0, "Transaction amount cannot be zero");

        for (uint256 idx = 0; idx < contributors.length; idx++) {
            payable(contributors[idx]).transfer(
                mulScale(
                    msg.value,
                    contributions[contributors[idx]],
                    raisedAmount
                )
            );
        }
        consecutiveRequests = 0;
    }
}
