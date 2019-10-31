import React from 'react'
import {
    View,
    Text,
    Button,
} from 'react-native'

// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                name: 'Oli'
            }
        }
    }
  render() {

    // App component that provides initial context values
    return (
      <View>
          {/* <ThemeContext.Provider value={'dark'}>
        <UserContext.Provider value={this.state.user}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider> */}
      <UserContext.Provider value={this.state.user}>
          <LayoutOther />
        </UserContext.Provider>
      <Button onPress={() => {
           this.setState((state) => ({
               user: {
                   ...state.user,
                   name: state.user.name + ' +1'
               },
           }))
      }} title='Change State User Name'></Button>
      </View>
    );
  }
}

function LayoutOther() {
    console.log('layout other')
  return (
    <View>
      <User />
    </View>
  );
}

function Layout() {
    console.log('layout')
  return (
    <View>
      <Sidebar />
      <Content />
    </View>
  );
}

// A component may consume multiple contexts
function Content() {
    console.log('ddd');
  return (
    <ThemeContext.Consumer>
      {theme => (
        <ContentSub theme={theme} />
      )}
    </ThemeContext.Consumer>
  );
}

// B component may consume multiple contexts
function Sidebar() {
    console.log('aaaa');
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <SidebarSub user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

// C component may consume multiple contexts
function User() {
    console.log('layout other user')
  return (
    <UserContext.Consumer>
          {user => (
            <UserItem user={user} />
          )}
    </UserContext.Consumer>
  );
}

function ContentSub(props) {
    console.log('bbbb')
    let {theme} = props;
    return (
        <View style={{backgroundColor: 'green'}}>
            <Text>{theme}</Text>
        </View>
    )
}

function SidebarSub(props) {
    console.log('ccc')
    let {theme} = props;
    let {name} = props.user
    return (
        <View style={{backgroundColor: 'orange'}}>
            <Text>{name}</Text>
            <Text>{theme}</Text>
        </View>
    )
}

function UserItem(props) {
    console.log('layout other user item')
    let {name} = props.user
    return (
        <View style={{backgroundColor: 'orange'}}>
            <Text>{name}</Text>
        </View>
    )
}

export default App