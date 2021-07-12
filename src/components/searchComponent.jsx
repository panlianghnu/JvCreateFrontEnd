/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-quotes */
import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

class SearchComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    render() {
        return (
            <View>
                <AtSearchBar
                    value={this.props.searchValue}
                    onChange={value => this.props.onChange(value)}
                    actionName="搜索"
                    onActionClick={this.props.onClick}
                    placeholder="请输入细分行业、公司名称等关键字"
                />
            </View>
        )
    }
}

export { SearchComponent }
