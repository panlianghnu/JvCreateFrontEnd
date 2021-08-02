/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-indent-props */
import { View, Text } from '@tarojs/components'
import Taro, { Current } from '@tarojs/taro'
import axios from 'taro-axios'
import { Component } from 'react'
import { AtAvatar, AtModal, AtModalHeader, AtModalContent } from 'taro-ui'
import './customer.css'

export default class Customer extends Component {
    constructor(props) {
        super(props)
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.state = {
            customers: [
                {
                    id: 0,
                    name: '',
                    picture: '',
                    introduction: '',
                },
            ],
            flag: false,
            index: 0,
        }
    }
    componentWillMount() {}

    componentDidMount() {
        const companyId = Current.router.params.companyId
        axios
            .get(`/customer?id=${companyId}`)
            .then(({ data }) => {
                this.setState({ customers: data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    onPullDownRefresh() {
        // console.log('触发下拉')
        // 重新载入页面
        this.componentDidMount()
        Taro.stopPullDownRefresh()
    }

    handleClick1(e) {
        this.setState({
            flag: true,
            index: e,
        })
    }

    handleClose() {
        this.setState({ flag: false })
    }

    render() {
        // let flag = this.state.flag
        //let index = this.state.index
        const customers = this.state.customers.map((item, index) => {
            return (
                <View
                    className="teamList"
                    key={item.id}
                    onClick={() => this.handleClick1(index)}
                >
                    <View className="at-row at-row__align--center">
                        <View className="at-col at-col__offset-1 at-col-1 at-col--auto">
                            <AtAvatar
                                text={item.name}
                                size="large"
                                image={item.picture}
                            />
                        </View>

                        <View className="at-col at-col__offset-1">
                            <View className="name">
                                <Text decode="true">{item.name}</Text>
                            </View>
                            <View className="intro">
                                <View className="at-col--wrap">
                                    {item.introduction}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
        let modal = (
            <AtModal
                isOpened={this.state.flag}
                closeOnClickOverlay="true"
                onClose={this.handleClose}
            >
                <AtModalHeader>
                    {this.state.customers[this.state.index].name}
                </AtModalHeader>
                <AtModalContent>
                    <View style="text-align: justify;">
                        {this.state.customers[this.state.index].introduction}
                    </View>
                </AtModalContent>
            </AtModal>
        )
        return (
            <View>
                <View>{customers}</View>
                {modal}
            </View>
        )
    }
}
