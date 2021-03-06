/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import axios from 'taro-axios'
import { getCurrentInstance } from '@tarojs/taro'
import { AtAccordion, AtTimeline,AtActivityIndicator} from 'taro-ui'
import './stock.css'
import { findLastKey } from 'lodash'

// 工商信息页面，具体描述股权结构和变更记录
export default class Stock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyId: JSON.parse(getCurrentInstance().router.params.id),
            address:JSON.parse(getCurrentInstance().router.params.address),
            items: [
                {
                    isPerson: false,
                    id: 0,
                    name: '',
                    money: '', // 认缴出资额
                    percent: '', // 持股比例
                    date: '', // 认缴事件
                },
            ],
            change: [],
            open0:false,
            open1: false,
            open2: true,
            isLoding:true
        }
    }

    componentDidMount() {
        axios.all([this.getStock(), this.getChange()])
    }

    getStock() {
        return axios.get('/stock?id=' + this.state.companyId).then(
            response => {
                console.log('response.data: ', response.data)

                this.setState({
                    items: response.data,
                })
            },
            err => {
                console.log('axios err ', err)
            }
        )
    }
    getChange() {
        return axios.get('/change?id=' + this.state.companyId).then(
            response => {
                // console.log('response.data: ', response.data)
                this.setState({
                    change: response.data,
                    isLoding:false
                })

                //修改一下换行数据
                let newState = this.state.change
                for (let i = 0; i < newState.length; i++) {
                    let item = newState[i]
                    item.beforeChange = item.beforeChange.replaceAll(
                        '\\n',
                        '\n'
                    )
                    item.afterChange = item.afterChange.replaceAll('\\n', '\n')
                }
                this.setState({ change: newState })
            },
            err => {
                this.setState({
                    isLoding:false
                })
                console.log('axios err ', err)
            }
        )
    }

    render() {
        let stockList = this.state.items.map(item => {
            return (
                <View key={item.id} style="text-align:center;font-weight:normal">
                    <View style="margin-bottom:10px"></View>
                    <View className="stock-title">
                        <Text>{item.name}</Text>
                    </View>
                    <View style="margin-bottom:3px"></View>
                    <View className="pl-row">
                        <View className="pl-col">
                            <View className="stock-content">
                                <Text>持股比例</Text>
                                <Text style="color:#fe5d25">
                                    {'\n' + item.percent}%
                                </Text>
                            </View>
                        </View>
                        <View className="pl-col">
                            <View className="stock-content">
                                <Text>认缴出资额{'\n' + item.money}</Text>
                            </View>
                        </View>
                        <View className="pl-col">
                            <View className="stock-content">
                                <Text>认缴时间{'\n' + item.date}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
        if (this.state.items.length == 0) {
            stockList = <View style="margin:20px;font-weight:normal">暂无相关信息</View>
        }
        var renderChange = null
        if(this.state.isLoding)
        {
           //renderChange = <AtActivityIndicator mode="center" isOpened={this.state.isLoding} content="加载中......"/>
           return (
            <AtActivityIndicator
                mode="center"
                isOpened={this.state.loading}
                content="正在加载..."
            />
            )
        }
        let changeList = []
        let temp
        let i = 0
        let changeLog
        for (; i < this.state.change.length; i++) {
            changeLog = (
                <View>
                    <View className="at-row" style="margin-bottom:5px">
                        <View
                            style="font-weight:bold"
                            className="at-col at-col-1 at-col--auto"
                        >
                            变更项目：
                        </View>
                        <View className="at-col at-col_offset-1">
                            {this.state.change[i].changeItem}
                        </View>
                    </View>
                    <View className="at-row" style="margin-bottom:5px">
                        <View
                            style="font-weight:bold"
                            className="at-col at-col-1 at-col--auto"
                        >
                            变更前：
                        </View>
                        <Text className="at-col at-col_offset-1 at-col--wrap" style="margin-right:10px">
                            {this.state.change[i].beforeChange}
                        </Text>
                    </View>
                    <View className="at-row">
                        <View
                            style="font-weight:bold"
                            className="at-col at-col-1 at-col--auto"
                        >
                            变更后：
                        </View>
                        <Text className="at-col at-col_offset-1 at-col--wrap" style="margin-right:10px">
                            {this.state.change[i].afterChange}
                        </Text>
                    </View>
                </View>
            )
            temp = {
                title: this.state.change[i].date,
                content: [changeLog],
                icon: 'clock',
            }
            changeList.push(temp)
        }
        
        
        if (this.state.change.length == 0 && !this.state.isLoding) {
            renderChange = <View style="margin:20px;font-weight:normal">暂无相关信息</View>
        } else {
            renderChange = (
                <View style="margin-left:30px;margin-top:5px">
                    <AtTimeline items={changeList}></AtTimeline>
                </View>
            )
        }
        return (
            <View>
                <View>
                    <AtAccordion className="Accordion"
                        open={this.state.open0}
                        title="公司住所"
                        arrow="right"
                        hasBorder={false}
                        onClick={value => {
                            this.setState({ open0: value })
                        }}
                    >
                        <View className="address" >
                            <Text>{this.state.address}</Text>
                        </View>
                    </AtAccordion>
                    
                    <View className="border"></View>
                    <AtAccordion className="Accordion"
                        open={this.state.open1}
                        title="股权结构"
                        arrow="right"
                        hasBorder={false}
                        onClick={value => {
                            this.setState({ open1: value })
                        }}
                    >
                        {stockList}
                    </AtAccordion>

                    <View className="border"></View>
                    <AtAccordion className="Accordion"
                        open={this.state.open2}
                        title="变更记录"
                        arrow="right"
                        hasBorder={false}
                        onClick={value => {
                            this.setState({ open2: value })
                        }}
                    >
                        <View style="font-weight:normal">
                            {renderChange}
                        </View>
                    </AtAccordion>
                    <View>
                        {!this.state.open2 && <View className="border"></View>} 
                    </View>
                    
                </View>
            </View>
        )
    }
}
