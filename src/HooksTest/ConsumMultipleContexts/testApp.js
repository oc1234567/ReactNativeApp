import React from 'react'
import {
    View,
    Text,
    Button,
} from 'react-native'

import Provider from '../initReactRedux/initProvider'
import * as Actions from "../DynamicContext/example-reducer";
import useState from '../initReactRedux/useModal/useState'
import useDispatch from '../initReactRedux/useModal/useDispatch'

function App() {
    return (
        <View>
        <Provider actions={Actions} initinalState={{count: 0, user: {name: 'Alice'}, theme: 'light'}}>
            <LayoutCount />
            <Layout />
          </Provider>
        
        </View>
      );
}

function LayoutCount() {
  let { addCountReducer, reduceCountReducer }  = useDispatch();
  
  return (
    <View>
      <Count />
      <View style={{flexDirection: 'row'}}>
          <Button onPress={() => {
                addCountReducer();
            }} title='Add Count'>
          </Button>
          <Button onPress={() => {
              reduceCountReducer();
          }} title='Reduce Count'>
          </Button>
      </View>
    </View>
  );
}

function Layout() {
  return (
    <View>
      <Sidebar />
      <Content />
    </View>
  );
}

function Content() {
    let { setTheme }  = useDispatch();

    let state = useState();
  return (
    <React.Fragment>
      <ContentSub theme={state.theme} />
      <Button onPress={() => {
        setTheme('dark');
    }} title='Change Name'></Button>
  </React.Fragment>
  );
}

function Sidebar() {
    let { setName }  = useDispatch();

    let state = useState();
  return (
    <React.Fragment>
      <SidebarSub user={state.user} theme={state.theme} />
      <Button onPress={() => {
        setName('Bob');
    }} title='Change Theme'></Button>
    </React.Fragment>
    
  );
}

function Count() {
    let state = useState();
  return (
    <CountItem count={state.count || 0} />
  );
}

function ContentSub(props) {
    let {theme} = props;
    return (
        <View style={{backgroundColor: 'green'}}>
            <Text>{theme}</Text>
        </View>
    )
}

function SidebarSub(props) {
    let {theme} = props;
    let {name} = props.user
    return (
        <View style={{backgroundColor: 'orange'}}>
            <Text>{name}</Text>
            <Text>{theme}</Text>
        </View>
    )
}

function CountItem(props) {
    let {count} = props;
    return (
        <View style={{backgroundColor: 'orange', width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#fff', fontSize: 14}}>{count}</Text>
        </View>
    )
}

export default App