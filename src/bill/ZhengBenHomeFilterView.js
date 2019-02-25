/*
 * @Author: yjz 
 * @Date: 2019-01-29 14:47:38 
 * @Last Modified by: yjz
 * @Last Modified time: 2019-02-20 13:59:57
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, ScrollView, Text, StyleSheet} from 'react-native'
import {getCostAllTypes, getAllBillTypes, getFilter, removeFilter, removeBillData, setFilterForIsIncoming, setFilterForIsOutcoming, setFilterForIsPriorityLow, setFilterForCostType, setFilterForBillType} from './base'

const ScrollHeight = 24;

class FilterView extends Component {

    constructor(props) {
        super(props)
        // removeFilter();
        // removeBillData();
        
    }
    
    // state = {
    //     allCosttypes: [],
    //     allBilltypes: [],
    // }
    
    // componentDidMount() {
    //     this._getAllCostTypes();
    //     this._getAllBillTypes();
    // }


    _renderCosttypeFilterComponentItems(value) {
        let pickers = [];
        if (value && Array.isArray(value) && value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                const costtype = value[i];
                pickers.push(
                    this._renderCosttypeFilterComponentItem(costtype)
                )
            }
        }
        return pickers;
    }

    _renderCosttypeFilterComponentItem(costtype) {
        let isFiltered = this.props.filterValue.costtypes.includes(costtype);
        // console.log(`${costtype} is in ${JSON.stringify(this.props.filterValue.costtypes)}`)
        return <TouchableOpacity style={[styles.touchable, isFiltered ? styles.selected : styles.unselected]}  key={`costtypefilter_${costtype}`} onPress={()=>this._filterCostType(costtype)}>
                    <Text>{`只看${costtype}账单`}</Text>
                </TouchableOpacity>
    }

    _renderBilltypeFilterComponentItems(value) {
        let pickers = [];
        if (value && Array.isArray(value) && value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                const billtype = value[i];
                pickers.push(
                    this._renderBilltypeFilterComponentItem(billtype)
                )
            }
        }
        return pickers;
    }

    _renderBilltypeFilterComponentItem(billtype) {
        let isFiltered = this.props.filterValue.billtypes.includes(billtype);
        return <TouchableOpacity style={[styles.touchable, isFiltered ? styles.selected : styles.unselected]}  key={`billtypefilter_${billtype}`} onPress={()=>this._filterBillType(billtype)}>
                    <Text>{`只看${billtype}账单`}</Text>
                </TouchableOpacity>
    }

    _filterIsIncoming() {
        if (this.props.filterValue.isIncoming && !this.props.filterValue.isOutcoming) {
            // this._update({...this.props.filterValue, isIncoming: !this.props.filterValue.isIncoming, isOutcoming: true});
            setFilterForIsIncoming(!this.props.filterValue.isIncoming, () => this._update());
            setFilterForIsOutcoming(true, () => this._update());
        }else {
            // this._update({...this.props.filterValue, isIncoming: !this.props.filterValue.isIncoming});
            setFilterForIsIncoming(!this.props.filterValue.isIncoming, () => this._update());
        }
        
    }

    _filterIsOutcoming() {
        if (!this.props.filterValue.isIncoming && this.props.filterValue.isOutcoming) {
            // this._update({...this.props.filterValue, isOutcoming: !this.props.filterValue.isOutcoming, isIncoming: true});
            setFilterForIsIncoming(true), () => this._update();
            setFilterForIsOutcoming(!this.props.filterValue.isOutcoming, () => this._update());
        }else {
            // this._update({...this.props.filterValue, isOutcoming: !this.props.filterValue.isOutcoming});
            setFilterForIsOutcoming(!this.props.filterValue.isOutcoming, () => this._update());
        }
    }

    _filterIsCostPriorityHigh() {
        // this._update({...this.props.filterValue,isPriorityLow: !this.props.filterValue.isPriorityLow});
        setFilterForIsPriorityLow(!this.props.filterValue.isPriorityLow, () => this._update())
        
    }

    _filterCostType(costtype) {
        let ishaved = this.props.filterValue.costtypes.includes(costtype);
        let length = this.props.filterValue.costtypes.length;

        //ensure length >= 1
        if (ishaved && length == 1) {
            return; 
        }
        // let temp = this.props.filterValue.costtypes.slice();
        
        // if (ishaved) {
        //     let index = this.props.filterValue.costtypes.indexOf(costtype);
        //     temp.splice(index, 1);
        // }else {
        //     temp.push(costtype);
        // }
        // this._update({...this.props.filterValue, costtypes: temp});
        setFilterForCostType(costtype, () => this._update());
        
    }

    _filterBillType(billtype) {
        let ishaved = this.props.filterValue.billtypes.includes(billtype);
        let length = this.props.filterValue.billtypes.length;

        //ensure length >= 1
        if (ishaved && length == 1) {
            return; 
        }
        // let temp = this.props.filterValue.billtypes.slice();
        
        // if (ishaved) {
        //     let index = this.props.filterValue.billtypes.indexOf(billtype);
        //     temp.splice(index, 1);
        // }else {
        //     temp.push(billtype);
        // }

        // this._update({...this.props.filterValue, billtypes: temp});
        setFilterForBillType(billtype, () => this._update());
        
    }

    _update() {
        // this.filterValue = value;
        if (this.props.filter) {
            this.props.filter()
        }
    }
    
    render() {
        console.log('home filterView render...')
        return (
            <View style={{height: ScrollHeight}}>
                <ScrollView horizontal style={{flex: 1}}>
                    <TouchableOpacity style={[styles.touchable, !this.props.filterValue.isPriorityLow ? styles.selected : styles.unselected]} onPress={this._filterIsCostPriorityHigh.bind(this)}>
                        <Text>只看重要支出与收入</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchable, this.props.filterValue.isIncoming ? styles.selected : styles.unselected]}  onPress={this._filterIsIncoming.bind(this)}>
                        <Text>只看收入</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchable, this.props.filterValue.isOutcoming ? styles.selected : styles.unselected]} onPress={this._filterIsOutcoming.bind(this)}>
                        <Text>只看支出</Text>
                    </TouchableOpacity>
                    {this._renderCosttypeFilterComponentItems(this.props.allcosttypes)}
                    {this._renderBilltypeFilterComponentItems(this.props.allbilltypes)}
                </ScrollView>
            </View>
        )

        
    }
}

const styles = StyleSheet.create({
    touchable: {
        height: ScrollHeight,
        marginHorizontal: 10,
    },
    selected: {
        backgroundColor: 'gray'
    },
    unselected: {
        backgroundColor: 'transparent'
    }
})

export default FilterView