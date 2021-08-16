/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import { Logo } from '../../components/Logo'
import './contact.css'

export default class extends Component {
    render() {
        return (
            <View>
                <View style="margin-top:40px"></View>
                <View className="at-row at-row__justify--center">
                    <Logo width={40}></Logo>
                </View>
                <View style="margin-top:10px"></View>
                <View className="at-row at-row__justify--center">
                    <Text className="logo-text">
                        企业战略态势感知平台：V1.0.0
                    </Text>
                </View>
                <View style="margin-top:40px"></View>
                <View className="contact-list">
                    <View
                        className="contact-list-first-item"
                        onClick={() =>
                            Taro.makePhoneCall({
                                phoneNumber: '073185570895',
                            }).catch(() => {
                                console.log('取消拨打')
                            })
                        }
                    >
                        <View className="at-row at-row__align--center">
                            <View
                                className="at-col at-col-1"
                                style="text-align:center"
                            >
                                <AtIcon value="phone" size="20"></AtIcon>
                            </View>
                            <View className="at-col at-col-1 at-col--auto">
                                客服电话：
                            </View>
                            <View className="at-col">
                                <Text className="phone">0731-8557-0895</Text>
                            </View>
                            <View className="at-row__justify--end">
                                <View
                                    className="at-col"
                                    style="padding-right:10px"
                                >
                                    拨打
                                    <AtIcon value="chevron-right" size="20" />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="contact-list-item">
                        <View className="at-row at-row__align--center">
                            <View
                                className="at-col at-col-1"
                                style="text-align:center"
                            >
                                <AtIcon value="home" size="20"></AtIcon>
                            </View>
                            <View className="at-col at-col-1 at-col--auto">
                                官方网站：
                            </View>
                            <View className="at-col at-col--wrap">
                                www.jucreate.com
                            </View>
                        </View>
                    </View>
                    <View className="contact-list-item">
                        <View className="at-row at-row__align--center">
                            <View
                                className="at-col at-col-1"
                                style="text-align:center"
                            >
                                <AtIcon value="mail" size="20"></AtIcon>
                            </View>
                            <View className="at-col at-col-1 at-col--auto">
                                企业邮箱：
                            </View>
                            <View className="at-col at-col--wrap">
                                hi30058740@aliyun.com
                            </View>
                        </View>
                    </View>
                    <View className="contact-list-item">
                        <View className="at-row at-row__align--center">
                            <View
                                className="at-col at-col-1"
                                style="text-align:center"
                            >
                                <AtIcon value="map-pin" size="20"></AtIcon>
                            </View>
                            <View className="at-col at-col-1 at-col--auto">
                                联系地址：
                            </View>
                            <View className="at-col at-col--wrap">
                                <Text>北京市海淀区上地信息路26号8层0809室</Text>
                            </View>
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
                                北京聚创造网络科技有限公司
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
