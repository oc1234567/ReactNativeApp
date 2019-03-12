/*
 * @Author: yjz 
 * @Date: 2019-01-25 09:50:31 
 * @Last Modified by: yjz
 * @Last Modified time: 2019-03-12 15:48:20
 */

/** 负责处理各项逻辑操作 */
// import { Storage } from '@ctrip/crn'
import { Storage } from './Util/storage'

/**
 * 缓存keys(不能有_)
 */
const TOUR_ZHANGBEN_PLAN_MONEY = 'TOURZHANGBENPLANMONEY';
const TOUR_ZHANGBEN_COPY_RIGHT = 'TOURZHANGBENCOPYRIGHT';
const TOUR_ZHANGBEN_MONEY_BILL_LIST = 'TOURZHANGBENMONEYBILLLIST';
const TOUR_ZHANGBEN_MONEY_BILL_COST_TYPE = 'TOURZHANGBENMONEYBILLCOSTTYPE';
const TOUR_ZHANGBEN_MONEY_BILL_TYPE = 'TOURZHANGBENMONEYBILLTYPE';
const TOUR_ZHANGBEN_MONEY_BILL_LIST_FILTER = 'TOURZHANGBENMONEYBILLLISTFILTER';

//获取当前时间
function getCurrentTime() {
    let date = new Date();
    return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getMilliseconds()];
}

//获取某年某月有多少天
function getDaysInOneMonth(year, month) {
    mouth = parseInt(month, 10) + 1;
    var d = new Date(year+"/"+month+"/0");
    return d.getDate();
}

//获取预算
function getPlanMoney(callback) {
    Storage.load({
        key: TOUR_ZHANGBEN_PLAN_MONEY,
        domain: 'tour'
    }, (error, value) => {
        if (value) {
            let data = value;
            if (typeof value === "string") {
                let data = JSON.parse(value);
                callback(data);
            }else {
                callback(data);
            }
            
        }
    })
}

//设置预算
function setPlanMoney(money) {
    Storage.save({key: TOUR_ZHANGBEN_PLAN_MONEY, value:money, domain: 'tour'});
}

