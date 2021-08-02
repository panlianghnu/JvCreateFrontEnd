/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import axios from 'taro-axios'
import './companyDetail.css'

export default class CompanyDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 获取路由过来的参数 公司ID
            companyId: getCurrentInstance().router.params.id,
            companyName: '',
            major: '',
            companyRegisterDate: '',
            companyRegisterMoney: 0,
            legalPerson: '',
            phone: '',
            level: '',
            website: '',
            introduction: '',
            inventionNum: 0,
            invest: '',
        }
    }

    componentWillMount() {}

    componentDidMount() {
        axios.get('/companyDetail?id=' + this.state.companyId).then(
            ({ data }) => {
                this.setState({
                    companyName: data.companyName,
                    major: data.major,
                    companyRegisterDate: data.companyRegisterDate,
                    companyRegisterMoney: data.companyRegisterMoney % 10000,
                    legalPerson: data.legalPerson,
                    phone: data.phone % 100000000000,
                    level: data.level,
                    website: data.website,
                    introduction: data.introduction,
                    inventionNum: data.inventionNum % 100,
                    invest: data.invest,
                })
            },
            err => {
                console.log('axios err:', err)
            }
        )
    }

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    handleClickGrid(item, index) {
        switch (index) {
            case 0: {
                Taro.navigateTo({
                    url:
                        '/pages/invention/invention?id=' +
                        JSON.stringify(this.state.companyId),
                })
                break
            }
            case 1: {
                Taro.navigateTo({
                    url:
                        '/pages/team/team?id=' +
                        JSON.stringify(this.state.companyId),
                })
                break
            }
            case 2: {
                Taro.navigateTo({
                    url:
                        '/pages/stock/stock?id=' +
                        JSON.stringify(this.state.companyId),
                })
                break
            }
            case 3: {
                Taro.navigateTo({
                    url:
                        '/pages/financing/financing?id=' +
                        JSON.stringify(this.state.companyId),
                })
                break
            }
            case 5: {
                Taro.navigateTo({
                    url:
                        '/pages/customer/customer?id=' +
                        JSON.stringify(this.state.companyId),
                })
                break
            }
            case 7: {
                Taro.navigateTo({
                    url:
                        '/pages/legalCase/legalCase?id=' +
                        JSON.stringify(this.state.companyId),
                })
                break
            }
        }
    }

    render() {
        return (
            <View className="at-article">
                <View className="at-row">
                    <View className="at-col" style="text-align:center">
                        <Text className="at-article__h1">
                            {this.state.companyName}
                        </Text>
                    </View>
                </View>
                <View className="at-article__content">
                    <View className="at-article__section">
                        <View style="margin-top:20px"></View>
                        <View className="at-row" style="text-align:center">
                            <View className="at-col at-col-4">
                                <Text>法定代表人{'\n'}</Text>
                                <View className="at-article__p">
                                    {this.state.legalPerson}
                                </View>
                            </View>
                            <View className="at-col at-col-4">
                                <Text>注册资本{'\n'}</Text>
                                <View className="at-article__p">
                                    {this.state.companyRegisterMoney}
                                    万元
                                </View>
                            </View>
                            <View className="at-col at-col-4">
                                <Text>成立日期{'\n'}</Text>
                                <View className="at-article__p">
                                    {this.state.companyRegisterDate}
                                </View>
                            </View>
                        </View>
                        <View style="margin-top:15px"></View>
                        <View className="at-row" style="text-align:center">
                            <View className="at-col-4">
                                <Text>细分行业{'\n'}</Text>
                                <View style="line-height:17px;">
                                    <Text style="color:#fe5d25;">
                                        {this.state.major}
                                    </Text>
                                </View>
                            </View>
                            <View className="at-col-4">
                                <Text>发明总数{'\n'}</Text>
                                <View className="at-article__p">
                                    {this.state.inventionNum}
                                </View>
                            </View>
                            <View className="at-col-4">
                                <Text>发明评级{'\n'}</Text>
                                <View
                                    className="at-article__p"
                                    style="color:#fe5d25"
                                >
                                    {this.state.level}
                                </View>
                            </View>
                        </View>
                        <View style="margin-top:10px"></View>
                        <View className="at-row" style="text-align:center">
                            <View className="at-col-4">
                                <Text>融资情况{'\n'}</Text>
                                <View className="at-article__p">
                                    {this.state.invest}
                                </View>
                            </View>
                            <View className="at-col-4">
                                <Text>官网{'\n'}</Text>
                                <View className="at-article__p">
                                    {this.state.website}
                                </View>
                            </View>
                            <View className="at-col-4">
                                <Text>电话{'\n'}</Text>
                                <View className="at-article__p">
                                    {this.state.phone}
                                </View>
                            </View>
                        </View>
                        {/* 文章内容 */}
                        <View style="margin-top:20px"></View>
                        <View className="at-article__p">
                            公司简介：{this.state.introduction}
                        </View>
                        <View style="margin-top:10px"></View>
                        {/* 由于本地图片资源引用有问题，暂时使用微博作为图床 */}
                        <AtGrid
                            onClick={this.handleClickGrid.bind(this)}
                            data={[
                                {
                                    image:
                                        'https://wx2.sinaimg.cn/orj360/006pJOFhgy1gse3ki2jrcj305k05kjrd.jpg',
                                    value: '发明专利',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gse3kjcf3kj305k05kmx5.jpg',
                                    value: '核心团队',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gsws2dvk1xj305k05k0t0.jpg',
                                    value: '工商信息',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gsws0cui51j305k05kmxl.jpg',
                                    value: '融资情况',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gse3kiw6e1j305k05kjrb.jpg',
                                    value: '产品&服务',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gse3khtlecj305k05k3yh.jpg',
                                    value: '主要客户',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gse3kiqwsoj305k05kwea.jpg',
                                    value: '经营状况',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gse3kibhklj305k05k0sq.jpg',
                                    value: '法律事务',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gse3kijbw3j305k05kmx3.jpg',
                                    value: '行业背景',
                                },
                            ]}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
