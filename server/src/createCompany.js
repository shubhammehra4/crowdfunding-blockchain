class CreateCompany {
    constructor(utility, Company) {
        this.utility = utility;
        this.Company = Company;
    }


    async register(company_name,description, owner_address, contract_address, ceo, website, goal, minimum_contribution, deadline) {
        if(!company_name || !owner_address || !contract_address || !website || !description || !ceo || !goal || !minimum_contribution || !deadline) {
            throw new Error('Invalid data, some required fields are missing');
        }
        const company = {
            company_name,
            description,
            owner_address,
            contract_address,
            ceo,
            website,
            goal,
            minimum_contribution,
            deadline
        }
        let [err, result] = await this.utility.invoker(this.Company.create(company));
        if(err) 
        {
            console.log(err);
            throw new Error('Error registering the company');
        }
        return {success: true};
    }
}
module.exports = CreateCompany;