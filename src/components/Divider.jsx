/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-quotes */
import { View, Text } from '@tarojs/components'

function Divider(props) {
    return (
        <View
            className="at-row at-row__justify--around at-row__align--center"
            style="text-align:center;margin-top:10px;margin-bottom:10px"
        >
            <View className="at-col at-col-4">
                <View style="background:linear-gradient(to right,#FFFFFF,#fe5d25);height:1px;"></View>
            </View>
            <View className="at-col at-col-2" style="color:#fe5d25">
                <Text style="fontsize:40px">{props.content}</Text>
            </View>
            <View className="at-col at-col-4">
                <View style="background:linear-gradient(to left,#FFFFFF,#fe5d25);height:1px;"></View>
            </View>
        </View>
    )
}
export { Divider }
