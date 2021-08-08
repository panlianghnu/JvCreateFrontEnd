/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import './adminLicence.css'

export default class AdminLicence extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 获取路由过来的参数 公司ID
            adminLicence: {
                id: '',
                fileNumber: '',
                department: '',
                startDate: '',
                endDate: '',
                content: '',
            },
        }
    }
    componentDidMount() {
        let json_obj = getCurrentInstance().router.params.item
        this.setState({
            adminLicence: JSON.parse(json_obj),
        })
    }

    render() {
        let adminLicence = this.state.adminLicence
        return (
            <View className="at-article">
                <View className="at-article-content">
                    <View className="at-article-section">
                        <View className="at-row">
                            <View className="at-article__h2">
                                {adminLicence.fileNumber}
                            </View>
                        </View>

                        <View className="at-row">
                            <View className="department">
                                {adminLicence.department}
                            </View>
                        </View>

                        <View className="at-article__p">
                            <View className="at-row">
                                <Text>
                                    许可日期：{adminLicence.startDate + '\n'}
                                </Text>
                            </View>
                            <View className="at-row">
                                <Text>
                                    截止日期：{adminLicence.endDate + '\n'}
                                </Text>
                            </View>
                            <View className="at-row">
                                <Text>许可内容：</Text>
                            </View>
                            <View className="at-row">
                                <View className="at-col at-col-10 at-col__offset-1 at-col--wrap">
                                    <Text>{adminLicence.content}</Text>
                                </View>
                            </View>
                        </View>
                        <View style="margin-top:20px"></View>
                    </View>
                </View>
            </View>
        )
    }
}