//获取版权
function getCopyRight(callback) {
    Storage.load({
        key: TOUR_ZHANGBEN_COPY_RIGHT,
        domain: 'tour'
    }, (error, value) => {
        if (value) {
            let data = value;
            if (typeof value === "string") { 
                let data = JSON.parse(value);
                callback(data);
            }else {
                callback(data);
            }
            
        }
    })
}
//设置版权
function setCopyRight(money) {
    Storage.save({key: TOUR_ZHANGBEN_COPY_RIGHT, value:money, domain: 'tour'});
}
//清空账单数据 (慎用)
function removeBillData() {
    console.log('clear bill data')
    Storage.remove({
        key: TOUR_ZHANGBEN_MONEY_BILL_LIST,
        domain: 'tour'
    });
}
//记录一笔 (按天)
function addCostForDay(cost = {money: 0, remark:'消费', costtype: '基本消费', billtype: '家庭账本', isIncoming: false, isPriorityHigh:false}, callback) {
    const [year, month, day, hours, minutes, seconds] = getCurrentTime();
    //更新日账单
    let key = `${hours}_${minutes}_${seconds}`;
    let money = parseFloat(cost.money);
    cost = {...cost, money:money, time:`${year}_${month}_${day}_${hours}_${minutes}_${seconds}`};
   
    getBillForAll(BillData => {
        getBillForDay(BillData, year, month, day, ((data)=>{
            let billforday = Object.defineProperty(data?data:{}, key, {value: cost, enumerable: true});
            let allvalue = cost.isIncoming ? (data ? data.all : 0) + money : (data ? data.all : 0) - money;
            billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
            key = `${day}`;
            //更新月账单
            getBillForMonth(BillData, year, month, (data) => {
                let billformonth = Object.defineProperty(data?data:{}, key, {value: billforday, enumerable: true});
                let allvalue = cost.isIncoming ? (data ? data.all : 0) + money : (data ? data.all : 0) - money;
                billformonth = Object.defineProperty(billformonth, 'all', {value: allvalue, enumerable: true, writable: true});
                key = `${month}`;
                //更新年账单
                getBillForYear(BillData, year, (data) => {
                    let billforyear = Object.defineProperty(data?data:{}, key, {value: billformonth, enumerable: true});
                    let allvalue = cost.isIncoming ? (data ? data.all : 0) + money : (data ? data.all : 0) - money;
                    billforyear = Object.defineProperty(billforyear, 'all', {value: allvalue, enumerable: true, writable: true});
                    key = `${year}`;
                    //更新总账单
                    // getBillForAll((data) => {
                        let billforall = Object.defineProperty(BillData?BillData:{}, key, {value: billforyear, enumerable: true});
                        let billlforall_allvalue = cost.isIncoming ? (BillData ? BillData.all ? BillData.all : 0 : 0) + money : (BillData ? BillData.all ? BillData.all : 0 : 0) - money;
                        billforall = Object.defineProperty(billforall, 'all', {value: billlforall_allvalue, enumerable: true, writable: true});
                        setBill(billforall);
                        getBillForAll((data) => {
                            callback('success');
                        })
                    // })
                });
            });
        }))
    })
    
}
//设置总账单 todo :JsonJSOpar error
function setBill(value) {
    Storage.save({key: TOUR_ZHANGBEN_MONEY_BILL_LIST, value:JSON.stringify(value), domain: 'tour'});
}
//获取日账单
function getBillForDay(data, year, month, day, callback) {
    getBillForMonth(data, year, month, (monthbill) => {
        if (monthbill) {
            let daybill = monthbill[day];
            if (daybill) {
                callback(daybill);
            }else {
                callback();
            }
        }else {
            callback();
        }
    })
}
//获取月账单
function getBillForMonth(data, year, month, callback) {
    getBillForYear(data, year, (yearbill) => {
        if (yearbill) {
            let monthbill = yearbill[month];
            if (monthbill) {
                callback(monthbill);
            }else {
                callback();
            }
        }else {
            callback();
        }
    })
}
//获取年账单
function getBillForYear(data, year, callback) {
    if (data) {
        let yearbill = data[year];
        if (yearbill) {
            callback(yearbill);
        }else {
            callback();
        }
        
    }else {
        getBillForAll(bill => {
            if (bill) {
                let yearbill = bill[year];
                callback(yearbill);
            }else {
                callback();
            }
        })
    }
   
}
//获取总账单
function getBillForAll(callback) {
    Storage.load({
        key: TOUR_ZHANGBEN_MONEY_BILL_LIST,
        domain: 'tour'
    }, (error, value) => {
        if (value) {
            let data = value;
            if (typeof value === "string") {
                let data = JSON.parse(value);
                callback(data); 
            }else {
                callback(data); 
            }
            
        }else {
            callback();
        }
    })
}

//获取总消费 (按天)
function getCostforDay(year, month, day, callback) {
    getBillForDay(null, year, month, day, ((data) => {
        if (data) {
            callback(data.all);
        }else {
            callback(0);
        }
    }));
}

//获取总消费 (按月)
function getCostForMonth(year, month, callback) {
    getBillForMonth(null, year, month, ((data) => {
        if (data) {
            callback(data.all);
        }else {
            callback(0);
        }
    }));
}


