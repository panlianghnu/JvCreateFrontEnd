/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-indent-props */
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton, AtMessage, AtForm } from 'taro-ui'
import { Component } from 'react'
import './login.css'
import axios from 'taro-axios'
import { setGlobalData, getGlobalData } from '../../global'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            code: '',
            loading: false,
            isGetCodeActive: false,
            time: 60,
        }
    }
    codetimer = () => {
        let time = this.state.time
        let siv = setInterval(() => {
            this.setState({
                time: time--,
                loading: true,
            })
            if (time <= -1) {
                clearInterval(siv)
                this.setState({
                    loading: false,
                    time: 60,
                })
            }
        }, 1000)
    }

    handleGetCode() {
        var phone = this.state.phone
        if (phone.length < 11) return
        // getCode(phone) then raise a tips

        this.codetimer()
        axios
            .get('/getVerifyCode?phone='+phone)
            .then(response => {
                console.log(response)
                if (response.status == 200) {
                    Taro.atMessage({
                        message: '发送验证码成功',
                        type: 'success',
                    })
                }
                else{
                    Taro.atMessage({
                        message: '获取验证码失败',
                        type: 'fali',
                    })
                }
            })
            .catch(err => {
                console.log('Axios err:', err)
        })
        
    }

    onSubmit () {
        if (this.state.phone == '') {
            Taro.atMessage({
                message: '请先输入手机号',
                type: 'fail',
            })
            return
        }
        else if (this.state.code == '') {
            Taro.atMessage({
                message: '请输入验证码',
                type: 'fail',
            })
            return
        }
        else
        {
            axios
            .get('/phoneLogin?phone='+this.state.phone+'&code='+this.state.code)
            .then(response => {
                console.log(response)
                if (response.status == 200) {
                    let token = response.data.token 
                    Taro.setStorage({
                        'key':'token',
                        'data':token
                    })
                    setGlobalData('isLogin', true)
                    Taro.atMessage({
                        message: '登录成功',
                        type: 'success',
                    })
                    Taro.switchTab({ url: '/pages/me/me' })
                }
                else{
                    Taro.atMessage({
                        message: '登录失败',
                        type: 'fail',
                    })
                    setGlobalData('isLogin', false)
                }
            })
            .catch(err =>{
                console.log('Axios err:', err)
            })
        } 
        
    }

    render() {
        return (
            <View className="login-app">
                <View className="login-body">
                    <AtMessage />
                    <View className="title">欢迎使用聚创造</View>
                    <View className="ps">
                        未注册过的手机号码将自动注册为聚创造用户
                    </View>
                        <View className="m-form">
                            <View style="width:100%;">
                                <View style="margin-top:10px"></View>
                                <AtInput
                                    name="phone"
                                    placeholder="请输入手机号"
                                    value={this.state.phone}
                                    maxlength={10}
                                    type="text"
                                    onChange={value => {
                                        // 手机号最多11位
                                        // 输入抖动怎么解决呢...
                                        if (value.length > 11) {
                                            value = value.slice(0, 11)
                                        }

                                        var active = false
                                        if (value.length >= 11) {
                                            active = true
                                        }
                                        this.setState({
                                            phone: value,
                                            isGetCodeActive: active,
                                        })
                                        return value
                                    }}
                                />
                                <View style="margin-top:5px"></View>
                                <AtInput
                                    name="code"
                                    placeholder="请输入验证码"
                                    value={this.state.code}
                                    onChange={value => {
                                        // 验证码搞个四位吧
                                        if (value.length > 4) {
                                            value = value.slice(0, 4)
                                        }
                                        this.setState({ code: value })
                                        return value
                                    }}
                                >
                                    <View style="color:grey">
                                        {this.state.loading ? (
                                            this.state.time + '秒后重试'
                                        ) : this.state.isGetCodeActive ? (
                                            <View
                                                style="color:#fe865c;"
                                                onClick={this.handleGetCode.bind(
                                                    this
                                                )}
                                            >
                                                获取验证码
                                            </View>
                                        ) : (
                                            '获取验证码'
                                        )}
                                    </View>
                                </AtInput>
                            </View>
                            <View className="confirm">
                                <AtButton type="primary" onClick={this.onSubmit.bind(this)}>登陆</AtButton>
                            </View>
                            <View className="note">
                                注册/登陆即表示同意
                                <Text className="user-agreement">《用户协议》</Text>
                            </View>
                        </View>

                    
                </View>
                <View className="bottom">
                    <View className="at-row at-row__justify--center at-row__align--center">
                        <View className="at-col at-col-1">
                            <View style="background:grey;height:1px;"></View>
                        </View>
                        <View className="at-col at-col-1 at-col--auto">
                            <Text style="margin-left:5px;margin-right:5px">
                                聚创造网络科技有限公司
                            </Text>
                        </View>
                        <View className="at-col at-col-1">
                            <View style="background:grey;height:1px;"></View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
