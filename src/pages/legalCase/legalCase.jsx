/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import axios from 'taro-axios'
import { AtIcon } from 'taro-ui'
import './legalCase.css'

// 这是专利页面
export default class LegalCase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyId: getCurrentInstance().router.params.id,
            legalCases: [
                {
                    id: '',
                    judgeDate: '', //裁判日期
                    caseName: '', //案件名称
                    caseNumber: '', //案号
                    publishDate: '', //发布日期
                    reason: '', //案由
                    role: '', //案件身份
                    result: '', //裁判结果
                    money: '', //案件金额
                    court: '', //审理法院
                },
            ],
        }
    }

    componentDidMount() {
        // console.log('legalCase Axios')
        axios.get('/legalCase?id=' + this.state.companyId).then(
            ({ data }) => {
                this.setState({ legalCases: data })
            },
            err => {
                console.log('axios err:', err)
            }
        )
    }

    onClickCard(item) {
        // console.log('跳转到专利详情，item:', item)
        Taro.navigateTo({
            url: '/pages/legalCaseDetail/legalCaseDetail?id=' + item.id,
        })
    }

    render() {
        const renderList = this.state.legalCases.map((item, index) => {
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
                                <View className="legalCaseName at-col at-col--wrap">
                                    {item.caseName}
                                </View>
                            </View>
                            <View className="at-row at-row__align--center">
                                <View className="at-col">
                                    <View className="note">
                                        <Text>
                                            {`发布日期：${item.publishDate}
                                              案由：${item.reason}
                                              案号：${item.caseNumber}
                                              案件金额：${item.money}`}
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
                <View className="legalCaseList">{renderList}</View>
                <View style="margin-top:10px">{'\0'}</View>
            </View>
        )
    }
}