//获取总消费 (按年)
function getCostForYear(year, callback) {
    getBillForYear(null, year, ((data) => {
        if (data) {
            callback(data.all);
        }else {
            callback(0);
        }
    }));
}
//获取总消费 (历年)
function getCostForAll(callback) {
    getBillForAll((data) => {
        if (data) {
            callback(data.all);
        }else {
            callback(0);
        }
    });
}
//获取总账单有多少消费日(Format:2019-1-1)
function getAllDaysForAllBill(callback) {
    let daysArray = [];
    getBillForAll((data) => {
        if (data) {
            let years = removeAllKey(Object.keys(data));
            for (let i = 0; i < years.length; i++) {
                const year = years[i];
                const yearCost = data[year];
                let months = removeAllKey(Object.keys(yearCost));
                for (let k = 0; k < months.length; k++) {
                    const month = months[k];
                    const monthCost = data[year][month];
                    let days = removeAllKey(Object.keys(monthCost));
                    for (let j = 0; j < days.length; j++) {
                        const day = days[j];
                        daysArray.push(`${year}-${month}-${day}`);
                    }
                }
            }    
        }
        callback(daysArray);
    })
    
}
//获取年账单有多少消费日
// function getAllDaysForYearBill(year, callback) {
//     let daysArray = [];
//     getAllMonthsForYearBill(year, ((data) => {
//         for (let i = 0; i < data.length; i++) {
//             const month = data[i];
//             getAllDaysForMonthBill(year, month, ((data) => {
//                 for (let i = 0; i < data.length; i++) {
//                     const day = data[i];
//                     daysArray.push(`${year}-${month}-${day}`);
//                 }
//             }))
//         }
//         callback(daysArray);
//     }))
// }
//获取月账单有多少消费日
// function getAllDaysForMonthBill(year, month, callback) {
//     let daysArray = [];
//     getAllDaysForMonthBill(year, month, ((data) => {
//         for (let i = 0; i < data.length; i++) {
//             const day = data[i];
//             daysArray.push(`${year}-${month}-${day}`);
//         }
//         callback(daysArray);
//     }))
// }
//获取总账单有多少消费年
function getAllYearsForAllBill(callback) {
    getBillForAll((data) => {
        if (data) {
            let keys = removeAllKey(Object.keys(data));
            callback(keys)
        }else {
            callback([])
        }
    })
}
//获取年账单有多少消费月
function getAllMonthsForYearBill(year, callback) {
    getBillForYear(null, year, ((data) => {
        if (data) {
            let keys = removeAllKey(Object.keys(data));
            callback(keys)
        }
    }))
}
//获取月账单有多少消费日
function getAllDaysForMonthBill(year, month, callback) {
    getBillForMonth(null, year, month, ((data) => {
        if (data) {
            let keys = removeAllKey(Object.keys(data));
            callback(keys)
        }
    }))
}
//获取日账单有多少消费条目 即消费日的所有消费列表 (Format [{money: 10, remark:‘Coffee’, time: '2019-01-01-13-59-ms'}])
function getAllCostsForDayBill(year, month, day, callback) {
    let costsArray = [];
    getBillForDay(null, year, month, day, ((data) => {
        if (data) {
            let keys = removeAllKey(Object.keys(data));
            for (let i = 0; i < keys.length; i++) {
                const time = keys[i];
                const cost = data.time;
                costsArray.push(cost);
            }
            callback(costsArray);
        }
    }))
}
//去除keys中的all
function removeAllKey(keys) {
    let newKeys = [];
    let allIndex = keys.indexOf('all');
    if (allIndex == 0) {
        newKeys = keys.slice(1);
    }else if (allIndex == keys.length - 1) {
        newKeys = keys.slice(0, keys.length - 1);
    }else {
        newKeys = keys.slice(0, allIndex).concat(keys.slice(allIndex+1));
    }
    return newKeys;
}

//账单类别
function addCostType(costtype = '', callback = ()=>{}) {
    getCostAllTypes((value) => {
        //let data = value ? value.slice() : ['基本消费'];
        let data = value ? value.slice() : [];
        data.push(costtype);
        Storage.save({key: TOUR_ZHANGBEN_MONEY_BILL_COST_TYPE, value:JSON.stringify(data), domain: 'tour'});
        callback('success');
    })
}

function getCostAllTypes(callback) {
    Storage.load({
        key: TOUR_ZHANGBEN_MONEY_BILL_COST_TYPE,
        domain: 'tour'
    }, (error, value) => {
        if (value) {
            let data = value;
            if (typeof value === "string") {
                let data = JSON.parse(value);
                let isArr = Array.isArray(data);
                if (!isArr) {
                    value = null;
                }
                callback(data);
            }else {
                callback(data);
            }
            
        }else {
            callback();
        }
    })
}
function removeAllCostTypes() {
    console.log('clear all costtypes')
    Storage.remove({key: TOUR_ZHANGBEN_MONEY_BILL_COST_TYPE, domain: 'tour'}); 
}
//账本类别
function addBillType(billtype = '', callback = ()=>{}) {
    getAllBillTypes((value) => {
        //let data = value ? value.slice() : ['家庭账本'];
        let data = value ? value.slice() : [];
        data.push(billtype);
        Storage.save({key: TOUR_ZHANGBEN_MONEY_BILL_TYPE, value:JSON.stringify(data), domain: 'tour'});
        callback('success');
    })
}

