/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import './legalCaseDetail.css'

export default class LegalCaseDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 获取路由过来的参数 公司ID
            legalCase: {
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
        }
    }
    componentDidMount() {
        let json_obj = getCurrentInstance().router.params.legalCase
        this.setState({
            legalCase: JSON.parse(json_obj),
        })
    }

    render() {
        let legalCase = this.state.legalCase
        return (
            <View className="at-article">
                <View className="at-article-content">
                    <View className="at-article-section">
                        <View className="at-row">
                            <View className="at-article__h2">
                                {legalCase.caseName}
                            </View>
                        </View>

                        <View className="at-row">
                            <View className="case-number">
                                {legalCase.caseNumber}
                            </View>
                        </View>

                        <View className="at-article__p">
                            <View className="at-row">
                                <Text>
                                    裁判日期：{legalCase.judgeDate + '\n'}
                                </Text>
                            </View>
                            <View className="at-row">
                                <Text>案由：{legalCase.reason + '\n'}</Text>
                            </View>
                            <View className="at-row">
                                <Text>案件身份：</Text>
                            </View>
                            <View className="at-row">
                                <View className="at-col at-col__offset-1">
                                    <Text>{legalCase.role}</Text>
                                </View>
                            </View>
                            <View className="at-row">
                                裁判结果：{legalCase.result}
                            </View>
                            <View className="at-row">
                                审理法院：{legalCase.court}
                            </View>
                        </View>
                        <View style="margin-top:20px"></View>
                    </View>
                </View>
            </View>
        )
    }
}
