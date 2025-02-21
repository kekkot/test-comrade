import express from 'express';

const app = express();
const PORT = 6738;

try {
    app.get('/GetMock', async (req, res) => {
        
        res.send();
    });
    app.get('/PostMock', async (req, res) => {
        
        res.send();
    });
    app.listen(PORT, () => {
        console.log(`API is listening on port ${PORT}`);
    });
}
catch (error) {
    console.log(error.stack);
    process.exit(0);
}

class mockCompany{
    name: string;
    users: Array<object>;
}