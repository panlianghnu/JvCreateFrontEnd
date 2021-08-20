/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-quotes */
import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtIcon, AtAvatar, AtActivityIndicator } from 'taro-ui'
import axios from 'taro-axios'


import './collect.css'

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
                    companyPic: '',
                },
            ],
        }
    }

    componentWillMount() {}

    componentDidMount() {
        axios
            .get('/getCollectById')
            .then(({ data }) => {
                this.setState({
                    companies: data,
                })
            })
            .catch(err => {
                console.log('Axios err:', err)
            })
    }

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    onPullDownRefresh() {}

    onClickCompany(id, index) {
        // 跳转到公司详情页面，需要路由
        Taro.navigateTo({
            url: '/pages/companyDetail/companyDetail?id=' + JSON.stringify(id),
        }).then(() => {
            let tempList = this.state.companies
            tempList[index].searchCount += 1
            this.setState({ companies: tempList })
        })
    }

    render() {
        let resultList = <View style="text-align:center">您还没有收藏公司</View>
        if (this.state.companies.length) {
            resultList = this.state.companies.map((item, index) => {
                return (
                    <View className="companyList" key={item.id}>
                        <View
                            className="listItem"
                            onClick={this.onClickCompany.bind(
                                this,
                                item.id,
                                index
                            )}
                            hoverClass="hoverList"
                        >
                            <View className="at-row at-row__align--center">
                                <View className="at-col at-col__offset-1 at-col-1 at-col--auto">
                                    {!item.companyPic && (
                                        <AtAvatar
                                            text={item.companyName}
                                            size="normal"
                                        ></AtAvatar>
                                    )}
                                    {item.companyPic && (
                                        <AtAvatar
                                            image={item.companyPic}
                                            size="normal"
                                        ></AtAvatar>
                                    )}
                                    <View className="searchCount">
                                        {item.searchCount}
                                    </View>
                                </View>
                                <View className="at-col at-col__offset-1 at-col-7 at-col--wrap">
                                    <View className="companyName">
                                        {item.companyName}
                                    </View>
                                    <View className="note">
                                        <View className="at-row">
                                            <View className="at-col at-col-1 at-col--auto">
                                                细分行业：
                                            </View>
                                            <View className="at-col at-col--wrap">
                                                {item.secondTag}、
                                                {item.thirdTag}
                                            </View>
                                        </View>
                                    </View>
                                    <View className="note">
                                        发明总数：{item.inventionCount}
                                    </View>
                                    <View className="note">
                                        发明评级：{item.inventionRating}
                                    </View>
                                    <View
                                        className="note"
                                        style="margin-bottom:5px"
                                    >
                                        融资情况：{item.financing}
                                    </View>
                                </View>
                                <AtIcon value="chevron-right" size="20" />
                            </View>
                        </View>
                    </View>
                )
            })
        }

        return (
            <View>
                <View>{resultList}</View>
            </View>
        )
    }
}
