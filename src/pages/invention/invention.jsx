/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import axios from 'taro-axios'
import { AtCard } from 'taro-ui'

// 这是专利页面
export default class Ivention extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyId: getCurrentInstance().router.params.id,
            iventions: [
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
        console.log('Invention Axios')
        axios.get('/invention?id=' + this.state.companyId).then(
            response => {
                this.setState({ iventions: response.data })
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
        if (status == '公开') return 'color:orange'
        return 'color:red'
    }

    onClickCard(item) {
        console.log('跳转到专利详情，item:', item)
        Taro.navigateTo({
            url: '/pages/inventionDetail/inventionDetail?id=' + item.id,
        })
    }

    render() {
        const renderList = this.state.iventions.map((item, index) => {
            return (
                <View key={item.name}>
                    <AtCard
                        title={item.name}
                        onClick={this.onClickCard.bind(this, item)}
                    >
                        <View className="at-article__p">
                            <Text>
                                序号：{index + '\n'}
                                申请日：{item.filingDate + '\n'}
                                发明人：{item.inventionPerson + '\n'}
                                法律状态：
                            </Text>
                            <Text style={this.getStatusColor(item)}>
                                {item.status + '\n'}
                            </Text>
                        </View>
                    </AtCard>
                    <View style="margin-bottom:20px"></View>
                </View>
            )
        })
        return (
            <View>
                <View style="margin-bottom:10px"></View>
                <View>{renderList}</View>
                <View style="margin-top:10px">{'\0'}</View>
            </View>
        )
    }
}
