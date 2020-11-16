const connection = require('./connection');
const views = require('./viewModel');

connection();

views.insertMany([
    {
        userId: 1,
        viewDate: new Date(),
        ProductId: 1
    },
    {
        userId: 5,
        viewDate: new Date(),
        ProductId: 1
    },
    {
        userId: 2,
        viewDate: new Date(),
        ProductId: 1
    },
    {
        userId: 2,
        viewDate: new Date(),
        ProductId: 1
    },
    {
        userId: 1,
        viewDate: new Date('11-10-2020'),
        ProductId: 1
    },
    {
        userId: 2,
        viewDate: new Date('11-10-2020'),
        ProductId: 1
    }
]).then(() => {
    console.log("Insert Success");
})
.catch(err => {
    console.log(err);
})