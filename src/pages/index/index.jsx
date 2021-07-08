/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-quotes */
import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtDivider } from 'taro-ui'
import axios from 'taro-axios'
import { SearchComponent } from '../../components/searchComponent'

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
        console.log('即将跳转到公司详情页。公司id为：', id)
        Taro.navigateTo({
            url: '/pages/companyDetail/companyDetail?id=' + JSON.stringify(id),
        })
    }
    render() {
        const resultList = this.state.companies.map(item => {
            return (
                <AtListItem
                    key={item.id}
                    title={item.companyName}
                    note={
                        '法人：' +
                        item.legalPerson +
                        '    注册资本：' +
                        (item.registeredCapital % 10000) +
                        '万元'
                    }
                    extraText="详细信息"
                    arrow="right"
                    onClick={this.onClickCompany.bind(this, item.id)}
                />
            )
        })

        return (
            <View>
                <SearchComponent
                    searchValue={this.state.searchValue}
                    onClick={this.onClickSearch.bind(this)}
                    onChange={this.onChangeSearch.bind(this)}
                />
                <AtDivider content={this.state.fengeString} fontSize="32" />
                {!this.state.loadingHotSearch && <AtList>{resultList}</AtList>}
            </View>
        )
    }
}
