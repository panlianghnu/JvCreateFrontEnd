import { Component } from 'react'
import axios from 'taro-axios'
import './custom-theme.scss'
// import './app.css'

class App extends Component {
    componentDidMount() {
        axios.defaults.baseURL = 'https://mock.yonyoucloud.com/mock/18112/api'
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
