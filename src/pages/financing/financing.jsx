/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View ,Text} from '@tarojs/components'
import axios from 'taro-axios'
import { getCurrentInstance } from '@tarojs/taro'
import { AtAccordion, AtTimeline } from 'taro-ui'

// 融资情况页面，具体描述融资情况， ?(news)
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyId: JSON.parse(getCurrentInstance().router.params.id),
            invest:JSON.parse(getCurrentInstance().router.params.invest),
            open1: false,
            open2: true,
            financings: [
                {
                    title: '',
                    content: [],
                },
            ],
        }
    }

    componentDidMount() {
        axios
            .get('/financing?id=' + this.state.companyId)
            .then(({ data }) => {
                // console.log(data)
                this.setState({ financings: data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let items = [] // map写在 <AtTimeline>里面有问题
        this.state.financings.map(item => {
            let result = {
                title: '',
                content: [],
                icon: 'clock',
            }
            result.title = item.title
            result.content = item.content
            items.push(result)
        })

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
                        <View style="margin-left:20px;margin-top:10px">
                            <View className="invest">
                                <Text>{this.state.invest == null?"暂无相关信息":this.state.invest}</Text>
                            </View>
                            <AtTimeline items={items} />
                        </View>
                        {/* {!this.state.financings.length && (
                            <View style="margin:20px">暂无相关信息</View>
                        )} */}
                    </AtAccordion>
                    <AtAccordion
                        open={this.state.open2}
                        title="新闻报道"
                        arrow="right"
                        onClick={value => {
                            this.setState({ open2: value })
                        }}
                    >
                        <View style="margin-left:20px">暂无相关信息</View>
                    </AtAccordion>
                </View>
            </View>
        )
    }
}
