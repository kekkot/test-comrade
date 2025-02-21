import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 6738;

try {
    app.get('/GenMock', async (req, res) => {
        let company = new mockCompany();
        company.name = 'comrade';
        company.users.push(new mockUser('vadim'));

        let mockDataJson = JSON.stringify(company);
                
        fs.writeFileSync('mockData.json', mockDataJson);

        res.send(`mock generate`);
    });
    app.get('/GetMock', async (req, res) => {
        let rawdata = fs.readFileSync('mockData.json');

        res.send(`${rawdata}`);
    });
    app.listen(PORT, () => {
        console.log(`API is listening on port ${PORT}`);
    });
}
catch (error) {
    console.log(error.stack);
    process.exit(0);
}

class mockCompany {
    name;
    users = [];
}
class mockUser {
    name;
    constructor(name) {
        this.name = name;
    }
}