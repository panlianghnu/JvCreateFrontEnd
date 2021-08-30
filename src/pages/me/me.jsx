/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import {
    AtAvatar,
    AtButton,
    AtActionSheet,
    AtActionSheetItem,
    AtMessage,
    AtIcon,
    AtModal,
} from 'taro-ui'
import { View, Text, Button } from '@tarojs/components'
import axios from 'taro-axios'
import Taro from '@tarojs/taro'
import './me.css'
import login from '../../static/icons/login.png'
import { setGlobalData, getGlobalData } from '../../global'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: getGlobalData('isLogin'),
            isOpened: false,
            nickName: '',
            userAvatar: '',
            showModal: false,
        }
    }

    componentDidMount() {
        let avatar = Taro.getStorageSync('userAvatar')
        let nickName = Taro.getStorageSync('nickName')
        if (avatar && nickName) {
            this.setState({ nickName: nickName, userAvatar: avatar })
        }
    }

    componentDidShow() {
        this.setState({
            isLogin: getGlobalData('isLogin'),
        })
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
                                Taro.setStorage({ key: 'token', data: data })
                                setGlobalData('isLogin', true)
                                resolve()
                            })
                            .catch(err => {
                                console.log('Axios err:', err)
                                setGlobalData('isLogin', false)
                            })
                    } else {
                        console.log('登陆失败！' + res.errMsg)
                        setGlobalData('isLogin', false)
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
                Taro.setStorage({
                    key: 'nickName',
                    data: res.userInfo.nickName,
                })
                Taro.setStorage({
                    key: 'userAvatar',
                    data: res.userInfo.avatarUrl,
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
            isLogin: getGlobalData('isLogin'),
        })
    }

    usernameLogin() {
        Taro.navigateTo({ url: '/pages/login/login' })
        this.handleCancel()
        // 手机号登陆逻辑
    }
    exit() {
        setGlobalData('isLogin', false)
        this.setState({
            isLogin: getGlobalData('isLogin'),
            showModal: false,
        })
        Taro.setStorageSync({
            key: 'token',
            data: '',
        })
        Taro.atMessage({
            message: '您已退出登录',
            type: 'success',
        })
    }
    handleClose() {
        this.setState({
            showModal: false,
        })
    }
    handleShow() {
        this.setState({
            showModal: true,
        })
    }

    render() {
        const isLogin = this.state.isLogin
        let page
        let modal = (
            <AtModal
                isOpened={this.state.showModal}
                title="提示"
                cancelText="取消"
                confirmText="确认"
                onClose={this.handleClose.bind(this)}
                onCancel={this.handleClose.bind(this)}
                onConfirm={this.exit.bind(this)}
                content="您确定要退出登录吗？"
            />
        )
        if (isLogin) {
            page = (
                <View>
                    <AtMessage />
                    <View style="margin-bottom:50px"></View>
                    <View className="at-row at-row__justify--center">
                        <AtAvatar
                            image={
                                this.state.userAvatar == ''
                                    ? login
                                    : this.state.userAvatar
                            }
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
                    <View style="margin-top:40px"></View>
                    <View className="button-list">
                        <Button
                            onClick={() => {
                                Taro.navigateTo({
                                    url: '/pages/collect/collect',
                                })
                            }}
                        >
                            <AtIcon value="star" color="#fe5d25" size="20" />
                            <View>我的收藏</View>
                            <AtIcon
                                value="chevron-right"
                                size="20"
                                color="rgb(210,210,210)"
                            />
                        </Button>
                        <Button openType="feedback">
                            <AtIcon value="mail" color="#fe5d25" size="20" />
                            <View>意见反馈</View>
                            <AtIcon
                                value="chevron-right"
                                size="20"
                                color="rgb(210,210,210)"
                            />
                        </Button>
                        <Button
                            onClick={() =>
                                Taro.navigateTo({
                                    url: '/pages/contact/contact',
                                })
                            }
                        >
                            <AtIcon value="phone" color="#fe5d25" size="20" />
                            <View>联系我们</View>
                            <AtIcon
                                value="chevron-right"
                                size="20"
                                color="rgb(210,210,210)"
                            />
                        </Button>
                        <Button
                            onClick={() =>
                                Taro.navigateTo({
                                    url: '/pages/aboutMe/aboutMe',
                                })
                            }
                        >
                            <AtIcon value="tag" color="#fe5d25" size="20" />
                            <View>关于我们</View>
                            <AtIcon
                                value="chevron-right"
                                size="20"
                                color="rgb(210,210,210)"
                            />
                        </Button>
                        <Button
                            className="button-last"
                            onClick={this.handleShow.bind(this)}
                        >
                            <AtIcon
                                value="external-link"
                                color="#fe5d25"
                                size="20"
                            />
                            <View>退出登录</View>
                            <AtIcon
                                value="chevron-right"
                                size="20"
                                color="rgb(210,210,210)"
                            />
                        </Button>
                    </View>
                    {modal}
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
                    <View className="button-list">
                        <Button
                            onClick={() => {
                                Taro.atMessage({
                                    message: '请先登陆',
                                    type: 'error',
                                })
                            }}
                        >
                            <AtIcon value="star" color="#fe5d25" size="20" />
                            <View>我的收藏</View>
                            <AtIcon
                                value="chevron-right"
                                size="20"
                                color="rgb(210,210,210)"
                            />
                        </Button>
                        <Button openType="feedback">
                            <AtIcon value="mail" color="#fe5d25" size="20" />
                            <View>意见反馈</View>
                            <AtIcon
                                value="chevron-right"
                                size="20"
                                color="rgb(210,210,210)"
                            />
                        </Button>
                        <Button
                            onClick={() =>
                                Taro.navigateTo({
                                    url: '/pages/contact/contact',
                                })
                            }
                        >
                            <AtIcon value="phone" color="#fe5d25" size="20" />
                            <View>联系我们</View>
                            <AtIcon
                                value="chevron-right"
                                size="20"
                                color="rgb(210,210,210)"
                            />
                        </Button>
                        <Button
                            className="button-last"
                            onClick={() =>
                                Taro.navigateTo({
                                    url: '/pages/aboutMe/aboutMe',
                                })
                            }
                        >
                            <AtIcon value="tag" color="#fe5d25" size="20" />
                            <View>关于我们</View>
                            <AtIcon
                                value="chevron-right"
                                size="20"
                                color="rgb(210,210,210)"
                            />
                        </Button>
                    </View>

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
