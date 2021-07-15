/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-quotes */
import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtIcon, AtAvatar } from 'taro-ui'
import axios from 'taro-axios'
import { SearchComponent } from '../../components/searchComponent'
import { Divider } from '../../components/Divider'
import logo from '../../static/logo/logo.png'
// import logo1 from '../../static/logo/logo1.png'

import './index.css'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companies: [
                {
                    id: 0,
                    companyName: ' ',
                    legalPerson: ' ',
                    registeredCapital: 0,
                    field: ' ',
                    inventionCount: 0,
                    inventionRating: ' ',
                    financing: ' ',
                    searchCount: 0,
                },
            ],
            loadingHotSearch: true,
            searchValue: '',
            fengeString: '',
        }
    }

    componentWillMount() {}

    componentDidMount() {
        console.log('Axios')
        // 请求一波数据
        axios
            .get('/home')
            .then(response => {
                console.log('response:')
                console.log(response.data)
                this.setState({
                    companies: response.data,
                    loadingHotSearch: false, // 加载时显示圈圈(或不显示)
                    fengeString: '热门搜索',
                    searchValue: '',
                })
            })
            .catch(err => {
                console.log('Axios err:', err)
            })
    }

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    onPullDownRefresh() {
        console.log('触发下拉')
        // 重新载入页面
        this.componentDidMount()
        Taro.stopPullDownRefresh()
    }

    onClickSearch() {
        console.log('搜索：', this.state.searchValue)
        axios
            .get('/home') // change later
            .then(response => {
                this.setState({
                    companies: response.data,
                    fengeString: '搜索结果',
                })
            })
            .catch(err => {
                console.log('Axios err:', err)
            })
    }

    onChangeSearch(value) {
        this.setState({ searchValue: value })
    }

    onClickCompany(id) {
        // 跳转到公司详情页面，需要路由
        Taro.navigateTo({
            url: '/pages/companyDetail/companyDetail?id=' + JSON.stringify(id),
        })
    }

    logoSize() {
        var logo_width_height = parseInt(621 / 248)
        const maxWidth = Taro.getSystemInfoSync().windowWidth
        var logoWidth = parseInt((50 / 100) * maxWidth)
        var logoHeight = parseInt(logoWidth / logo_width_height)
        console.log('屏幕最大 width 为：', maxWidth)
        console.log('logo width 为：', logoWidth)
        console.log('logo height 为：', logoHeight)
        return 'width:' + logoWidth + 'px;height:' + logoHeight + 'px;'
    }

    render() {
        this.logoSize()
        const resultList = this.state.companies.map(item => {
            return (
                <View className="companyList" key={item.id}>
                    <View
                        className="listItem"
                        onClick={this.onClickCompany.bind(this, item.id)}
                    >
                        <View className="at-row at-row__align--center">
                            <View className="at-col at-col__offset-1 at-col-1 at-col--auto">
                                <AtAvatar
                                    text={item.companyName}
                                    size="large"
                                ></AtAvatar>
                                <View className="searchCount">66666666</View>
                            </View>
                            <View className="at-col at-col__offset-1 at-col-7">
                                <View className="companyName">
                                    {item.companyName}
                                </View>
                                <View className="note">
                                    细分领域：区块链、联盟链
                                </View>
                                <View className="note">发明总数：26</View>
                                <View className="note">发明评级：B+</View>
                                <View
                                    className="note"
                                    style="margin-bottom:5px"
                                >
                                    融资情况：A轮
                                </View>
                            </View>
                            <AtIcon value="chevron-right" size="20" />
                        </View>
                    </View>
                </View>
            )
        })

        return (
            <View>
                <View className="at-row">
                    <View
                        className="at-col at-col-12"
                        style="text-align:center"
                    >
                        <Image src={logo} style={this.logoSize()}></Image>
                    </View>
                </View>
                <SearchComponent
                    searchValue={this.state.searchValue}
                    onClick={this.onClickSearch.bind(this)}
                    onChange={this.onChangeSearch.bind(this)}
                />
                <Divider content={this.state.fengeString}></Divider>
                {!this.state.loadingHotSearch && <View>{resultList}</View>}
            </View>
        )
    }
}
