import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'
import { number } from 'prop-types'
import logo from '../static/logo/logo.png'

function logoSize(width) {
    if (typeof width != number || width >= 100 || width <= 0) {
        width = 50
    }
    var logo_width_height = parseInt(303 / 128)
    const maxWidth = Taro.getSystemInfoSync().windowWidth
    var logoWidth = parseInt((width / 100) * maxWidth)
    var logoHeight = parseInt(logoWidth / logo_width_height)
    return 'width:' + logoWidth + 'px;height:' + logoHeight + 'px;'
}

function Logo(props) {
    return <Image src={logo} style={logoSize(props.width)}></Image>
}

export { Logo }
