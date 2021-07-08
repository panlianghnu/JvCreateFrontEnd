import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inventionId: getCurrentInstance().router.params.id,
        }
        console.log('专利详情，专利ID为：', this.state.inventionId)
    }

    render() {
        return (
            <View>
                <Text>这是专利详情页</Text>
            </View>
        )
    }
}
