/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-indent-props */
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton, AtMessage } from 'taro-ui'
import { Component } from 'react'
import './login.css'

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
        Taro.atMessage({
            message: '发送验证码成功',
            type: 'success',
        })
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
                            <AtButton type="primary">登陆</AtButton>
                        </View>
                        <View className="note">
                            注册/登陆即表示同意
                            <Text className="user-agreement">《用户协议》</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}