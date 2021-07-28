/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import axios from 'taro-axios'
import { getCurrentInstance } from '@tarojs/taro'
import { AtAccordion, AtTimeline } from 'taro-ui'

// 工商信息页面，具体描述股权结构和变更记录
export default class Stock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyId: getCurrentInstance().router.params.id,
            items: [
                {
                    isPerson: false,
                    id: 0,
                    name: '',
                    money: 0, // 认缴出资额
                    percent: 0, // 持股比例
                    date: '', // 认缴事件
                },
            ],
            open1: false,
            open2: true,
        }
    }

    componentDidMount() {
        axios.get('/stock?id=' + this.state.companyId).then(
            response => {
                // console.log('response.data: ', response.data)
                this.setState({
                    items: response.data,
                })

                // 修改一下假数据
                var items = this.state.items
                for (var i = 0; i < items.length; i++) {
                    items[i].money %= 1000000
                    items[i].percent %= 100
                }
                this.setState({ items: items })
            },
            err => {
                console.log('axios err ', err)
            }
        )
    }

    render() {
        const stockList = this.state.items.map(item => {
            return (
                <View key={item.id} style="text-align:center">
                    <View className="at-row">
                        <View className="at-article__h1">{item.name}</View>
                    </View>
                    <View className="at-row">
                        <View className="at-col-4">
                            <View className="at-article__p">
                                <Text>持股比例</Text>
                                <Text style="color:#fe5d25">
                                    {'\n' + item.percent}%
                                </Text>
                            </View>
                        </View>
                        <View className="at-col-4">
                            <View className="at-article__p">
                                <Text>认缴出资额{'\n' + item.money}万元</Text>
                            </View>
                        </View>
                        <View className="at-col-4">
                            <View className="at-article__p">
                                <Text>认缴时间{'\n' + item.date}</Text>
                            </View>
                        </View>
                    </View>
                    <View className="at-row"></View>
                </View>
            )
        })
        return (
            <View>
                <View>
                    <AtAccordion
                        open={this.state.open1}
                        title="股权信息"
                        arrow="right"
                        onClick={value => {
                            this.setState({ open1: value })
                        }}
                    >
                        {stockList}
                    </AtAccordion>
                    <AtAccordion
                        open={this.state.open2}
                        title="融资情况"
                        arrow="right"
                        onClick={value => {
                            this.setState({ open2: value })
                        }}
                    >
                        <View style="margin-left:30px;margin-top:20px">
                            <AtTimeline
                                items={[
                                    {
                                        title: '2012-12-11',
                                        content: [
                                            '投资者：李宏毅',
                                            '轮次：天使轮',
                                            '投资金额：2321万元',
                                            '融资顾问：长沙中关村湘军创业服务有限公司',
                                        ],
                                        icon: 'clock',
                                    },
                                    {
                                        title: '2014-02-24',
                                        content: [
                                            '投资者：雷军',
                                            '轮次：PreA轮',
                                            '投资金额：200万元',
                                            '融资顾问：长沙中关村湘军创业服务有限公司',
                                        ],
                                        icon: 'clock',
                                    },
                                    {
                                        title: '2014-08-30',
                                        content: [
                                            '投资者：红杉资本中国',
                                            '轮次：A轮',
                                            '投资金额：30000万元',
                                            '融资顾问：长沙中关村湘军创业服务有限公司',
                                        ],
                                        icon: 'clock',
                                    },
                                    {
                                        title: '2016-07-11',
                                        content: [
                                            '投资者：上海清科投资管理有限公司',
                                            '轮次：A+轮',
                                            '投资金额：10000万元',
                                            '融资顾问：长沙中关村湘军创业服务有限公司',
                                        ],
                                        icon: 'clock',
                                    },
                                ]}
                            />
                        </View>
                    </AtAccordion>
                </View>
            </View>
        )
    }
}
