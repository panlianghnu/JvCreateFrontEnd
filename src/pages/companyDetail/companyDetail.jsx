/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import {
    AtGrid,
    AtModal,
    AtModalHeader,
    AtModalContent,
    AtAvatar,
    AtButton,
    AtMessage,
    AtActivityIndicator,
} from 'taro-ui'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import axios from 'taro-axios'
import './companyDetail.css'
import { getGlobalData } from '../../global'

export default class CompanyDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 获取路由过来的参数 公司ID
            companyId: JSON.parse(getCurrentInstance().router.params.id),
            isLogin: getGlobalData('isLogin'),
            companyName: '',
            major: '',
            companyRegisterDate: '',
            companyRegisterMoney: '',
            legalPerson: '',
            phone: '',
            level: '',
            website: '',
            introduction: '',
            inventionNum: '',
            invest: '',
            flag: false,
            isFollow: false,
            logo: '',
            showUnFollow: false,
            loading: true,
        }
        this.handleClickGrid = this.handleClickGrid.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    componentWillMount() {}

    componentDidMount() {
        axios.get('/companyDetail?id=' + this.state.companyId).then(
            ({ data }) => {
                this.setState({
                    logo: data.logo,
                    companyName: data.companyName,
                    major: data.major,
                    companyRegisterDate: data.companyRegisterDate,
                    companyRegisterMoney: data.companyRegisterMoney,
                    legalPerson: data.legalPerson,
                    phone: data.phone,
                    level: data.level,
                    website: data.website,
                    introduction: data.introduction,
                    inventionNum: data.inventionNum,
                    invest: data.invest,
                    isFollow: data.isFollow,
                    loading: false,
                })
            },
            err => {
                this.setState({ loading: false })
                console.log('axios err:', err)
            }
        )
    }

    handleFollow() {
        if (!this.state.isLogin) {
            // 未登陆则提示登陆
            Taro.atMessage({
                message: '请先登陆',
                type: 'error',
            })
            return
        }
        // 关注按钮触发事件
        if (this.state.isFollow) return
        axios
            .get(`/collect?id=${this.state.companyId}`)
            .then(res => {
                if (res.status == 200) {
                    // console.log('收藏成功')
                    this.setState({ isFollow: true })
                    Taro.atMessage({
                        message: '收藏成功',
                        type: 'success',
                    })
                }
            })
            .catch(() => {
                console.log('收藏失败，请查看是否已经收藏过了')
                this.setState({ isFollow: true })
            })
    }
    handleUnFollow() {
        if (!this.state.isLogin) {
            // 未登陆则提示登陆
            Taro.atMessage({
                message: '请先登陆',
                type: 'error',
            })
            return
        }
        // 取关按钮触发事件
        if (!this.state.isFollow) return
        axios
            .get(`/cancelCollect?id=${this.state.companyId}`)
            .then(res => {
                if (res.status == 200) {
                    // console.log('取消收藏成功')
                    this.setState({ isFollow: false })
                    Taro.atMessage({
                        message: '取消收藏成功',
                        type: 'success',
                    })
                }
            })
            .catch(() => {
                console.log('取消收藏失败，请查看还未关注')
                this.setState({ isFollow: false })
            })
    }

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
            case 4: {
                Taro.navigateTo({
                    url:
                        '/pages/product/product?id=' +
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
            case 6: {
                Taro.navigateTo({
                    url:
                        '/pages/operation/operation?id=' +
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
            case 8: {
                Taro.navigateTo({
                    url: '/pages/fieldBackground/fieldBackground',
                })
                break
            }
        }
    }

    handleClose() {
        this.setState({ flag: false })
    }
    handleOpen() {
        this.setState({ flag: true })
    }

    render() {
        if (this.state.loading) {
            return (
                <AtActivityIndicator
                    mode="center"
                    isOpened={this.state.loading}
                    content="正在加载..."
                />
            )
        }
        const modal = (
            <View onClick={this.handleClose}>
                <AtModal
                    isOpened={this.state.flag}
                    closeOnClickOverlay="true"
                    onClick={this.handleClose}
                >
                    <AtModalHeader>简介</AtModalHeader>
                    <AtModalContent>
                        <View style="text-align: justify;">
                            {this.state.introduction}
                        </View>
                    </AtModalContent>
                </AtModal>
            </View>
        )

        let website = this.state.website
        if (website) {
            website = website.replace('https://', '')
            website = website.replace('http://', '')
        }

        let button = null
        if (this.state.isFollow) {
            button = (
                <AtButton
                    className="unfollow"
                    type="primary"
                    onClick={() => this.setState({ showUnFollow: true })}
                >
                    已收藏
                </AtButton>
            )
        } else {
            button = (
                <AtButton
                    className="follow"
                    type="primary"
                    onClick={this.handleFollow.bind(this)}
                >
                    收藏
                </AtButton>
            )
        }
        let modal_unfollow = (
            <AtModal
                isOpened={this.state.showUnFollow}
                title="提示"
                cancelText="取消"
                confirmText="确认"
                onClose={() => {
                    this.setState({ showUnFollow: false })
                }}
                onCancel={() => {
                    this.setState({ showUnFollow: false })
                }}
                onConfirm={() => {
                    this.handleUnFollow()
                    this.setState({ showUnFollow: false })
                }}
                content="是否取消收藏？"
            />
        )

        return (
            // 显示取关
            <View className="at-article">
                <AtMessage />
                <View className="top-bar">
                    <View className="logo">
                        <AtAvatar
                            text={this.state.companyName}
                            size="normal"
                            image={this.state.logo}
                        />
                    </View>
                    <View style="margin-left:auto;margin-right:auto">
                        <Text className="title">{this.state.companyName}</Text>
                    </View>
                    {button}
                </View>
                <View className="at-article__content">
                    <View className="at-article__section">
                        <View style="margin-top:15px"></View>
                        <View
                            className="pl-row"
                            //onClick={this.handleClickGrid.bind(this, '', 2)}
                        >
                            <View
                                className="pl-col"
                                hoverClass="hover-col"
                                onClick={this.handleClickGrid.bind(this, '', 1)}
                            >
                                <View>
                                    <Text>法定代表人{'\n'}</Text>
                                    <Text className="content">
                                        {this.state.legalPerson}
                                    </Text>
                                </View>
                            </View>
                            <View
                                className="pl-col top"
                                hoverClass="hover-col"
                                onClick={this.handleClickGrid.bind(this, '', 2)}
                            >
                                <View>
                                    <Text>注册资本{'\n'}</Text>
                                    <Text className="content">
                                        {this.state.companyRegisterMoney}
                                    </Text>
                                </View>
                            </View>
                            <View
                                className="pl-col"
                                hoverClass="hover-col"
                                onClick={this.handleClickGrid.bind(this, '', 2)}
                            >
                                <View>
                                    <Text>成立日期{'\n'}</Text>
                                    <Text className="content">
                                        {this.state.companyRegisterDate}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className="pl-row">
                            <View
                                className="pl-col-center left"
                                hoverClass="hover-col"
                            >
                                <View>
                                    <Text>细分行业{'\n'}</Text>
                                    <View style="line-height:15px;">
                                        <Text style="color:#fe5d25;font-size:13px">
                                            {this.state.major}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                className="pl-col-center center"
                                hoverClass="hover-col"
                                onClick={this.handleClickGrid.bind(this, '', 0)}
                            >
                                <View>
                                    <Text>发明总数{'\n'}</Text>
                                    <Text
                                        className="content"
                                        style="color:#fe5d25"
                                    >
                                        {this.state.inventionNum}
                                    </Text>
                                </View>
                            </View>
                            <View
                                className="pl-col-center right"
                                hoverClass="hover-col"
                                onClick={this.handleClickGrid.bind(this, '', 0)}
                            >
                                <View>
                                    <Text>发明评级{'\n'}</Text>
                                    <Text
                                        className="content"
                                        style="color:#fe5d25"
                                    >
                                        {this.state.level}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className="pl-row">
                            <View
                                className="pl-col"
                                hoverClass="hover-col"
                                onClick={this.handleClickGrid.bind(this, '', 3)}
                            >
                                <View>
                                    <Text>融资情况{'\n'}</Text>
                                    <Text className="content">
                                        {this.state.invest}
                                    </Text>
                                </View>
                            </View>
                            <View
                                className="pl-col bottom"
                                hoverClass="hover-col"
                                style="text-align:center"
                            >
                                <View
                                    onClick={() =>
                                        Taro.setClipboardData({
                                            data: this.state.website,
                                        }).then(() => {
                                            Taro.getClipboardData().then(
                                                res => {
                                                    console.log(
                                                        '剪切板内容为:',
                                                        res.data
                                                    )
                                                }
                                            )
                                        })
                                    }
                                >
                                    <Text>官网{'\n'}</Text>
                                    <Text className="content">{website}</Text>
                                </View>
                            </View>
                            <View
                                className="pl-col"
                                hoverClass="hover-col"
                                onClick={() =>
                                    Taro.makePhoneCall({
                                        phoneNumber: this.state.phone.toString(),
                                    }).catch(() => {
                                        console.log('取消拨打')
                                    })
                                }
                            >
                                <View>
                                    <Text>电话{'\n'}</Text>
                                    <Text className="content">
                                        {this.state.phone}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* 文章内容 */}
                        <View style="margin-top:20px"></View>
                        <View
                            className="at-article__p"
                            onClick={this.handleOpen}
                        >
                            公司简介：{this.state.introduction}
                        </View>
                        <View style="margin-top:10px"></View>
                        {/* 由于本地图片资源引用有问题，暂时使用微博作为图床 */}
                        <AtGrid
                            onClick={this.handleClickGrid}
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
                {modal}
                {modal_unfollow}
            </View>
        )
    }
}
