/*
 * @Author: yjz 
 * @Date: 2019-01-25 10:15:34 
 * @Last Modified by: yjz
 * @Last Modified time: 2019-02-20 16:01:34
 */
import React, {Component} from 'react'
import {StyleSheet, View, Modal, TouchableHighlight, Text, TextInput, Picker, Switch, ScrollView, TouchableOpacity, Button} from 'react-native'
// import {Button} from '@ctrip/crn'
import {addCostForDay, getCostAllTypes, addCostType, getAllBillTypes, addBillType, setFilter, setFilterForAddBillType, setFilterForAddCostType} from './base'

class ZhangBenHomeAddView extends Component {

    state = {
        isModalVisible: false
    }
    _addCost() {
        this.setState({
            isModalVisible: true
        })
    }

    render() {
        return (
             <View style={{justifyContent:'center'}}>
                 {this.state.isModalVisible &&  <ModalView onRequestClose={()=>{
                    this.setState({
                        isModalVisible: false
                    })
                 }} onSuccess={this.props.complete} addCostTypeCallback={this.props.addCostTypeCallback} addBillTypeCallback={this.props.addBillTypeCallback}/>}
                 <Button title="记一笔" color="#000" style={styles.add} accessibilityLabel="记一笔" onPress={this._addCost.bind(this)}/>
                 {/* <Button textStyle={{color: "#000", textAlign: 'center', textAlignVertical: 'center'}} style={styles.add} accessibilityLabel="记一笔" onPress={this._addCost.bind(this)}>记一笔</Button> */}
             </View>
        )
    }
}

class ModalView extends Component {
    state = {
        money: 0,
        remark: '消费',
        costtype: '基本消费',
        billtype: '家庭账本',
        costpriorityhigh: false,
        costisincoming: false,
        costtypePickerItems: [<Picker.Item key={`costtype_${0}`} label='基本消费' value='基本消费'/>],
        billtypePickerItems: [<Picker.Item key={`billtype_${0}`} label='家庭账本' value='家庭账本'/>],
        isCustomCostStyleModalVisible: false,
        isCustomBillStyleModalVisible: false
    }
    componentDidMount() {
        this._getCostAllTypes((items) => {
            this.setState({
                costtypePickerItems: items,
            })
        });
        this._getAllBillTypes((items) => {
            this.setState({
                billtypePickerItems: items,
            })
        })
    }

    _getCostAllTypes = (callback) => {
        getCostAllTypes((value) => {
            let pickers = [];
            if (value && Array.isArray(value) && value.length > 0) {
                for (let i = 0; i < value.length; i++) {
                    const costtype = value[i];
                    pickers.push(<Picker.Item key={`costtype_${i}`} label={`${costtype}`} value={`${costtype}`}/>)
                }
            }else {
                pickers.push(<Picker.Item key={`costtype_${0}`} label='基本消费' value='基本消费'/>);
                addCostType('基本消费');
                
            }
            callback(pickers);
        })
    }
    _getAllBillTypes = (callback) => {
        getAllBillTypes((value) => {
            let pickers = [];
            if (value && Array.isArray(value) && value.length > 0) {
                for (let i = 0; i < value.length; i++) {
                    const billtype = value[i];
                    pickers.push(<Picker.Item key={`billtype_${i}`} label={`${billtype}`} value={`${billtype}`}/>)
                }
            }else {
                pickers.push(<Picker.Item key={`billtype_${0}`} label='家庭账本' value='家庭账本'/>);
                addBillType('家庭账本');
            }
            callback(pickers);
        })
    }
    _addCustomCostType = () => {
        this.setState({
            isCustomCostStyleModalVisible: true
        })
    }
    _addCustomBillType= () => {
        this.setState({
            isCustomBillStyleModalVisible: true
        })
    }

