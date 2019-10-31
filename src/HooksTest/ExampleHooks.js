/**
 * 引入 React 中的 useState Hook。它让我们在函数组件中存储内部 state。
 */
import React, {Component, useState, useEffect, useContext} from 'react'
import {
    View,
    Text,
    Button,
    Dimensions,
    DeviceEventEmitter
} from 'react-native'

const ThemeContext = React.createContext('light');

class App extends Component {
    render() {
        return (
            <ThemeContext.Provider value='dark'>
                <ToorBar />
            </ThemeContext.Provider>
        )
    }
}

function ToorBar(props) {
    return (
        <View>
            <ExampleComponentClass />
        </View>
    )
}

/**
 * 函数组件在没有Hooks之前是无状态组件，现在函数组件有了使用React state的能力，所以更好得描述为函数组件
 * 函数组件，没有this，因此不能分配或读取this.state
 * @param {Object} params 
 */
function ExampleHooks(props) {

    /**
     * Q:使用useState方法的时候做了什么？
     * A:定义一个"state"变量，并在首次渲染中初始化state，这是一种在函数调用时保存变量的方式，在函数退出后变量就会"消失"，而state中的变量会被React保留。
     * Q:返回值是什么？
     * A:当前state与更新state的函数
     * Q:首次渲染与再次渲染时分别做了什么？
     * A:useState方法只在首次渲染的时候创建"state"变量并初始化，下一次渲染时，会忽略初始值，useState会返回给我们当前的state
     */
    const [count, setCount] = useState(0);
    const [fruit, setFruit] = useState('orange');
    const [ideas, setIdeas] = useState([{content: 'Good Idea'}])
    const [movie, setMovie] = useState(()=>([{name: '夏洛特烦恼', price: 34}, {name: '飞越老人院', price: 33}]))

    /**
     * Q:使用useEffect方法的时候做了什么？
     * A:告诉React组件需要在渲染后执行某些操作
     * Q:参数是什么？
     * A:参数是传递的函数，称之为effect，和effect是否被执行的控制参数数组。React会保存effect这个函数，在每次渲染之后调用它(不用关心是'挂载'还是'更新'，React总是在组件更新完毕之后运行effect))，
     *   此函数在每次渲染中都会有所不同，原因是每次重新渲染，都会生成新的effect，替换掉之前的，这样可以保证在effect中获取最新的state变量值，而不用担心其过期。
     *   可选地对effect调用，可以设置useEffect的第二个参数，可以解决性能问题(请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。)
     * Q:为什么放在组件内部？
     * A:放在组件内部，就被保存在函数作用域中，可以在effect中直接访问state变量或props(显然Hooks使用了JS的闭包机制)
     * Q:需要同步操作时怎么办？
     * A:使用useEffect调度的effect不是同步的，与componentDidMount和ComponentDidUpdate的同步运行不同。如果有同步需求，可以使用 useLayoutEffect Hooks API
     */
    useEffect(()=>{
        //拉取数据

        //***注册监听***
        // DeviceEventEmitter.addListener('didUpdateDimensions', function(e) {
        //     if (e && e.fromCRN) { this.setState({_contentWidth: Dimensions.get('window').width, _contentHeight: Dimensions.get('window').height,}) }
        //  }.bind(this));

        //***清除监听***
        // return function cleanup() {
        //     DeviceEventEmitter.removeCurrentListener();//??
        // }
    }, [ideas])

    const theme = useContext(ThemeContext);

    return (
        <View style={{height: 300, paddingTop: 50, backgroundColor: 'yellow'}}>
            <Text>Fruit: {fruit}</Text>
            {(() => {return ideas.map((idea, index) => {return <Text key={index}>Idea Content: {idea.content}</Text>})})()}
            <Text>You clicked {count} times</Text>
            <Button onPress={() => setCount(count + 1)} title='Chick Me To +'></Button>
            <Button onPress={() => {
                if (count > 0) {
                    setCount(count - 1)
                }else {
                    alert('最小为0')
                }
            }} title='Chick Me To -'></Button>
            {/* useState可以通过函数式的setState结合展开运算符来达到class组件中setState方法的合并对象的效果 */}
            <Button onPress={() => setIdeas((prevIdeas) => {
                return [].concat([...prevIdeas], [{content: `Good Ideas ${count}`}])
            })} title='Add One Idea to Ideas'></Button>
            <Text>{theme}</Text>
            <Text>Ending</Text>
        </View>
    )
}

export default ExampleHooks