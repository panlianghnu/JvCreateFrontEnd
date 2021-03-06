/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import axios from 'taro-axios'
import { AtIcon } from 'taro-ui'
import './invention.css'

// 这是专利页面
export default class Invention extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyId: JSON.parse(getCurrentInstance().router.params.id),
            inventions: [
                {
                    id: '',
                    name: '',
                    filingDate: '',
                    inventionPerson: '',
                    status: '',
                    abstract: '',
                    fullText: '',
                },
            ],
        }
    }

    componentDidMount() {
        // console.log('Invention Axios')
        axios.get('/invention?id=' + this.state.companyId).then(
            ({ data }) => {
                this.setState({ inventions: data })
            },
            err => {
                console.log('axios err:', err)
            }
        )
    }

    getStatusColor(item) {
        const status = item.status
        if (status == '已授权') return 'color:green'
        if (status == '实质审查') return 'color:purple'
        if (status == '公开') return 'color:#fe5d25'
        return 'color:red'
    }

    onClickCard(item) {
        // console.log('跳转到专利详情，item:', item)
        Taro.navigateTo({
            url:
                '/pages/inventionDetail/inventionDetail?id=' +
                JSON.stringify(item.id),
        })
    }

    render() {
        const renderList = this.state.inventions.map((item, index) => {
            return (
                <View
                    key={item.id}
                    className="listItem"
                    hoverClass="hoverList"
                    onClick={this.onClickCard.bind(this, item)}
                >
                    <View className="at-row at-row__align--center">
                        <View className="at-col">
                            <View className="at-row at-row__align--center">
                                <View className="index at-col at-col-1 ">
                                    {index + 1}
                                </View>
                                <View style="margin-left:10px"></View>
                                <View className="inventionName at-col at-col--wrap">
                                    {item.name}
                                </View>
                            </View>
                            <View className="at-row at-row__align--center">
                                <View className="at-col at-col-11 at-col__offset-1">
                                    <View className="note">
                                        <Text>
                                            申请日：{item.filingDate + '\n'}
                                            发明人：
                                            {item.inventionPerson + '\n'}
                                            法律状态：
                                        </Text>
                                        <Text style={this.getStatusColor(item)}>
                                            {item.status + '\n'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View className="at-row__justify--end at-col at-col-1">
                            <AtIcon value="chevron-right" size="20" />
                        </View>
                    </View>
                </View>
            )
        })
        return (
            <View>
                <View style="margin-bottom:10px"></View>
                <View className="inventionList">{renderList}</View>
                {!this.state.inventions.length && (
                    <View style="margin:20px">暂无相关信息</View>
                )}
            </View>
        )
    }
}