    render() {
        return (
            <View>
                <Modal animationType='slide' transparent={false} visible={true} onRequestClose={()=>{
                    alert("Modal has been closed.");
                }}>
                <ScrollView style={{marginTop: 22}}>
                    <View>
                    {/* {this.state.isCustomCostStyleModalVisible &&  <CustomCostStyleModalView onRequestClose={()=>{
                        this.setState({
                            isCustomCostStyleModalVisible: false
                        })
                    }}/>}
                    {this.state.isCustomBillStyleModalVisible &&  <CustomBillStyleModalView onRequestClose={()=>{
                        this.setState({
                            isCustomBillStyleModalVisible: false
                        })
                    }}/>} */}
                        <Text>金额：</Text><TextInput style={{height: 44, borderColor: 'gray', borderWidth: 1}} onChangeText={(text)=>{
                            this.setState({
                                money: text
                            })
                        }} autoFocus={true} placeholder={'输入金额...'}/>
                        <Text>备注：</Text><TextInput style={{height: 44, borderColor: 'gray', borderWidth: 1}} onChangeText={(text)=>{
                            this.setState({
                                remark: text
                            })
                        }} placeholder={'输入备注...'}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text>类别：</Text> 
                            <TouchableOpacity onPress={this._addCustomCostType}>
                                <Text>添加自定义类别+</Text>
                            </TouchableOpacity>
                            {this.state.isCustomCostStyleModalVisible && <View style={{flexDirection: 'row'}}>
                                <TextInput style={{height: 44, borderColor: 'gray', borderWidth: 1}} onChangeText={(text)=>{
                                        this.setState({
                                            costtype: text
                                        })
                                }} autoFocus={true} placeholder={'输入类别名称...'}/>
                                <TouchableHighlight onPress={()=>{
                                        addCostType(this.state.costtype, ((result) => {
                                            if (result === 'success') {
                                                //besure not same to local costytypes
                                                setFilterForAddCostType(this.state.costtype, ()=>{
                                                    
                                                })
                                                this._getCostAllTypes((items) => {
                                                    this.setState({
                                                        costtypePickerItems: items,
                                                    })
                                                });
                                                this.props.addCostTypeCallback && this.props.addCostTypeCallback();
                                            }else {
                                                alert('失败！')
                                                
                                            }
                                            this.setState({
                                                isCustomCostStyleModalVisible: false
                                            })
                                        }));
                                    }}>
                                    <Text>完成</Text>
                                </TouchableHighlight>
                            </View>}
                            </View>
                        <Picker
                            // style={{height: 66}}
                            itemStyle={{color: 'black'}}
                            prompt='Picker'
                            mode='dropdown'
                            selectedValue={this.state.costtype}
                            onValueChange={(value) => this.setState({costtype: value})}
                        >
                        {this.state.costtypePickerItems}
                        </Picker>
                        <View style={{flexDirection: 'row'}}>
                            <Text>账本：</Text>
                            <TouchableOpacity onPress={this._addCustomBillType}>
                                <Text>添加自定义账本+</Text>
                            </TouchableOpacity>
                            {this.state.isCustomBillStyleModalVisible && <View style={{flexDirection: 'row'}}>
                                <TextInput style={{height: 44, borderColor: 'gray', borderWidth: 1}} onChangeText={(text)=>{
                                    this.setState({
                                        billtype: text
                                    })
                            }} autoFocus={true} placeholder={'输入账本名称...'}/>
                            <TouchableHighlight onPress={()=>{
                                    addBillType(this.state.billtype, ((result) => {
                                        if (result === 'success') {
                                            setFilterForAddBillType(this.state.billtype, ()=>{
                                                
                                            });
                                            this._getAllBillTypes((items) => {
                                                this.setState({
                                                    billtypePickerItems: items,
                                                })
                                            });
                                            this.props.addBillTypeCallback && this.props.addBillTypeCallback();
                                            
                                        }else {
                                            alert('失败！')
                                        }
                                        this.setState({
                                            isCustomBillStyleModalVisible: false
                                        })
                                    }));
                                }}>
                                <Text>完成</Text>
                            </TouchableHighlight>
                            </View>}
                         </View>
                        <Picker
                            // style={{height: 66}}
                            itemStyle={{color: 'black'}}
                            prompt='Picker'
                            mode='dropdown'
                            selectedValue={this.state.billtype}
                            onValueChange={(value) => this.setState({billtype: value})}
                        >
                        {this.state.billtypePickerItems}
                        </Picker>
                        <View style={{flexDirection: 'row'}}><Text>是否收入：</Text></View>
                        
                        <Switch trackColor='green' thumbColor='yellow' onValueChange={(value) => this.setState({costisincoming: value})} value={this.state.costisincoming}></Switch>
                        
                        {/* <Picker
                            itemStyle={{color: 'black'}}
                            prompt='Picker'
                            mode='dropdown'
                            selectedValue={this.state.costisincoming}
                            onValueChange={(value) => this.setState({costisincoming: value})}
                        >
                        <Picker.Item label='否' value={false}/>
                        <Picker.Item label='是' value={true}/>
                        </Picker> */}
                        <Text>是否重要支出或收入：</Text>
                        <Switch trackColor='green' thumbColor='yellow' onValueChange={(value) => this.setState({costpriorityhigh: value})} value={this.state.costpriorityhigh}></Switch>
                        <TouchableHighlight onPress={()=>{
                            addCostForDay({money: this.state.money, remark: this.state.remark, costtype: this.state.costtype, billtype: this.state.billtype, isIncoming: this.state.costisincoming, isPriorityHigh: this.state.costpriorityhigh}, ((result) => {
                                if (result === 'success') {
                                    this.props.onSuccess()
                                    this.props.onRequestClose()
                                }else {
                                    alert('失败！')
                                    this.props.onRequestClose()
                                }
                            }));
                            
                        }}>
                            <Text>完成</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{
                            this.props.onRequestClose()
                        }}>
                            <Text>取消</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>

                </Modal>
                
            </View>
        )
    }
}

