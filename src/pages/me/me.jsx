/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtButton, AtList, AtListItem } from 'taro-ui'
import login from '../../static/icons/login.png'
import './me.css'

export default class extends Component {
    render() {
        return (
            <View>
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
                        <AtButton type="primary" full size="small">
                            登陆/注册
                        </AtButton>
                    </View>
                </View>
                <View style="margin-top:40px"></View>
                <AtList>
                    <AtListItem
                        title="发票抬头"
                        arrow="right"
                        iconInfo={{
                            size: 20,
                            color: '#fe5d25',
                            value: 'money',
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
                    ></AtListItem>
                </AtList>
            </View>
        )
    }
}