function getAllBillTypes(callback) {
    Storage.load({
        key: TOUR_ZHANGBEN_MONEY_BILL_TYPE,
        domain: 'tour'
    }, (error, value) => {
        if (value) {
            let data = value;
            if (typeof value === "string") {
                let data = JSON.parse(value);
                let isArr = Array.isArray(value);
                if (!isArr) {
                    value = null;
                }
                callback(data);
            }else {
                callback(data);
            }
            
        }else {
            callback();
        }
    })
}

function removeAllBillTypes() {
    console.log('clear all billtypes')
    Storage.remove({key: TOUR_ZHANGBEN_MONEY_BILL_TYPE, domain: 'tour'});    
}

//筛选类别
function removeFilter() {
    console.log('clear filter')
    Storage.remove({
        key: TOUR_ZHANGBEN_MONEY_BILL_LIST_FILTER,
        domain: 'tour'
    });
}
// let value = {
//     isIncoming, //isRequred
//     isOutcoming, //isRequred
//     isPriorityHigh, //isRequred
//     isPriorityLow, //isRequred
//     costtypes, //isRequred
//     billtypes  //isRequred
// }
function setFilterForIsIncoming(isIncoming, callback) {
    getFilter((filter) => {
        setFilter({...filter, isIncoming})
        callback();
    })
}
function setFilterForIsOutcoming(isOutcoming, callback) {
    getFilter((filter) => {
        setFilter({...filter, isOutcoming})
        callback();
    })
}
function setFilterForIsPriorityHigh(isPriorityHigh, callback) {
    getFilter((filter) => {
        setFilter({...filter, isPriorityHigh})
        callback();
    })
}
function setFilterForIsPriorityLow(isPriorityLow, callback) {
    getFilter((filter) => {
        setFilter({...filter, isPriorityLow})
        callback();
    })
}
//consition same name...
function setFilterForCostType(costtype, callback) {
    getFilter((filter) => {
        let temp = filter.costtypes.slice();
        let ishaved = temp.includes(costtype);
        if (ishaved) {
            let index = temp.indexOf(costtype);
            if (index == 0) {
                temp = temp.slice(1);
            }else if (index == temp.length - 1) {
                temp = temp.slice(0, temp.length - 1);
            }else {
                temp = temp.slice(0, index).concat(temp.slice(index+1));
            }
        }else {

            temp.push(costtype);
        }
        setFilter({...filter, costtypes:temp})
        callback();
    
    })
}

function setFilterForAddCostType(costtype, callback) {
    getFilter((filter) => {
        let temp = filter.costtypes.slice();
        let ishaved = temp.includes(costtype);
        if (ishaved) {
            
        }else {

            temp.push(costtype);
        }
        setFilter({...filter, costtypes:temp})
        callback();
    
    })
}

function setFilterForAddBillType(billtype, callback) {
    getFilter((filter) => {
        let temp = filter.billtypes.slice();
        let ishaved = temp.includes(billtype);
        if (ishaved) {

        }else {
            temp.push(billtype);
        }
        
        setFilter({...filter, billtypes:temp})
        callback();
    })
}