// class CustomCostStyleModalView extends Component {
//     state = {
//         costtype:''
//     }
//     render() {
//         return (
//             <View>
//                 <Modal animationType='slide' transparent={false} visible={true} onRequestClose={()=>{
//                     alert("Modal has been closed.");
//                 }}>
//                     <Text>添加自定义类别：</Text><TextInput style={{height: 44, borderColor: 'gray', borderWidth: 1}} onChangeText={(text)=>{
//                             this.setState({
//                                 costtype: text
//                             })
//                     }} autoFocus={true} placeholder={'输入类别名称...'}/>
//                     <TouchableHighlight onPress={()=>{
//                             addCostType(this.state.costtype, ((result) => {
//                                 if (result === 'success') {
//                                     this.props.onRequestClose()
//                                 }else {
//                                     alert('失败！')
//                                     this.props.onRequestClose()
//                                 }
//                             }));
//                         }}>
//                         <Text>完成</Text>
//                     </TouchableHighlight>
//                 </Modal>
//             </View>
//         )
//     }
// }

// class CustomBillStyleModalView extends Component {
//     state = {
//         billtype:''
//     }
//     render() {
//         return (
//             <View>
//                 <Modal animationType='slide' transparent={false} visible={true} onRequestClose={()=>{
//                     alert("Modal has been closed.");
//                 }}>
//                     <Text>添加自定义账本：</Text><TextInput style={{height: 44, borderColor: 'gray', borderWidth: 1}} onChangeText={(text)=>{
//                             this.setState({
//                                 billtype: text
//                             })
//                     }} autoFocus={true} placeholder={'输入账本名称...'}/>
//                     <TouchableHighlight onPress={()=>{
//                             addBillType(this.state.billtype, ((result) => {
//                                 if (result === 'success') {
//                                     this.props.onRequestClose()
//                                 }else {
//                                     alert('失败！')
//                                     this.props.onRequestClose()
//                                 }
//                             }));
//                         }}>
//                         <Text>完成</Text>
//                     </TouchableHighlight>
//                 </Modal>
//             </View>
//         )
//     }
// }

const styles = StyleSheet.create({
    add: {
        // backgroundColor: 'blue',
        height: 44,
        width: 100,
    }

})

export default ZhangBenHomeAddView