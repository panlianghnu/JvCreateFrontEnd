/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-indent-props */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import axios from 'taro-axios'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { AtAccordion, AtTimeline, AtIcon } from 'taro-ui'
import './operation.css'

export default class Operation extends Component {
    constructor(props) {
        super(props)
        this.getFinance = this.getFinance.bind(this)
        this.getEmploy = this.getEmploy.bind(this)
        this.getQualification = this.getQualification.bind(this)
        this.getAdmin = this.getAdmin.bind(this)
        this.state = {
            open1: false,
            open2: false,
            open3: false,
            open4: true,
            companyId: JSON.parse(getCurrentInstance().router.params.id),
            financeList: [],
            employList: [],
            qualificationList: [],
            adminList: [],
        }
    }
    componentWillMount() {}

    componentDidMount() {
        axios.all([
            this.getFinance(),
            this.getEmploy(),
            this.getQualification(),
            this.getAdmin(),
        ])
    }

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    getFinance() {
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

    getEmploy() {
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

    getQualification() {
        return axios.get('/getQualification?id=' + this.state.companyId).then(
            response => {
                console.log('response.data: ', response.data)
                this.setState({
                    qualificationList: response.data,
                })
            },
            err => {
                console.log('axios err ', err)
            }
        )
    }

    getAdmin() {
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

    navigateToAdminLicencePage(item) {
        Taro.navigateTo({
            url: `/pages/adminLicence/adminLicence?item=${JSON.stringify(
                item
            )}`,
        })
    }

    render() {
        /* 招聘信息 */
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
                                            <View className="at-col at-col-1 at-col--auto">
                                                发布日期：
                                            </View>
                                            <View
                                                className="at-col "
                                                style="color: grey;"
                                            >
                                                {item.date}
                                            </View>
                                        </View>

                                        <View className="at-row">
                                            <View className="at-col at-col-1 at-col--auto">
                                                薪资：
                                            </View>
                                            <View
                                                className="at-col "
                                                style="color: grey;"
                                            >
                                                {item.salary}
                                            </View>
                                        </View>

                                        <View className="at-row">
                                            <View className="at-col at-col-1 at-col--auto">
                                                学历：
                                            </View>
                                            <View
                                                className="at-col "
                                                style="color: grey;"
                                            >
                                                {item.education}
                                            </View>
                                        </View>

                                        <View className="at-row">
                                            <View className="at-col at-col-1 at-col--auto">
                                                工作经验：
                                            </View>
                                            <View
                                                className="at-col "
                                                style="color: grey;"
                                            >
                                                {item.workExperience}
                                            </View>
                                        </View>

                                        <View className="at-row">
                                            <View className="at-col at-col-1 at-col--auto">
                                                工作地区：
                                            </View>
                                            <View
                                                className="at-col "
                                                style="color: grey;"
                                            >
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

        /*财务状况*/
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
                        <View className="at-col ">
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
                        <Text className="at-col  at-col--wrap">
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

        /* 资质证书*/
        const qualificationList = this.state.qualificationList.map(
            (item, index) => {
                return (
                    <View key={item.id} className="listItem">
                        <View className="at-row at-row__align--center">
                            <View className="at-col">
                                <View className="at-row at-row__align--center">
                                    <View className="index at-col at-col-1 ">
                                        {index + 1}
                                    </View>
                                    <View style="margin-left:10px"></View>
                                    <View className="position at-col at-col--wrap">
                                        {item.type}
                                    </View>
                                </View>
                                <View className="at-row at-row__align--center">
                                    <View className="at-col at-col__offset-1">
                                        <View className="note">
                                            <View className="at-row">
                                                <View className="at-col at-col-1 at-col--auto">
                                                    证书编号：
                                                </View>
                                                <View
                                                    className="at-col "
                                                    style="color: grey;"
                                                >
                                                    {item.number}
                                                </View>
                                            </View>

                                            <View className="at-row">
                                                <View className="at-col at-col-1 at-col--auto">
                                                    产品名称：
                                                </View>
                                                <View
                                                    className="at-col  at-col--wrap"
                                                    style="color: grey;"
                                                >
                                                    {item.productName}
                                                </View>
                                            </View>

                                            <View className="at-row">
                                                <View className="at-col at-col-1 at-col--auto">
                                                    发证日期：
                                                </View>
                                                <View
                                                    className="at-col "
                                                    style="color: grey;"
                                                >
                                                    {item.startDate}
                                                </View>
                                            </View>

                                            <View className="at-row">
                                                <View className="at-col at-col-1 at-col--auto">
                                                    截止日期：
                                                </View>
                                                <View
                                                    className="at-col "
                                                    style="color: grey;"
                                                >
                                                    {item.endDate}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
        )

        // 行政许可 点击进入详情页面
        const adminList = this.state.adminList.map((item, index) => {
            return (
                <View
                    key={item.id}
                    className="listItem"
                    hoverClass="hoverList"
                    onClick={this.navigateToAdminLicencePage.bind(this, item)}
                >
                    <View className="at-row at-row__align--center">
                        <View className="at-col at-col-11">
                            <View className="at-row at-row__align--center">
                                <View className="index at-col at-col-1 ">
                                    {index + 1}
                                </View>
                                <View style="margin-left:10px"></View>
                                <View className="position at-col at-col--wrap">
                                    {item.fileNumber}
                                </View>
                            </View>
                            <View className="at-row at-row__align--center">
                                <View className="at-col at-col__offset-1">
                                    <View className="note">
                                        <View className="at-row">
                                            <View className="at-col at-col-1 at-col--auto">
                                                决定/许可机关：
                                            </View>
                                            <View
                                                className="at-col at-col--wrap"
                                                style="color: grey;"
                                            >
                                                {item.department}
                                            </View>
                                        </View>

                                        <View className="at-row">
                                            <View className="at-col at-col-1 at-col--auto">
                                                许可日期：
                                            </View>
                                            <View
                                                className="at-col  at-col--wrap"
                                                style="color: grey;"
                                            >
                                                {item.startDate}
                                            </View>
                                        </View>

                                        <View className="at-row">
                                            <View className="at-col at-col-1 at-col--auto">
                                                截止日期：
                                            </View>
                                            <View
                                                className="at-col "
                                                style="color: grey;"
                                            >
                                                {item.endDate}
                                            </View>
                                        </View>
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
                <AtAccordion className="Accordion"
                    open={this.state.open1}
                    title="公司财务"
                    arrow="right"
                    hasBorder={false}
                    onClick={value => {
                        this.setState({ open1: value })
                    }}
                >
                    {this.state.financeList.length ? (
                        <View style="margin-left:30px;margin-top:5px;font-weight:normal">
                            <AtTimeline items={financeList}></AtTimeline>
                        </View>
                    ) : (
                        <View style="margin:20px;font-weight:normal;font-size:medium">暂无相关信息</View>
                    )}
                </AtAccordion>
                <View className="border"></View>
                <AtAccordion className="Accordion"
                    open={this.state.open2}
                    title="招聘信息"
                    arrow="right"
                    hasBorder={false}
                    onClick={value => {
                        this.setState({ open2: value })
                    }}
                >
                    {this.state.employList.length ? (
                        <View style="font-weight:normal">
                            <View className="employList">{employList}</View>
                        </View>
                    ) : (
                        <View style="margin:20px;font-weight:normal;font-size:medium">暂无相关信息</View>
                    )}
                </AtAccordion>
                <View className="border"></View>
                <AtAccordion className="Accordion"
                    open={this.state.open3}
                    title="资质证书"
                    arrow="right"
                    hasBorder={false}
                    onClick={value => {
                        this.setState({ open3: value })
                    }}
                >
                    {this.state.qualificationList.length ? (
                        <View style="font-weight:normal">
                            <View className="employList">
                                {qualificationList}
                            </View>
                        </View>
                    ) : (
                        <View style="margin:20px;font-weight:normal;font-size:medium">暂无相关信息</View>
                    )}
                </AtAccordion>
                <View className="border"></View>
                <AtAccordion className="Accordion"
                    open={this.state.open4}
                    title="行政许可"
                    arrow="right"
                    hasBorder={false}
                    onClick={value => {
                        this.setState({ open4: value })
                    }}
                >
                    {this.state.adminList.length ? (
                        <View style="font-weight:normal">
                            <View className="employList">{adminList}</View>
                        </View>
                    ) : (
                        <View style="margin:20px;font-weight:normal;font-size:medium">暂无相关信息</View>
                    )}
                </AtAccordion>
                <View>
                    {!this.state.open4 &&<View className="border"></View>}    
                </View>
                
            </View>
        )
    }
}