function setFilterForBillType(billtype, callback) {
    getFilter((filter) => {
        let temp = filter.billtypes.slice();
        let ishaved = temp.includes(billtype);
        if (ishaved) {
            temp = removeItemFromArray(billtype, temp)
        }else {
            temp.push(billtype);
        }
        
        setFilter({...filter, billtypes:temp})
        callback();
    })
}
function removeItemFromArray(item, array) {
    let temp = array.slice();
    let index = array.indexOf(item);
    if (index == 0) {
        temp = array.slice(1);
    }else if (index == array.length - 1) {
        temp = array.slice(0, array.length - 1);
    }else {
        temp = array.slice(0, index).concat(array.slice(index+1));
    }
    return temp;
}
function setFilter(value) {
    Storage.save({key: TOUR_ZHANGBEN_MONEY_BILL_LIST_FILTER, value:JSON.stringify(value), domain: 'tour'});
}
function getFilter(callback) {
    Storage.load({
        key: TOUR_ZHANGBEN_MONEY_BILL_LIST_FILTER,
        domain: 'tour'
    }, (error, value) => {
        if (value) {
            let data = value;
            if (typeof value === "string") {
                let data = JSON.parse(value);
                callback(data);
            }else {
                callback(data);
            }
            
        }else {
            getCostAllTypes((value) => {
                let costtypes = value ? value.slice() : ['基本消费'];
                getAllBillTypes((value) => {
                    let billtypes = value ? value.slice() : ['家庭账本'];
                    let defaultFilter = {
                        isIncoming: true,
                        isOutcoming: true,
                        isPriorityHigh: true,
                        isPriorityLow: true,
                        costtypes: costtypes,
                        billtypes: billtypes,
                    };
                    setFilter(defaultFilter);
                    callback(defaultFilter);
                })
            })
        }
    })
}
function getFilteredBills(callback) {
    getFilter((filter) => {
        let {isIncoming, isOutcoming, isPriorityHigh, isPriorityLow, costtypes, billtypes} = filter;
        getBillForAll(data => {
            if (data) {
                let filteredBill;
                //筛选账单
                let years = removeAllKey(Object.keys(data));
                for (let i = 0; i < years.length; i++) {
                    const year = years[i];
                    const yearCost = data[year];
                    let months = removeAllKey(Object.keys(yearCost));
                    for (let k = 0; k < months.length; k++) {
                        const month = months[k];
                        const monthCost = data[year][month];
                        let days = removeAllKey(Object.keys(monthCost));
                        for (let j = 0; j < days.length; j++) {
                            const day = days[j];
                            const dayCost = data[year][month][day];
                            let costs = removeAllKey(Object.keys(dayCost));
                            
                            for (let n = 0; n < costs.length; n++) {
                                const time = costs[n];
                                const cost = data[year][month][day][time];
                                
                                if (isIncoming && !isOutcoming) {
                                    if (!cost.isIncoming) {
                                        continue
                                    }
                                }

                                if (isOutcoming && !isIncoming) {
                                    if (cost.isIncoming) {
                                        continue
                                    }
                                }

                                if (isPriorityHigh && !isPriorityLow) {
                                    if (!cost.isPriorityHigh) {
                                        continue
                                    }
                                }

                                if (isPriorityLow && !isPriorityHigh) {
                                    if (cost.isPriorityHigh) {
                                        continue
                                    }
                                }
                                if (isPriorityHigh && !isPriorityLow) {
                                    if (cost.isPriorityHigh) {
                                        let costtype = cost.costtype;
                                        let billtype = cost.billtype;
                                        if (costtypes.includes(costtype) && billtypes.includes(billtype)) {
        
                                            if (filteredBill) {
                                                if (Object.keys(filteredBill).includes(year)) {
                                                    const yearObject = filteredBill[year];
                                                    if (Object.keys(filteredBill[year]).includes(month)) {
                                                        const monthObject = filteredBill[year][month];
                                                        if (Object.keys(filteredBill[year][month]).includes(day)) {
                                                            const dayObject = filteredBill[year][month][day];
                                                            let billforday = Object.defineProperty(dayObject, time, {value: cost, enumerable: true});

                                                            let allvalue = dayObject.all;
                                                            if (cost.isIncoming) {
                                                                allvalue += cost.money;
                                                            }else {
                                                                allvalue -= cost.money;
                                                            }
                                                            billforday = Object.defineProperty(dayObject, 'all', {value: allvalue, enumerable: true, writable: true});
                                                
                                                        }else {
                                                            let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                            let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                            billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
            
                                                            let billformonth = Object.defineProperty(monthObject, day, {value: billforday, enumerable: true});
                                                            
                                                        }
                                                        let allvalue = monthObject.all;
                                                        if (cost.isIncoming) {
                                                            allvalue += cost.money;
                                                        }else {
                                                            allvalue -= cost.money;
                                                        }
                                                        let billformonth = Object.defineProperty(monthObject, 'all', {value: allvalue, enumerable: true, writable: true});

                                                    }else {
                                                        let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                        let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                        billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
            
                                                        let billformonth = Object.defineProperty({}, day, {value: billforday, enumerable: true});
                                                        // allvalue = cost.money;
                                                        billformonth = Object.defineProperty(billformonth, 'all', {value: allvalue, enumerable: true, writable: true});
                                    
                                                        let billforyear = Object.defineProperty(yearObject, month, {value: billformonth, enumerable: true});
                                                    
                                                    }

                                                    let allvalue = yearObject.all;
                                                    if (cost.isIncoming) {
                                                        allvalue += cost.money;
                                                    }else {
                                                        allvalue -= cost.money;
                                                    }
                                                    let billforyear = Object.defineProperty(yearObject, 'all', {value: allvalue, enumerable: true, writable: true});

                                                }else {
                                                    let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                    let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                    billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
            
                                                    let billformonth = Object.defineProperty({}, day, {value: billforday, enumerable: true});
                                                    // allvalue = cost.money;
                                                    billformonth = Object.defineProperty(billformonth, 'all', {value: allvalue, enumerable: true, writable: true});
                                
                                                    let billforyear = Object.defineProperty({}, month, {value: billformonth, enumerable: true});
                                                    // allvalue = cost.money;
                                                    billforyear = Object.defineProperty(billforyear, 'all', {value: allvalue, enumerable: true, writable: true});
                                                    
                                                    filteredBill = Object.defineProperty(filteredBill, year, {value: billforyear, enumerable: true});
                        
                                                }
                                                
                                                let allvalue = filteredBill.all;
                                                if (cost.isIncoming) {
                                                    allvalue += cost.money;
                                                }else {
                                                    allvalue -= cost.money;
                                                }
                                                filteredBill = Object.defineProperty(filteredBill, 'all', {value: allvalue, enumerable: true, writable: true});


                                            }else {
                                                    let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                    let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                    billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
            
                                                    let billformonth = Object.defineProperty({}, day, {value: billforday, enumerable: true});
                                                    // allvalue = cost.money;
                                                    billformonth = Object.defineProperty(billformonth, 'all', {value: allvalue, enumerable: true, writable: true});
                                
                                                    let billforyear = Object.defineProperty({}, month, {value: billformonth, enumerable: true});
                                                    // allvalue = cost.money;
                                                    billforyear = Object.defineProperty(billforyear, 'all', {value: allvalue, enumerable: true, writable: true});
                                                    
                                                    filteredBill = Object.defineProperty({}, year, {value: billforyear, enumerable: true});
                                                    // let billlforall_allvalue = cost.money;
                                                    filteredBill = Object.defineProperty(filteredBill, 'all', {value: allvalue, enumerable: true, writable: true});
                        
                                            }
                                            
                                        }
                                    }
                                }

                                if (isPriorityLow && !isPriorityHigh) {
                                    if (!cost.isPriorityHigh) {
                                        let costtype = cost.costtype;
                                        let billtype = cost.billtype;
                                        if (costtypes.includes(costtype) && billtypes.includes(billtype)) {
        
                                            if (filteredBill) {
                                                if (Object.keys(filteredBill).includes(year)) {
                                                    const yearObject = filteredBill[year];
                                                    if (Object.keys(filteredBill[year]).includes(month)) {
                                                        const monthObject = filteredBill[year][month];
                                                        if (Object.keys(filteredBill[year][month]).includes(day)) {
                                                            const dayObject = filteredBill[year][month][day];
                                                            let billforday = Object.defineProperty(dayObject, time, {value: cost, enumerable: true});
                                            
                                                            let allvalue = dayObject.all;
                                                            if (cost.isIncoming) {
                                                                allvalue += cost.money;
                                                            }else {
                                                                allvalue -= cost.money;
                                                            }
                                                            billforday = Object.defineProperty(dayObject, 'all', {value: allvalue, enumerable: true, writable: true});

                                                        }else {
                                                            let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                            let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                            billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
            
                                                            let billformonth = Object.defineProperty(monthObject, day, {value: billforday, enumerable: true});
                                                            
                                                        }
                                                        let allvalue = monthObject.all;
                                                        if (cost.isIncoming) {
                                                            allvalue += cost.money;
                                                        }else {
                                                            allvalue -= cost.money;
                                                        }
                                                        let billformonth = Object.defineProperty(monthObject, 'all', {value: allvalue, enumerable: true, writable: true});

                                                    }else {
                                                        let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                        let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                        billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
            
                                                        let billformonth = Object.defineProperty({}, day, {value: billforday, enumerable: true});
                                                        // allvalue = cost.money;
                                                        billformonth = Object.defineProperty(billformonth, 'all', {value: allvalue, enumerable: true, writable: true});
                                    
                                                        let billforyear = Object.defineProperty(yearObject, month, {value: billformonth, enumerable: true});
                                                    
                                                    }

                                                    let allvalue = yearObject.all;
                                                    if (cost.isIncoming) {
                                                        allvalue += cost.money;
                                                    }else {
                                                        allvalue -= cost.money;
                                                    }
                                                    let billforyear = Object.defineProperty(yearObject, 'all', {value: allvalue, enumerable: true, writable: true});

                                                }else {
                                                    let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                    let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                    billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
            
                                                    let billformonth = Object.defineProperty({}, day, {value: billforday, enumerable: true});
                                                    // allvalue = cost.money;
                                                    billformonth = Object.defineProperty(billformonth, 'all', {value: allvalue, enumerable: true, writable: true});
                                
                                                    let billforyear = Object.defineProperty({}, month, {value: billformonth, enumerable: true});
                                                    // allvalue = cost.money;
                                                    billforyear = Object.defineProperty(billforyear, 'all', {value: allvalue, enumerable: true, writable: true});
                                                    
                                                    filteredBill = Object.defineProperty(filteredBill, year, {value: billforyear, enumerable: true});
                        
                                                }

                                                let allvalue = filteredBill.all;
                                                if (cost.isIncoming) {
                                                    allvalue += cost.money;
                                                }else {
                                                    allvalue -= cost.money;
                                                }
                                                filteredBill = Object.defineProperty(filteredBill, 'all', {value: allvalue, enumerable: true, writable: true});

                                            }else {
                                                    let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                    let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                    billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
            
                                                    let billformonth = Object.defineProperty({}, day, {value: billforday, enumerable: true});
                                                    // allvalue = cost.money;
                                                    billformonth = Object.defineProperty(billformonth, 'all', {value: allvalue, enumerable: true, writable: true});
                                
                                                    let billforyear = Object.defineProperty({}, month, {value: billformonth, enumerable: true});
                                                    // allvalue = cost.money;
                                                    billforyear = Object.defineProperty(billforyear, 'all', {value: allvalue, enumerable: true, writable: true});
                                                    
                                                    filteredBill = Object.defineProperty({}, year, {value: billforyear, enumerable: true});
                                                    // let billlforall_allvalue = cost.money;
                                                    filteredBill = Object.defineProperty(filteredBill, 'all', {value: allvalue, enumerable: true, writable: true});
                        
                                            }
                                            
                                        }
                                    }
                                }

                                if (isPriorityHigh && isPriorityLow) {
                                    let costtype = cost.costtype;
                                    let billtype = cost.billtype;
                                    if (costtypes.includes(costtype) && billtypes.includes(billtype)) {
    
                                        if (filteredBill) {
                                            if (Object.keys(filteredBill).includes(year)) {
                                                const yearObject = filteredBill[year];
                                                if (Object.keys(filteredBill[year]).includes(month)) {
                                                    const monthObject = filteredBill[year][month];
                                                    if (Object.keys(filteredBill[year][month]).includes(day)) {
                                                        const dayObject = filteredBill[year][month][day];
                                                        let billforday = Object.defineProperty(dayObject, time, {value: cost, enumerable: true});
                                                        
                                                        let allvalue = dayObject.all;
                                                        if (cost.isIncoming) {
                                                            allvalue += cost.money;
                                                        }else {
                                                            allvalue -= cost.money;
                                                        }
                                                        billforday = Object.defineProperty(dayObject, 'all', {value: allvalue, enumerable: true, writable: true});
                                                           
                                                    }else {
                                                        let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                        let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                        billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
        
                                                        let billformonth = Object.defineProperty(monthObject, day, {value: billforday, enumerable: true});
                                                        
                                                    }
                                                    let allvalue = monthObject.all;
                                                    if (cost.isIncoming) {
                                                        allvalue += cost.money;
                                                    }else {
                                                        allvalue -= cost.money;
                                                    }
                                                    let billformonth = Object.defineProperty(monthObject, 'all', {value: allvalue, enumerable: true, writable: true});

                                                }else {
                                                    let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                    let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                    billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
        
                                                    let billformonth = Object.defineProperty({}, day, {value: billforday, enumerable: true});
                                                    // allvalue = cost.money;
                                                    billformonth = Object.defineProperty(billformonth, 'all', {value: allvalue, enumerable: true, writable: true});
                                
                                                    let billforyear = Object.defineProperty(yearObject, month, {value: billformonth, enumerable: true});
                                                
                                                }

                                                let allvalue = yearObject.all;
                                                if (cost.isIncoming) {
                                                    allvalue += cost.money;
                                                }else {
                                                    allvalue -= cost.money;
                                                }
                                                let billforyear = Object.defineProperty(yearObject, 'all', {value: allvalue, enumerable: true, writable: true});

                                            }else {
                                                let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
        
                                                let billformonth = Object.defineProperty({}, day, {value: billforday, enumerable: true});
                                                // allvalue = cost.money;
                                                billformonth = Object.defineProperty(billformonth, 'all', {value: allvalue, enumerable: true, writable: true});
                            
                                                let billforyear = Object.defineProperty({}, month, {value: billformonth, enumerable: true});
                                                // allvalue = cost.money;
                                                billforyear = Object.defineProperty(billforyear, 'all', {value: allvalue, enumerable: true, writable: true});
                                                
                                                filteredBill = Object.defineProperty(filteredBill, year, {value: billforyear, enumerable: true});
                    
                                            }
                                            let allvalue = filteredBill.all;
                                            if (cost.isIncoming) {
                                                allvalue += cost.money;
                                            }else {
                                                allvalue -= cost.money;
                                            }
                                            filteredBill = Object.defineProperty(filteredBill, 'all', {value: allvalue, enumerable: true, writable: true});

                                        }else {
                                                let billforday = Object.defineProperty({}, time, {value: cost, enumerable: true});
                                                let allvalue = cost.isIncoming ? cost.money : - cost.money;
                                                billforday = Object.defineProperty(billforday, 'all', {value: allvalue, enumerable: true, writable: true});
        
                                                let billformonth = Object.defineProperty({}, day, {value: billforday, enumerable: true});
                                                // allvalue = cost.money;
                                                billformonth = Object.defineProperty(billformonth, 'all', {value: allvalue, enumerable: true, writable: true});
                            
                                                let billforyear = Object.defineProperty({}, month, {value: billformonth, enumerable: true});
                                                // allvalue = cost.money;
                                                billforyear = Object.defineProperty(billforyear, 'all', {value: allvalue, enumerable: true, writable: true});
                                                
                                                filteredBill = Object.defineProperty({}, year, {value: billforyear, enumerable: true});
                                                // let billlforall_allvalue = cost.money;
                                                filteredBill = Object.defineProperty(filteredBill, 'all', {value: allvalue, enumerable: true, writable: true});
                    
                                        }
                                        
                                    }
                                }
                            }
                        }
                    }
                }
                // debugger
                callback(filteredBill);
    
            }else {
                callback();
            }
        })
    })
    
}

export {getCurrentTime, getPlanMoney, setPlanMoney, getCopyRight, setCopyRight, addCostForDay, getBillForDay, getBillForMonth, getBillForYear, getBillForAll, getCostforDay, getCostForMonth, getCostForYear, getCostForAll, getAllDaysForAllBill, getAllCostsForDayBill, removeAllKey, addCostType, getCostAllTypes, addBillType, getAllBillTypes, getFilteredBills, removeFilter, removeBillData, setFilter, getFilter, setFilterForCostType, setFilterForBillType, setFilterForIsIncoming, setFilterForIsOutcoming, setFilterForIsPriorityLow, removeAllCostTypes, removeAllBillTypes, setFilterForAddCostType, setFilterForAddBillType}