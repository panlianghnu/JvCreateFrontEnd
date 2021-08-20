import { Component } from 'react'
import axios from 'taro-axios'
import Taro from '@tarojs/taro'
import './custom-theme.scss'
import { setGlobalData } from './global'
// import './app.css'

class App extends Component {
    componentDidMount() {
        Taro.checkSession({
            success: () => {
                setGlobalData('isLogin', true)
            },
            fail: () => {
                setGlobalData('isLogin', false)
                Taro.setStorage({ key: 'token', data: '' })
            },
        }).catch(err => {
            console.log('check session fail: ', err)
        })
        axios.defaults.baseURL = 'http://localhost:5000'
        //axios.defaults.baseURL = 'https://www.jucreate.com:8888'
        axios.interceptors.request.use(
            config => {
                let token = Taro.getStorageSync('token')
                console.log('进入axios拦截器，token为：', token)
                if (token) {
                    config.headers.Authorization = token
                }
                return config
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
