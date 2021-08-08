import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import axios from 'taro-axios'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { AtAccordion, AtTimeline } from 'taro-ui'
import './operation.css'


export default class Operation extends Component{
    constructor(props){
        super(props)
        this.getFinance = this.getFinance.bind(this)
        this.getEmploy = this.getEmploy.bind(this)
        this.getQulification = this.getQulification.bind(this)
        this.getAdmin = this.getAdmin.bind(this)
        this.state= {
            open1 : false,
            open2 : false,
            open3 : false,
            open4 : true,  
            companyId:getCurrentInstance().router.params.id,
            financeList:[],
            employList:[],
            qulificationList:[],
            adminList:[]
        }
    }
    componentWillMount() {}

    componentDidMount() {
        axios.all([this.getFinance(),this.getEmploy(),this.getQulification(),this.getAdmin()]);
    }

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}


    getFinance(){
        return axios.get('/getFinance?id=' + this.state.companyId).then(
            response => {
                // console.log('response.data: ', response.data)
                this.setState({
                    financeList: response.data,
                })
            },
            err => {
                console.log('axios err ', err)
            }
        )
    }

    getEmploy(){
        return axios.get('/getEmploy?id=' + this.state.companyId).then(
            response => {
                // console.log('response.data: ', response.data)
                this.setState({
                    employList: response.data,
                })
            },
            err => {
                console.log('axios err ', err)
            }
        )
    }

    getQulification(){
        return axios.get('/getQulification?id=' + this.state.companyId).then(
            response => {
                // console.log('response.data: ', response.data)
                this.setState({
                    qulificationList: response.data,
                })
            },
            err => {
                console.log('axios err ', err)
            }
        )
    }

    getAdmin(){
        return axios.get('/getAdmin?id=' + this.state.companyId).then(
            response => {
                // console.log('response.data: ', response.data)
                this.setState({
                    adminList: response.data,
                })
            },
            err => {
                console.log('axios err ', err)
            }
        )
    }

    render(){
        const employList = this.state.employList.map((item, index) => {
            return (
                <View
                    key={item.id}
                    className="listItem"
                    //hoverClass="hoverList"
                    //onClick={this.onClickCard.bind(this, item)}
                >
                    <View className="at-row at-row__align--center">
                        <View className="at-col">
                            <View className="at-row at-row__align--center">
                                <View className="index at-col at-col-1 ">
                                    {index + 1}
                                </View>
                                <View style="margin-left:10px"></View>
                                <View className="position at-col at-col--wrap">
                                    {item.position}
                                </View>
                            </View>
                            <View className="at-row at-row__align--center">
                                <View className="at-col at-col__offset-1">
                                    <View className="note">
                                        <View className="at-row">
                                            <View
                                                className="at-col at-col-1 at-col--auto"
                                            >
                                            发布日期：
                                            </View>
                                            <View className="at-col at-col_offset-1" style="color: grey;">
                                                {item.date}
                                            </View>
                                        </View>

                                        <View className="at-row">
                                            <View
                                                className="at-col at-col-1 at-col--auto"
                                            >
                                            薪资：
                                            </View>
                                            <View className="at-col at-col_offset-1" style="color: grey;">
                                                {item.salary}
                                            </View>
                                        </View>

                                        <View className="at-row">
                                            <View
                                                className="at-col at-col-1 at-col--auto"
                                            >
                                            学历：
                                            </View>
                                            <View className="at-col at-col_offset-1" style="color: grey;">
                                                {item.education}
                                            </View>
                                        </View>

                                        <View className="at-row">
                                            <View
                                                className="at-col at-col-1 at-col--auto"
                                            >
                                            工作经验：
                                            </View>
                                            <View className="at-col at-col_offset-1" style="color: grey;">
                                                {item.workExperience}
                                            </View>
                                        </View>

                                        <View className="at-row">
                                            <View
                                                className="at-col at-col-1 at-col--auto"
                                            >
                                            工作地区：
                                            </View>
                                            <View className="at-col at-col_offset-1" style="color: grey;">
                                                {item.region}
                                            </View>
                                        </View>
                                        {/* <Text>
                                            发布日期：{item.date + '\n'}
                                            薪资：
                                            {item.salary + '\n'}
                                            学历：{item.education + '\n'}
                                            工作经验：{item.workExperience + '\n'}
                                            工作地区：{item.region}
                                        </Text> */}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })

        const financeList = []
        let temp
        let i = 0
        let report
        for (; i < this.state.financeList.length; i++) {
            report = (
                <View>
                    <View className="at-row" style="margin-bottom:5px">
                        <View
                            style="font-weight:bold"
                            className="at-col at-col-1 at-col--auto"
                        >
                            营业收入：
                        </View>
                        <View className="at-col at-col_offset-1">
                            {this.state.financeList[i].turnover}
                        </View>
                    </View>
                    <View className="at-row" style="margin-bottom:5px">
                        <View
                            style="font-weight:bold"
                            className="at-col at-col-1 at-col--auto"
                        >
                            净利润：
                        </View>
                        <Text className="at-col at-col_offset-1 at-col--wrap">
                            {this.state.financeList[i].profits}
                        </Text>
                    </View>
                </View>
            )
            temp = {
                title: this.state.financeList[i].year,
                content: [report],
                icon: 'clock',
            }
            financeList.push(temp)
        }

        return (
            <View>
                    <AtAccordion
                        open={this.state.open1}
                        title="公司财务"
                        arrow="right"
                        onClick={value => {
                            this.setState({ open1: value })
                        }}
                    >
                        <View style="margin-left:30px;margin-top:20px">
                            <AtTimeline items={financeList}></AtTimeline>
                        </View>
                    </AtAccordion>

                    <AtAccordion
                        open={this.state.open2}
                        title="招聘信息"
                        arrow="right"
                        onClick={value => {
                            this.setState({ open2: value })
                        }}
                    >
                        <View >
                            <View className="employList">{employList}</View>
                        </View>
                    </AtAccordion>

                    <AtAccordion
                        open={this.state.open3}
                        title="资质证书"
                        arrow="right"
                        onClick={value => {
                            this.setState({ open3: value })
                        }}
                    >

                    </AtAccordion>
                    
                    <AtAccordion
                        open={this.state.open4}
                        title="行政许可"
                        arrow="right"
                        onClick={value => {
                            this.setState({ open4: value })
                        }}
                    >
                        
                    </AtAccordion>
            </View>
        )
    }
}