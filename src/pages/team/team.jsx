import { View } from "@tarojs/components";
import { Current } from "@tarojs/taro";
import { Component } from "react";
import { AtAvatar } from 'taro-ui'
import Taro from "@tarojs/taro"
import './team.css'

export default class Team extends Component{
    constructor(props){
        super(props)
        this.state = {
            team : [
                {
                    id:0,
                    name:'asdzz',
                    picture:'asdzz',
                    introduction:'asdzz'
                }
            ]
        }
    }
    componentWillMount() {}

    componentDidMount() {
        const companyId = Current.router.params.companyId;
        var th = this
        Taro.request({
            url:'http://rest.apizza.net/mock/bc6d7ccdfaec23b8fefb9f9dcf322f51/team',
            data:{
               companyId:companyId
            },
            header: {
            'content-type': 'application/json' // 默认值
            },
            success:function(res){
                console.log(res.data)
                th.setState({
                    team : res.data.team
                })
            }
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
    render(){
        const teams = this.state.team.map(item => {
            return(
                <View className="teamList" key={item.id}>
                    <View className="at-row at-row__align--center">
                        <View className="at-col at-col__offset-1 at-col-1 at-col--auto">
                            <AtAvatar
                                text={item.name}
                                size="large"
                                image = {item.picture}
                            />
                            <View className="searchCount">{item.name}</View>
                        </View>

                        <View className="at-row">
                            {/* <View className='at-col at-col-1 at-col--wrap'>
                                
                            </View> */}
                            {item.introduction}
                        </View>
                    </View>
                </View>
            )
        } )
        return(
            <View>团队成员：{<View>{teams}</View>}</View>
        )
    }
}