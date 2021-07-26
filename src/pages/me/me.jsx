/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import './me.css'
import { NotLogin } from './NotLogin'
import { getGlobalData } from '../../global'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
        }
    }

    componentDidShow() {
        const userName = getGlobalData('userName')
        if (userName === '') {
            console.log('未登陆')
            this.setState({ isLogin: false })
        } else {
            console.log('用户名：', userName)
            this.setState({ isLogin: true })
        }
    }

    render() {
        if (!this.state.isLogin) return <NotLogin onClick=""></NotLogin>
    }
}
