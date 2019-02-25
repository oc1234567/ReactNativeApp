import React, {Component} from 'react'
import {SectionList, Text, View} from 'react-native'

class ZhangBenListView extends Component {

    constructor (props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        // console.log('home list render...')
        return <SectionList
                  sections={this.props.sections}
                  renderItem={({item, index})=><Text key={index} style={{height: 44}}>{`${item.remark} ${item.costtype} ${item.billtype} ${item.money}`}</Text>}
                  renderSectionHeader={({section: {title}})=>(<View style={{flexDirection: 'row', justifyContent: 'space-between'}}><Text style={{fontWeight: 'bold', height: 44}}>{title.date}</Text><View style={{flexDirection: 'row', justifyContent: 'flex-end'}}><Text style={{fontWeight: 'bold', height: 44}}>{`收入：${title.monthInComing}`}</Text><Text style={{marginLeft: 10, fontWeight: 'bold', height: 44}}>{`支出：${title.monthOutComing}`}</Text></View></View>)}
                  keyExtractor={(item, index) => item + index}
        />
    }
    
}

export default ZhangBenListView