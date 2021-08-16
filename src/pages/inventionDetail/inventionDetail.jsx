/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { AtDivider } from 'taro-ui'
import axios from 'taro-axios'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inventionId: getCurrentInstance().router.params.id,
            name: '',
            filingDate: '',
            inventionPerson: '',
            status: '',
            abstract: '',
            fullText: '',
        }
        // console.log('专利详情，专利ID为：', this.state.inventionId)
    }

    componentDidMount() {
        axios
            .get(`/inventionDetail?id=${this.state.inventionId}`)
            .then(({ data }) => {
                console.log(data)
                this.setState({
                    name: data.name,
                    filingDate: data.filingDate,
                    inventionPerson: data.inventionPerson,
                    status: data.status,
                    abstract: data.abstract,
                    fullText: data.fullText,
                })
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
                    </View>
                </View>
            </View>
        )
    }
}
