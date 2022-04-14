class GetCompanies {
    constructor(utility, Company) {
        this.utility = utility;
        this.Company = Company;
    }

    async getCompany(owner_address) {
        if(!owner_address) {
            throw new Error('Invalid request, owner address is missing');
        }
        let [err, companies] = await this.utility.invoker(this.Company.findAll({
            where: {
                owner_address
            }
        }));
        if(err) {
            console.log(err);
            throw new Error('Something went wrong, please try again later');
        }
        //console.log(companies);

        return companies.map((company)=> company.get());

    }


    async getAllCompanies() {
        let [err, companies] = await this.utility.invoker(this.Company.findAll());

        if(err) {
            console.log(err);
            throw new Error('Something went wrong, please try again');
        }
        return companies.map((company)=>company.get());
    }


    
}
module.exports = GetCompanies;