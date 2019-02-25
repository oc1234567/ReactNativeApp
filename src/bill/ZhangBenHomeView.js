import React, {Component} from 'react'
import {ScrollView, View, Dimensions} from 'react-native'
import './Util/rnstorage'
import ZhangBenHomeHeaderView from './ZhangBenHomeHeaderView'
import ZhangBenHomeFooterView from './ZhangBenHomeFooterView'
import ZhangBenHomeListView from './ZhangBenHomeListView'
import ZhangBenHomeAddView from './ZhangBenHomeAddView'
import ZhangBenHomeFilterView from './ZhengBenHomeFilterView'
import ZhangBenHomeBalanceView from './ZhangBenHomeBalanceView'
import {getBillForAll, removeAllKey, getFilteredBills, removeFilter, setFilter, getFilter, removeAllCostTypes, removeAllBillTypes, getCostAllTypes, getAllBillTypes, addBillType} from './base.js'

export default class ZhangBenHomeView extends Component {

    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get("window");
        this.ScreenHeight = height;
        this.ScreenWidth = width;

        // removeAllBillTypes();
        // removeAllCostTypes();
    }

    state = {
        sections: [],
        filterValue: {
            isIncoming: true,
            isOutcoming: true,
            isPriorityHigh: true,//allways true
            isPriorityLow: true,//only high equle false
            costtypes: ['基本消费'],
            billtypes: ['家庭账本'],

        },
        allcosttypes: [],
        allbilltypes: [],
        balance: 0,
        InComing: 0, 
        OutComing: 0

    }

    componentDidMount() {
        this._getData();
        this._getFilter();
        this._getAllCostTypes();
        this._getAllBillTypes();
    }

    _getAllCostTypes = () => {
        getCostAllTypes((value) => {
            this.setState({
                allcosttypes: value,
            })
        })
    }

    _getAllBillTypes = () => {
        getAllBillTypes((value) => {
            this.setState({
                allbilltypes: value,
            })
        })
    }

    render() {
        console.log('home render')
        return (
            <View style={{flex:1}}>
            {/* <ScrollView> */}
                <View style={{height: 144, justifyContent: 'center', alignItems: 'center'}}>
                    <ZhangBenHomeAddView complete={this._complete.bind(this)} addBillTypeCallback={this._addBillTypeCallback.bind(this)} addCostTypeCallback={this._addCostTypeCallback.bind(this)}/>
                    <View style={{height:10}}></View>
                    <ZhangBenHomeFilterView filter={this._filter.bind(this)} filterValue={this.state.filterValue} allcosttypes={this.state.allcosttypes} allbilltypes={this.state.allbilltypes}/>
                    <View style={{height:10}}></View>
                    <ZhangBenHomeBalanceView balance={this.state.balance}/>
                </View>
                <View>
                    <ZhangBenHomeListView sections={this.state.sections}/> 
                </View>
                
                {/* {this._renderHeaderView.bind(this)} */}
                {/* {this._renderZhangBenListView.bind(this)} */}
                {/* {this._renderFooterView.bind(this)} */}
            {/* </ScrollView> */}
            </View>
        )
    }
    
    _renderZhangBenListView() {
        return (
            <View style={{flex: 1}}>
                <ZhangBenHomeAddView/>
                {/* <ZhangBenHomeListView/> */}
            </View>
        )
    }

    _renderHeaderView() {
        return <ZhangBenHomeHeaderView/>
    }

    _renderFooterView() {
        return <ZhangBenHomeFooterView/>
    }

    /**
     * 筛选
     */
    _filter() {
        // setFilter(value);//best settimeout
        this._getData();
        this._getFilter();
    }
    /**
     * 添加类型成功回调
     */
    _addCostTypeCallback() {

        this._getAllCostTypes();
    }
    /**
     * 添加类型成功回调
     */
    _addBillTypeCallback() {

        this._getAllBillTypes();
    }
    /**
     * 记一笔成功回调
     */
    _complete() {
        this._getFilter();
        this._getData()
    }
    _getFilter = () => {
        getFilter((value) => {
            // console.log(`...........xxxxxxxxxxxx............${JSON.stringify(value)},  ${JSON.stringify({...this.state.filterValue, ...value})}`)
            this.setState({
                filterValue: {...this.state.filterValue, ...value}
            })
        })
    }
    _getData() {
        getFilteredBills((data) => {
            let sections = [];
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
                            const dayCost = data[year][month][day];
                            let section = {};
                            let date = `${year}-${month}-${day}`;
                            section.date = date;
                            let dayCosts = [];
                            let monthOutComing = 0;
                            let monthInComing = 0;
                            let costs = removeAllKey(Object.keys(dayCost));
                            for (let n = 0; n < costs.length; n++) {
                                const time = costs[n];
                                const cost = data[year][month][day][time];
                                if (cost.isIncoming) {
                                    monthInComing = monthInComing + cost.money;
                                }else {
                                    monthOutComing = monthOutComing + cost.money;
                                }
                                dayCosts.push(cost);
                            }
                            section.monthInComing = monthInComing;
                            section.monthOutComing = monthOutComing;
                            sections.push({title: section, data: dayCosts});
                        }
                    }
                }   
                this.setState({
                    balance: data.all,
                }) 
            }
            this.setState({
                sections
            })
        })
    }

}