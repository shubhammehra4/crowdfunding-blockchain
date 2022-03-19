Company {

    id
    ceo
    .....

}

Fund {

    id
    company_id
    title
    company
    description
    amount
    active

}

Decision {

    question
    company_id
    choice[]
    start_time
    end_time

}

Invest -> block_address

Smart Contract Vote {

    allowed_people [{weight, blockchain_address}]
    choice[]
    choice_score[]
    start_time
    end_time

    result

}

# Deploy

- AWS Aurora
- Heroku dedicated
