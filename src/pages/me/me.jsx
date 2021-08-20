/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import {
    AtAvatar,
    AtButton,
    AtList,
    AtListItem,
    AtActionSheet,
    AtActionSheetItem,
    AtMessage,
} from 'taro-ui'
import { View, Text } from '@tarojs/components'
import axios from 'taro-axios'
import Taro from '@tarojs/taro'
import './me.css'
import login from '../../static/icons/login.png'
import {
    getGlobalData,
    setLoginState,
    getLoginState,
    setGlobalData,
} from '../../global'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: getLoginState(),
            isOpened: false,
            nickName: '未登录',
            userAvatar: '',
        }
    }

    handleActionSheet() {
        this.setState({ isOpened: true })
    }

    handleCancel() {
        this.setState({ isOpened: false })
    }

    login() {
        return new Promise((resolve, reject) => {
            Taro.login({
                success: res => {
                    console.log(res.code)
                    if (res.code) {
                        axios
                            .get('/wxLogin?code=' + res.code)
                            .then(({ data }) => {
                                console.log(data)
                                setGlobalData('token', data)
                                setLoginState(true)
                                resolve()
                            })
                            .catch(err => {
                                console.log('Axios err:', err)
                                setLoginState(false)
                            })
                    } else {
                        console.log('登陆失败！' + res.errMsg)
                        setLoginState(false)
                    }
                },
            }).catch(() => {
                reject()
            })
        })
    }
    async wxLogin() {
        let isAuth = true
        await Taro.getUserProfile({
            desc: '用于页面展示个人信息',
            success: res => {
                this.setState({
                    nickName: res.userInfo.nickName,
                    userAvatar: res.userInfo.avatarUrl,
                })
                Taro.atMessage({
                    message: '微信登陆成功',
                    type: 'success',
                })
            },
        }).catch(() => {
            console.log('用户取消授权')
            isAuth = false
        })
        if (!isAuth) {
            return
        }
        await this.login()
        this.setState({
            isLogin: getLoginState(),
        })
    }

    usernameLogin() {
        Taro.navigateTo({ url: '/pages/login/login' })
        this.handleCancel()
        // 手机号登陆逻辑
    }

    render() {
        const isLogin = this.state.isLogin
        let page
        if (isLogin) {
            page = (
                <View>
                    <AtMessage />
                    <View style="margin-bottom:50px"></View>
                    <View className="at-row at-row__justify--center">
                        <AtAvatar
                            image={this.state.userAvatar}
                            circle
                            size="large"
                        ></AtAvatar>
                    </View>
                    <View style="margin-top:10px"></View>
                    <View className="at-row">
                        <View
                            className="at-col at-col-12"
                            style="text-align:center"
                        >
                            <Text className="login-text">
                                {this.state.nickName}
                            </Text>
                        </View>
                    </View>
                    <View style="margin-top:20px"></View>
                    <View style="margin-top:40px"></View>
                    <AtList>
                        <AtListItem
                            title="我的收藏"
                            arrow="right"
                            iconInfo={{
                                size: 20,
                                color: '#fe5d25',
                                value: 'star',
                            }}
                            // onClick={() => {
                            //     Taro.atMessage({
                            //         message: '请先登陆',
                            //         type: 'error',
                            //     })
                            // }}
                        ></AtListItem>
                        <AtListItem
                            title="意见反馈"
                            arrow="right"
                            iconInfo={{
                                size: 20,
                                color: '#fe5d25',
                                value: 'mail',
                            }}
                        ></AtListItem>
                        <AtListItem
                            title="联系我们"
                            arrow="right"
                            iconInfo={{
                                size: 20,
                                color: '#fe5d25',
                                value: 'phone',
                            }}
                            onClick={() =>
                                Taro.navigateTo({
                                    url: '/pages/contact/contact',
                                })
                            }
                        ></AtListItem>
                        <AtListItem
                            title="关于我们"
                            arrow="right"
                            iconInfo={{
                                size: 20,
                                color: '#fe5d25',
                                value: 'external-link',
                            }}
                            onClick={() =>
                                Taro.navigateTo({
                                    url: '/pages/aboutMe/aboutMe',
                                })
                            }
                        ></AtListItem>
                    </AtList>
                </View>
            )
        } else
            page = (
                <View>
                    <AtMessage />
                    <View style="margin-bottom:50px"></View>
                    <View className="at-row at-row__justify--center">
                        <AtAvatar image={login} circle size="large"></AtAvatar>
                    </View>
                    <View style="margin-top:10px"></View>
                    <View className="at-row">
                        <View
                            className="at-col at-col-12"
                            style="text-align:center"
                        >
                            <Text className="login-text">登陆使用全部功能</Text>
                        </View>
                    </View>
                    <View style="margin-top:20px"></View>
                    <View className="at-row at-row__justify--center">
                        <View className="at-col at-col-6">
                            <AtButton
                                type="primary"
                                full
                                size="small"
                                onClick={this.handleActionSheet.bind(this)}
                            >
                                登陆/注册
                            </AtButton>
                        </View>
                    </View>
                    <View style="margin-top:40px"></View>
                    <AtList>
                        <AtListItem
                            title="我的收藏"
                            arrow="right"
                            iconInfo={{
                                size: 20,
                                color: '#fe5d25',
                                value: 'star',
                            }}
                            onClick={() => {
                                Taro.atMessage({
                                    message: '请先登陆',
                                    type: 'error',
                                })
                            }}
                        ></AtListItem>
                        <AtListItem
                            title="意见反馈"
                            arrow="right"
                            iconInfo={{
                                size: 20,
                                color: '#fe5d25',
                                value: 'mail',
                            }}
                        ></AtListItem>
                        <AtListItem
                            title="联系我们"
                            arrow="right"
                            iconInfo={{
                                size: 20,
                                color: '#fe5d25',
                                value: 'phone',
                            }}
                            onClick={() =>
                                Taro.navigateTo({
                                    url: '/pages/contact/contact',
                                })
                            }
                        ></AtListItem>
                        <AtListItem
                            title="关于我们"
                            arrow="right"
                            iconInfo={{
                                size: 20,
                                color: '#fe5d25',
                                value: 'external-link',
                            }}
                            onClick={() =>
                                Taro.navigateTo({
                                    url: '/pages/aboutMe/aboutMe',
                                })
                            }
                        ></AtListItem>
                    </AtList>
                    <AtActionSheet
                        isOpened={this.state.isOpened}
                        cancelText="取消"
                        onCancel={this.handleCancel.bind(this)}
                        onClose={this.handleCancel.bind(this)}
                    >
                        <AtActionSheetItem onClick={this.wxLogin.bind(this)}>
                            微信一键登录
                        </AtActionSheetItem>
                        <AtActionSheetItem
                            onClick={this.usernameLogin.bind(this)}
                        >
                            手机号码登陆
                        </AtActionSheetItem>
                    </AtActionSheet>
                </View>
            )
        return <View>{page}</View>
    }
}
