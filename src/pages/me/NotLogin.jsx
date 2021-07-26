/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { View, Text } from '@tarojs/components'
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
import Taro from '@tarojs/taro'
import login from '../../static/icons/login.png'

class NotLogin extends Component {
    constructor(props) {
        super(props)
        this.state = { isOpened: false }
    }

    handleActionSheet() {
        this.setState({ isOpened: true })
    }

    handleCancel() {
        this.setState({ isOpened: false })
    }

    wxLogin() {
        Taro.atMessage({
            message: '微信登陆成功',
            type: 'success',
        })
        this.handleCancel()
    }

    usernameLogin() {
        Taro.navigateTo({ url: '/pages/login/login' })
        this.handleCancel()
        // Taro.login({
        //     success: res => {
        //         if (res.code) {
        //             // Axios.get
        //             console.log('获取登陆code成功，code：', res.code)
        //         } else {
        //             console.log('获取登陆code失败')
        //         }
        //     },
        // })
    }

    render() {
        return (
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
                            Taro.navigateTo({ url: '/pages/contact/contact' })
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
                    <AtActionSheetItem onClick={this.usernameLogin.bind(this)}>
                        手机号码登陆
                    </AtActionSheetItem>
                </AtActionSheet>
            </View>
        )
    }
}
export { NotLogin }
