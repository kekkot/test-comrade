const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const users = require('./users.json');

const app = express();
const PORT = 6738;
const tokenKey = '1a2b-3c4d-5e6f-7g8h';

try {
    app.use(express.json());

    app.use((req, res, next) => {
        if (req.headers.authorization) {
            jwt.verify(
                req.headers.authorization.split(' ')[1],
                tokenKey,
                (err, payload) => {
                    if (err) next();
                    else if (payload) {
                        for (let user of users) {
                            if (user.id === payload.id) {
                                req.user = user;
                                next();
                            }
                        }

                        if (!req.user) next();
                    }
                }
            );
        }
        next();
    })
    app.post('/auth', (req, res) => {
        for (let user of users) {
            if (
                req.body.login === user.login &&
                req.body.password === user.password
            ) {
                return res.status(200).json({
                    id: user.id,
                    login: user.login,
                    token: jwt.sign({ id: user.id }, tokenKey),
                });
            }
        }
    
        return res
            .status(404)
            .json({ message: 'User not found' });
    });

    app.get('/GenMock', async (req, res) => {        
        if(req.user){
            let company = new mockCompany();
            company.name = 'comrade';
            company.users.push(new mockUser('vadim'));
    
            let mockDataJson = JSON.stringify(company);
    
            fs.writeFileSync('mockData.json', mockDataJson);
    
            res.send(`mock generate`);
        }
        else{
            return res
            .status(401)
            .json({ message: 'Not authorized' }); 
        }
        
    });
    app.get('/GetMock', async (req, res) => {
        if(req.user){
            let rawdata = fs.readFileSync('mockData.json');

            res.send(`${rawdata}`);
        }
        else{
            return res
            .status(401)
            .json({ message: 'Not authorized' }); 
        }
        
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