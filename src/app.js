import { Component } from 'react'
import axios from 'taro-axios'
import './custom-theme.scss'
// import './app.css'

class App extends Component {
    componentDidMount() {
        // axios.defaults.baseURL =
        //     'http://rest.apizza.net/mock/477507dcdbdb6b798efe4b625bc25b59'
        // axios.defaults.baseURL = 'http://localhost:5000'
        axios.defaults.baseURL = 'https://www.jucreate.com:8888'
    }

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    // this.props.children 是将要会渲染的页面
    render() {
        return this.props.children
    }
}

export default App
