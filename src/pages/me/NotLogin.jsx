/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtButton, AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'
import login from '../../static/icons/login.png'

function NotLogin(props) {
    return (
        <View>
            <View style="margin-bottom:50px"></View>
            <View className="at-row at-row__justify--center">
                <AtAvatar image={login} circle size="large"></AtAvatar>
            </View>
            <View style="margin-top:10px"></View>
            <View className="at-row">
                <View className="at-col at-col-12" style="text-align:center">
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
                        onClick={props.onClick}
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
                    onClick={props.onClick}
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
        </View>
    )
}
export { NotLogin }
