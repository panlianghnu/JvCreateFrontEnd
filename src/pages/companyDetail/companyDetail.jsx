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
        }
    }

    componentWillMount() {}

    componentDidMount() {
        axios.get('/companyDetail?id=' + this.state.companyId).then(
            response => {
                let data = response.data
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
        console.log('item: ', item)
        switch (index) {
            case 0: {
                Taro.navigateTo({
                    url:
                        '/pages/invention/invention?id=' +
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
                                <Text>
                                    法定代表人
                                    {'\n' + this.state.legalPerson}
                                </Text>
                            </View>
                            <View className="at-col at-col-4">
                                <Text>
                                    注册资本
                                    {'\n' + this.state.companyRegisterMoney}
                                    万元
                                </Text>
                            </View>
                            <View className="at-col at-col-4">
                                <Text>
                                    成立日期
                                    {'\n' + this.state.companyRegisterDate}
                                </Text>
                            </View>
                        </View>
                        <View style="margin-top:20px"></View>
                        <View className="at-row" style="text-align:center">
                            <View className="at-col-4">
                                <Text>细分领域</Text>
                                <Text style="color:orange">
                                    {'\n' + this.state.major}
                                </Text>
                            </View>
                            <View className="at-col-4">
                                <Text>
                                    发明总数{'\n' + this.state.inventionNum}
                                </Text>
                            </View>
                            <View className="at-col-4">
                                <Text>发明评级</Text>
                                <Text style="color:orange">
                                    {'\n' + this.state.level}
                                </Text>
                            </View>
                        </View>
                        <View style="margin-top:20px"></View>
                        <View className="at-row" style="text-align:center">
                            <View className="at-col-6">
                                <Text className="content">
                                    官网{'\n' + this.state.website}
                                </Text>
                            </View>
                            <View className="at-col-6">
                                <Text>电话{'\n' + this.state.phone}</Text>
                            </View>
                        </View>
                        {/* 文章内容 */}
                        <View style="margin-top:20px"></View>
                        <View className="at-article__p">
                            公司简介：{this.state.introduction}
                        </View>
                        <View style="margin-top:20px"></View>
                        {/* 由于本地图片资源引用有问题，暂时使用微博作为图床 */}
                        <AtGrid
                            onClick={this.handleClickGrid.bind(this)}
                            data={[
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/mw2000/006pJOFhgy1gs65nfdr5vj305k05kdfv.jpg',
                                    value: '发明专利',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/mw2000/006pJOFhgy1gs65nf3p4yj305k05kt8r.jpg',
                                    value: '团队信息',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gs65neoo6gj305k05k0so.jpg',
                                    value: '股权&融资',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/mw2000/006pJOFhgy1gs65nedjgqj305k05kmx4.jpg',
                                    value: '产品&服务',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gs65nez51hj305k05kweh.jpg',
                                    value: '主要客户',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gs65netb5aj305k05kwea.jpg',
                                    value: '经营状况',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gs65neiym7j305k05kmx5.jpg',
                                    value: '法律事务',
                                },
                                {
                                    image:
                                        'https://wx1.sinaimg.cn/orj360/006pJOFhgy1gs65nf8zpij305k05kq2u.jpg',
                                    value: '细分市场',
                                },
                            ]}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
