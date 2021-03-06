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
        /* ???????????? */
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
                                                ???????????????
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
                                                ?????????
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
                                                ?????????
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
                                                ???????????????
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
                                                ???????????????
                                            </View>
                                            <View
                                                className="at-col "
                                                style="color: grey;"
                                            >
                                                {item.region}
                                            </View>
                                        </View>
                                        {/* <Text>
                                            ???????????????{item.date + '\n'}
                                            ?????????
                                            {item.salary + '\n'}
                                            ?????????{item.education + '\n'}
                                            ???????????????{item.workExperience + '\n'}
                                            ???????????????{item.region}
                                        </Text> */}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })

        /*????????????*/
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
                            ???????????????
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
                            ????????????
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

        /* ????????????*/
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
                                                    ???????????????
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
                                                    ???????????????
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
                                                    ???????????????
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
                                                    ???????????????
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

        // ???????????? ????????????????????????
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
                                                ??????/???????????????
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
                                                ???????????????
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
                                                ???????????????
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
                    title="????????????"
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
                        <View style="margin:20px;font-weight:normal;font-size:medium">??????????????????</View>
                    )}
                </AtAccordion>
                <View className="border"></View>
                <AtAccordion className="Accordion"
                    open={this.state.open2}
                    title="????????????"
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
                        <View style="margin:20px;font-weight:normal;font-size:medium">??????????????????</View>
                    )}
                </AtAccordion>
                <View className="border"></View>
                <AtAccordion className="Accordion"
                    open={this.state.open3}
                    title="????????????"
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
                        <View style="margin:20px;font-weight:normal;font-size:medium">??????????????????</View>
                    )}
                </AtAccordion>
                <View className="border"></View>
                <AtAccordion className="Accordion"
                    open={this.state.open4}
                    title="????????????"
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
                        <View style="margin:20px;font-weight:normal;font-size:medium">??????????????????</View>
                    )}
                </AtAccordion>
                <View>
                    {!this.state.open4 &&<View className="border"></View>}    
                </View>
                
            </View>
        )
    }
}
