import { Component } from 'react'
import axios from 'taro-axios'
import './custom-theme.scss'
import { getGlobalData, setGlobalData, setLoginState } from './global'
// import './app.css'

class App extends Component {
    componentDidMount() {
        Taro.checkSession({
            success:() => {
                setLoginState(true)
            },
            fail:() => {
                setLoginState(false)
                setGlobalData('token','')
            }

        })
        // axios.defaults.baseURL =
        //     'http://rest.apizza.net/mock/477507dcdbdb6b798efe4b625bc25b59'
        axios.defaults.baseURL = 'http://localhost:5000'
        //axios.defaults.baseURL = 'https://www.jucreate.com:8888'
        axios.interceptors.request.use(
            config =>{
                console.log('进入request拦截器')
                let token = getGlobalData('token')
                config.headers.Authrization = token
            },
            error => {
                return Promise.reject(error)
            }
        )
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
