/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View } from '@tarojs/components'
import axios from 'taro-axios'
import { getCurrentInstance } from '@tarojs/taro'
import { AtAccordion, AtTimeline } from 'taro-ui'

// 融资情况页面，具体描述融资情况， ?(news)
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyId: getCurrentInstance().router.params.id,
            open1: true,
            open2: false,
        }
    }

    componentDidMount() {
        axios.get('/stock?id=' + this.state.companyId).then()
    }

    render() {
        return (
            <View>
                <View>
                    <AtAccordion
                        open={this.state.open1}
                        title="融资情况"
                        arrow="right"
                        onClick={value => {
                            this.setState({ open1: value })
                        }}
                    >
                        <View style="margin-left:30px;margin-top:20px">
                            <AtTimeline
                                items={[
                                    {
                                        title: '2016-07-11',
                                        content: [
                                            '轮次：A+轮',
                                            '投资者：上海清科投资管理有限公司',
                                            '投资金额：10000万元',
                                            '融资顾问：长沙中关村湘军创业服务有限公司',
                                        ],
                                        icon: 'clock',
                                    },
                                    {
                                        title: '2014-08-30',
                                        content: [
                                            '轮次：A轮',
                                            '投资者：红杉资本中国',
                                            '投资金额：30000万元',
                                            '融资顾问：长沙中关村湘军创业服务有限公司',
                                        ],
                                        icon: 'clock',
                                    },
                                    {
                                        title: '2014-02-24',
                                        content: [
                                            '轮次：PreA轮',
                                            '投资者：雷军',
                                            '投资金额：200万元',
                                            '融资顾问：长沙中关村湘军创业服务有限公司',
                                        ],
                                        icon: 'clock',
                                    },
                                    {
                                        title: '2012-12-11',
                                        content: [
                                            '轮次：天使轮',
                                            '投资者：李宏毅',
                                            '投资金额：2321万元',
                                            '融资顾问：长沙中关村湘军创业服务有限公司',
                                        ],
                                        icon: 'clock',
                                    },
                                ]}
                            />
                        </View>
                    </AtAccordion>
                    <AtAccordion
                        open={this.state.open2}
                        title="新闻报道"
                        arrow="right"
                        onClick={value => {
                            this.setState({ open2: value })
                        }}
                    >
                        <View>暂无</View>
                    </AtAccordion>
                </View>
            </View>
        )
    }
}
