const connection = require('./connection');
const view = require('./viewModel');
const {startOfDay, endOfDay, addDays, startOfMonth, endOfMonth} = require('date-fns');
const fns = require('date-fns');

connection();

const dataPerFetch = 500;

function getData(minDate, maxDate, skip) {
    return view.find(
        {
            viewDate: {
                $gte: minDate,
                $lte: maxDate
            }
        }
    ).select('userId').limit(dataPerFetch).skip(skip);
}

async function dailyViewsData(date) {
    let count = 0;
    let reqNums = 0;
    let keyObj = {};
    while(true) {
        const data = await getData(startOfDay(new Date(date)), endOfDay(new Date(date)), dataPerFetch * reqNums);
        for(const item of data) {
            if(!keyObj.hasOwnProperty(item.userId)) {
                count++;
                keyObj[item.userId] = true;
            }
        }
        reqNums++;
        if(data.length < dataPerFetch) {
            break;
        }
    }
    return count;
}

async function weeklyViewsData(date) {
    let count = 0;
    let reqNums = 0;
    let keyObj = {};
    while(true) {
        const data = await getData(startOfDay(new Date(date)), endOfDay(addDays(new Date(date), 7)), dataPerFetch * reqNums);
        for(const item of data) {
            if(!keyObj.hasOwnProperty(item.userId)) {
                count++;
                keyObj[item.userId] = true;
            }
        }
        reqNums++;
        if(data.length < dataPerFetch) {
            break;
        }
    }
    return count;
}

async function monthlyViewsData(month) {
    let count = 0;
    let reqNums = 0;
    let keyObj = {};
    const mDate =   `2020-${month}-01`;
    while(true) {
        const data = await getData(startOfMonth(new Date(mDate)), endOfMonth(new Date(mDate)), dataPerFetch * reqNums);
        for(const item of data) {
            if(!keyObj.hasOwnProperty(item.userId)) {
                count++;
                keyObj[item.userId] = true;
            }
        }
        reqNums++;
        if(data.length < dataPerFetch) {
            break;
        }
    }
    return count;
}

// dailyViewsData('2020-11-16').then(data => {
//     console.log(data);
// })

// weeklyViewsData('2020-11-18').then(data => {
//     console.log(data);
// })

monthlyViewsData(11).then(data => {
    console.log(data);
})