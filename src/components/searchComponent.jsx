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

    render() {
        return (
            <View>
                <AtSearchBar
                    value={this.props.searchValue}
                    onChange={value => this.props.onChange(value)}
                    actionName="搜索"
                    onActionClick={this.props.onClick}
                    placeholder="搜索细分行业、公司、自然人等"
                />
            </View>
        )
    }
}

export { SearchComponent }
