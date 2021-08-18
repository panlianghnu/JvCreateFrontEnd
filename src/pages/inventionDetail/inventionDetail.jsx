/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { AtDivider, AtLoadMore } from 'taro-ui'
import axios from 'taro-axios'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inventionId: JSON.parse(getCurrentInstance().router.params.id),
            name: '',
            filingDate: '',
            inventionPerson: '',
            status: '',
            abstract: '',
            fullText: '',
            loadingPDF: 'more',
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

    handleClickGetPDF() {
        this.setState({ loadingPDF: 'loading' })
        let that = this
        Taro.downloadFile({
            url: `https://www.jucreate.com:8888/invention_pdf?id=${this.state.inventionId}`,
            success: function(res) {
                var filePath = res.tempFilePath
                // Taro.openDocument 新开页面打开文档，支持格式"doc" | "docx" | "xls" | "xlsx" | "ppt" | "pptx" | "pdf" ,支持端weapp
                Taro.openDocument({
                    filePath: filePath,
                    success: function() {
                        console.log('打开文档成功')
                        that.setState({ loadingPDF: 'more' })
                    },
                    fail: function(err) {
                        that.setState({ loadingPDF: 'noMore' })
                        console.log('err1:', err)
                    },
                }).catch(err => {
                    console.log('err2：进入了这里\n', err)
                })
            },
        })
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
                <AtLoadMore
                    status={this.state.loadingPDF}
                    onClick={this.handleClickGetPDF.bind(this)}
                    moreText="点击查看专利全文"
                    loadingText="正在加载专利全文"
                    noMoreText="暂无该专利全文的相关信息"
                />
            </View>
        )
    }
}
