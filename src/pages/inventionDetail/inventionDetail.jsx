/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { AtDivider } from 'taro-ui'
import axios from 'taro-axios'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inventionId: getCurrentInstance().router.params.id,
            name: '一种检测系统引导区异常的方法及装置',
            filingDate: '2021-01-11',
            inventionPerson: '代鹏',
            status: '已授权',
            abstract:
                '本发明提供一种检测系统引导区异常的方法及装置，所述方法包括：步骤S1，当前操作系统通过BIOS启动时，获取实模式下可用物理内存大小，将所述可用物理内存大小作为第一值；步骤S2，根据当前操作系统的版本获取该版本对应的实模式可访问的正常物理内存大小，将所述正常物理内存大小作为第二值；步骤S3，比较所述第一值和所述第二值的大小，如果比较结果不一致，则检测到当前操作系统引导区异常。根据本发明的方案，可以更全面地检测系统引导区异常。',
            fullText: '',
            abstractPic:
                'http://static.tianyancha.com/patent/abstractPic/CN/A/112/733/CN112733143A_HDA0002892595500000011.png',
        }
        // console.log('专利详情，专利ID为：', this.state.inventionId)
    }

    componentDidMount() {
        axios
            .get('/inventionDetail')
            .then(({ data }) => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    getStatusColor() {
        const status = this.state.status
        if (status == '已授权') return 'color:green'
        if (status == '实质审查') return 'color:purple'
        if (status == '公开') return 'color:#fe5d25'
        return 'color:red'
    }

    render() {
        return (
            <View className="at-article">
                <View className="at-article-content">
                    <View className="at-article-section">
                        <View className="at-row">
                            <View className="at-article__h2">著录项目信息</View>
                        </View>

                        <AtDivider></AtDivider>

                        <View className="at-row">
                            <Text className="at-article__h3">
                                {this.state.name}
                            </Text>
                        </View>

                        <View className="at-article__p">
                            <View className="at-row">
                                <Text>
                                    申请日：{this.state.filingDate + '\n'}
                                </Text>
                            </View>
                            <View className="at-row">
                                <Text>
                                    发明人：{this.state.inventionPerson + '\n'}
                                </Text>
                            </View>
                            <View className="at-row">
                                <Text>法律状态：</Text>
                                <Text style={this.getStatusColor()}>
                                    {this.state.status + '\n'}
                                </Text>
                            </View>
                        </View>
                        <View style="margin-top:20px"></View>
                        <View className="at-row">
                            <View className="at-article__h3">摘要</View>
                        </View>
                        <View className="at-row">
                            <View className="at-article__p">
                                <Text style="text-indent:20px">
                                    {this.state.abstract}
                                </Text>
                            </View>
                        </View>
                        <View style="margin-top:20px"></View>
                        <View className="at-row">
                            <View className="at-article__h3">摘要附图</View>
                        </View>
                        <View className="at-row at-row__align--center">
                            <View
                                className="at-col"
                                style="text-align:center;margin-top:20px"
                                showMenuByLongpress="true"
                            >
                                <Image
                                    mode="aspectFit"
                                    src={this.state.abstractPic}
                                ></Image>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
