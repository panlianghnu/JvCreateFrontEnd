import { View,Text} from "@tarojs/components";
import { Component } from "react";
import { AtDrawer, AtList,AtListItem } from "taro-ui";
import { Logo } from '../../components/Logo';
import { AtAvatar, AtModal, AtModalHeader, AtModalContent } from 'taro-ui';
import { AtAccordion, AtTimeline } from 'taro-ui';
import './aboutMe.css'

export default class extends Component{
    constructor(props){
        super(props)
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.state = {
            introduction:'北京聚创造网络科技有限公司，是国家高新技术企业、科技部全国科技型中小企业，是致力通过大数据、人工智能技术改造提升创业投资行业的技术创新型公司。\n\n北京聚创造网络科技有限公司，也是北京中关村金色种子基金的出资人，是全国多家科技创新型企业的早期投资人，是长沙高新区中关村湘军创业园运营公司（长沙中关村湘军创业服务有限公司）的控股股东。\n\n北京聚创造网络科技有限公司，已在北京基金小镇注册成立全资子公司——北京聚创造创业投资管理有限公司，以便管理与中关村和地方政府合作设立的创业投资基金。',
            team:[
                {"name":"郭志强",
                "picture":"http://www.jucreate.com/u/cms/www//201902/27131038xv8j.jpg" ,
                "position":"投资总监",
                "intro":"中南大学光电信息科学与工程学士。主要关注TMT、大健康、光电等行业的投资，曾参与安莱科分析仪器、蔚蓝海域二次元手游、梅丽纳米孔早期癌症检测、旭新医联体、界面生物牙种植体、柳叶刀临床医疗培训等项目投资。"
                },
                {"name":"聂和民",
                "picture":"http://www.jucreate.com/u/cms/www//201706/30105834qmos.jpg" ,
                "position":"高级技术专家",
                "intro":"2009年获新加坡国立大学（National University of Singapore）化学与生物分子工程学博士学位，2010-2012年在美国哥伦比亚大学（Columbia University）颌面再生研究中心完成博士后研究，2012年8月起任湖南大学教授，湖南大学博士生导师。2013年当选中国生物医学工程学会高级会员，担任组织工程与再生医学分会第二届、第三届理事会青年委员，担任《Biotechnology Frontier》编委，2015年获得“湖南省自然科学杰出青年基金”。"
                },
                {"name":"欧少端",
                "picture":"http://www.jucreate.com/u/cms/www//201706/30111545gs58.jpg" ,
                "position":"高级合伙人",
                "intro":"中南大学能源科学与工程学院副教授,北京理工大学化学工程系学士,美国康涅狄格大学化学工程系硕士、博士，研究领域有：燃料电池的建模与数值模拟、工业电炉的数值模拟与优化、工业余热的回收利用、车用混合动力系统集成及控制技术、新能源汽车相关技术的开发。"
                },
                {"name":"肖辉",
                "picture":"http://www.jucreate.com/u/cms/www//201902/271312535kfz.jpg" ,
                "position":"创始人&CEO",
                "intro":"复旦大学国际金融系金融学硕士。曾在上海市宝山区人民政府担任区长秘书，创办视频新闻网站、生鲜平台、知识产权服务公司，在北京、广州知名风投公司从事风险投资工作。2015年，创始成立北京聚创造网络科技有限公司，致力通过大数据、人工智能技术改造提升创业投资行业。"
                },
                {"name":"肖睿洋",
                "picture":"http://www.jucreate.com/u/cms/www//201706/30105959w11g.jpg" ,
                "position":"高级技术专家",
                "intro":"中南大学冶金与环境学院副教授，本科毕业于湖南农业大学环境工程专业，先后获得中国科学院生态环境研究中心环境科学系硕士学位和俄亥俄州立大学（美国）环境科学系硕士学位，之后获得俄亥俄州立大学（美国）环境工程系博士学位，研究领域有：高级氧化水处理、持久性有机污染物、多介质环境模型、量子化学计算。"
                },
                {"name":"张加",
                "picture":"http://www.jucreate.com/u/cms/www//201902/27131428duwg.jpg" ,
                "position":"投资总监",
                "intro":"北京大学地理信息系统学士。第十八届全国中学生生物学奥林匹克竞赛金牌得主。主要关注TMT、大健康、消费升级等行业的投资，曾在世纪高通、以太创服、蓝驰创投等从事技术和投资工作，参与落网音乐、易改衣、Painting Tower连锁画室等项目投资。"
                },
                {"name":"张震",
                "picture":"http://www.jucreate.com/u/cms/www//201706/301457178s13.jpg" ,
                "position":"高级技术专家",
                "intro":" 清华大学机械工程系研究员，本科毕业于上海交通大学仪器工程系，先后获得清华大学精密仪器与机械学系硕士学位和美国范德堡大学（Vanderbilt University）机械工程系硕士学位，之后获得美国俄亥俄州立大学（The Ohio State University, Columbus OH）电气与计算机工程系博士学位，主要研究方向：超精密伺服系统设计、建模与控制及其在先进制造装备中的应用，特别是高速、变速（变频）系统中的高精度轨迹跟踪控制和扰动去除。研究特色：融会非线性控制领域中的微分几何学派和机电控制学科的思想和方法，强调以设计、建模与控制一体化的方法，研究可显著提高超精密机电系统、先进制造装备系统性能的使能技术。"
                },
                {"name":"郑峰",
                "picture":"http://www.jucreate.com/u/cms/www//202104/14095049ctoo.png" ,
                "position":"高级合伙人",
                "intro":"郑峰博士，瑞典国际先进材料学会会士，中南大学材料科学与工程学院教授，钢铁材料与工艺研究所所长、相图与材料设计及制备科学中心副主任。从1983年开始从事金属、合金与陶瓷材料的研究开发工作；曾经在鞍山钢铁公司（1983-1991），英国戴维-谢菲尔德国际公司和谢菲尔德大学（1992-1994），美国西北太平洋国家实验室（1994-1999），华盛顿大学（1996-2000），研究型公司（2000-2002），劳伦斯伯克利国家实验室（2002-2003）等地从事研究工作。有两项美国专利（专利号 6,589,682: Fuel cells incorporating nanotubes in fuel feed; 20040086768A1: Fuel cells）和几项中国专利（环保型储能健身器，实用新型专利，证书号：1127667；石煤增值及提取有价金属元素技术，发明专利，申请号：201110066397.0；用于合成高品级金刚石单晶的FeNi触媒合金粉的制造技术，发明专利，申请号：201110080503.0; 含晶粒长大抑制剂Cr和V的超细WC粉制备技术，发明专利申请号：201110217175.4）。2003年回国成立材料化学系，研究纳米金属、金属防腐和功能陶瓷等新兴材料；发表学术著作两部（英文）、参考书三部（中文），英文论文百余篇。"
                },
                {"name":"朱曲波",
                "picture":"http://www.jucreate.com/u/cms/www//201706/30111836vk4l.jpg" ,
                "position":"高级合伙人",
                "intro":"朱曲波博士是分子生物学及药物代谢动力学方面的专家。朱曲波博士2003年7月本科毕业于武汉大学，获得药学学士学位。同年赴美，于Texas A&M University Dr. Robert Tsai课题组从事干细胞及癌症方面的研究，2009年5月获得Biomedical Sciences的博士学位。2009年9月至2011年8月在美国Case Western Reserve University药理学系Dr. Krzysztof Palczewski实验室从事博士后研究工作，主要研究microRNA在视网膜中的调节。2011年9月学成回国，加入到中南大学药学院，担任副教授。得到了中南大学升华猎英计划50万元启动经费的资助，现在主要从事microRNA在癌症中以及神经系统疾病中的研究工作以及抗癌药物药代、药动学研究。朱曲波博士曾参与并主持了多项课题的研究，包括：国家自然科学基金 “miR-183/-96/-182基因簇对乳腺癌诊断及治疗作用的机制研究”；国家自然科学基金“补肺活血胶囊治疗COPD物质基础及作用机制研究”等。在J Cell Biol., Mol Cell Biol., Breast Cancer Res., Cancer Lett.等国际权威期刊上发表SCI论文10余篇。"
                },
            ],
            flag: false,
            index: 0,
            open1:false,
            open2:false,
            open3:false,
            open4:true,
            history:[
                {
                    "date":"2021-04",
                    "content":"聚创造实施第五次股权激励"
                },
                {
                    "date":"2021-02",
                    "content":"聚创造重点投资项目安莱科分析仪器获得达晨创投数千万元A轮投资"
                },
                {
                    "date":"2020-01",
                    "content":"聚创造实施第四次股权激励"
                },
                {
                    "date":"2019-09",
                    "content":"聚创造共同主导设立中关村天使基金——北京金色种子技术创新中心（有限合伙）"
                },
                {
                    "date":"2019-04",
                    "content":"聚创造成功获评科技部全国科技型中小企业"
                },
                {
                    "date":"2019-04",
                    "content":"聚创造全资创投公司入驻北京基金小镇"
                },
                {
                    "date":"2018-12",
                    "content":"聚创造实施第三次股权激励"
                },
                {
                    "date":"2018-10",
                    "content":"聚创造成功获批国家高新技术企业"
                },
                {
                    "date":"2018-07",
                    "content":" 聚创造成功退出第一个项目——梅丽科技"
                },
                {
                    "date":"2018-01",
                    "content":"聚创造实施第二次股权激励"
                },
                {
                    "date":"2017-03",
                    "content":"聚创造实施第一次股权激励"
                },
                {
                    "date":"2017-03",
                    "content":"聚创造、北京中关村、长沙高新区联合创立长沙中关村湘军创业园"
                },
                {
                    "date":"2017-02",
                    "content":"聚创造入股中关村天使基金——北京金色种子科技中心（有限合伙）"
                },
                {
                    "date":"2016-08",
                    "content":" 聚创造股权激励员工持股平台北京聚贤达成立"
                },
                {
                    "date":"2016-05",
                    "content":"聚创造北京前端和北方决策总部成立"
                },
                {
                    "date":"2015-12",
                    "content":"聚创造乔迁新址办公"
                },
                {
                    "date":"2015-12",
                    "content":"聚创造成功获得天使轮投资"
                },
                {
                    "date":"2015-06",
                    "content":"聚创造长沙后端和南方决策总部成立"
                },
            ]
        }
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
    render(){

        let team = this.state.team.map((item, index) => {
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
                                <Text decode="true">
                                    {item.name}&emsp;{item.position}
                                </Text>
                            </View>
                            <View className="intro">
                                <View className="at-col--wrap">
                                    {item.intro}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
        var modal = (
            <View onClick={this.handleClose}>
                <AtModal
                    isOpened={this.state.flag}
                    closeOnClickOverlay="true"
                    onClick={this.handleClose}
                >
                    <AtModalHeader>
                        {this.state.team[this.state.index].name}
                    </AtModalHeader>
                    <AtModalContent>
                        <View style="text-align: justify;">
                            {this.state.team[this.state.index].intro}
                        </View>
                    </AtModalContent>
                </AtModal>
            </View>
        )

        const changeList = []
        let temp
        let i = 0
        let changeLog
        for (; i < this.state.history.length; i++) {
            changeLog = (
                <View>
                    <View className="at-row" style="margin-bottom:5px">
                        <View
                            style="font-weight:bold"
                            className="at-col at-col--wrap"
                        >
                            {this.state.history[i].content}
                        </View>
                    </View>
                </View>
            )
            temp = {
                title: this.state.history[i].date,
                content: [changeLog],
                icon: 'clock',
            }
            changeList.push(temp)
        }
        return(
            <View>
                <AtAccordion
                    open={this.state.open1}
                    title="公司介绍"
                    arrow="right"
                    onClick={value => {
                        this.setState({ open1: value })
                        }}
                >
                    <View>
                        <View className="at-row">
                            <View
                                className="at-col at-col-12"
                                style="text-align:center"
                            >
                            <Logo width={50} style="padding-top:15px"></Logo>
                            </View>
                        </View>
                        <View className="companyIntro">
                            <Text >{this.state.introduction}</Text>
                        </View>  
                    </View> 
                </AtAccordion>
                <AtAccordion
                    open={this.state.open2}
                    title="核心团队"
                    arrow="right"
                    onClick={value => {
                        this.setState({ open2: value })
                    }}
                >
                    <View>
                        <View>{team}</View>
                        {modal}
                    </View>
                </AtAccordion>
                <AtAccordion
                    open={this.state.open3}
                    title="发展历程"
                    arrow="right"
                    onClick={value => {
                        this.setState({ open3: value })
                    }}
                >
                    <View style="margin-left:30px;margin-top:20px">
                            <AtTimeline items={changeList} />
                        </View>
                </AtAccordion>
                <AtAccordion
                    open={this.state.open4}
                    title="广纳贤才"
                    arrow="right"
                    onClick={value => {
                        this.setState({ open4: value })
                    }}
                >
                    <View>
                        <View className='companyIntro'>
                        <Text>
                        北京聚创造网络科技有限公司，是国家高新技术企业，是致力通过大数据、人工智能技术改造提升创业投资行业的技术创新型公司。{'\n'}{'\n'}公司目前的创始团队由风险投资业内资深投资人领衔，核心团队成员包括一位复旦大学金融学硕士、一位美国华盛顿大学（西雅图）材料学博士、一位美国哥伦比亚大学化学与生物分子工程学博士后、一位美国俄亥俄州立大学环境工程博士、一位美国德克萨斯农工大学生物医学博士、一位美国康涅狄格大学化学工程博士和一位美国俄亥俄州立大学电气与计算机工程博士。{'\n'}{'\n'}我们求贤若渴，我们奉行共享！公司现诚聘以下职位，欢迎广大志同道合的英才加盟，与聚创造共同把握历史机遇，共同创造时代辉煌！
                        </Text>
                        </View>
                        
                        <View className='at-article__h2'>
                        1、职位：投资总监 （北京1名、上海1名、深圳1名、长沙1名）
                        </View>

                        <View className='at-article__h3'>
                        工作职责：
                        </View>
                        
                        <View className='font-break'>1）带领团队发掘、筛选优质项目；{'\n'}</View>
                        <View className='font-break'>2）全程负责项目的融资事宜；{'\n'}</View>
                        <View className='font-break'>3）负责已投项目的投后管理，为其提供增值服务；{'\n'}</View>
                        <View className='font-break'>4）根据项目发展情况，负责项目退出事宜。</View>
                        
                        <View className='at-article__h3'>
                        任职要求：
                        </View>
                        
                        <View className='font-break'>1）985高校毕业，理工科、IT、金融相关专业，硕士及以上学历；{'\n'}</View>
                        <View className='font-break'>2）具有3年及以上创业投资工作经验；{'\n'}</View>
                        <View className='font-break'>3）工作认真负责，做事严谨踏实，学习能力强，善于思考，积极进取，为人坦诚；{'\n'}</View>
                        <View className='font-break'>4）有项目资源者优先，海归优先。</View>
                        
                        <View className='at-article__h3'>
                        待遇：
                        </View>
                        <View className='font-break'>1）工资1.5-2.5万元/月；{'\n'}</View>
                        <View className='font-break'>2）项目成功融资、成功退出，公司均对项目团队实施奖励；{'\n'}</View>
                        <View className='font-break'>3）公司对正式员工实施股权激励；{'\n'}</View>
                        <View className='font-break'>4）公司向正式员工开放所有项目的跟投机会。</View>   
                       
                        <View className='at-article__h2'>
                        2、职位：投资副总监（北京1名）
                        </View>
                        <View className='at-article__h3'>
                        工作职责：
                        </View>

                        <View className='font-break'>1）带领团队发掘、筛选优质项目；{'\n'}</View>
                        <View className='font-break'>2）全程负责项目的融资事宜；{'\n'}</View>
                        <View className='font-break'>3）负责已投项目的投后管理，为其提供增值服务；{'\n'}</View>
                        <View className='font-break'>4）根据项目发展情况，负责项目退出事宜。</View>
                        
                        <View className='at-article__h3'>
                        任职要求：
                        </View>

                        <View className='font-break'>1）985高校毕业，理工科、IT、金融相关专业，硕士及以上学历；{'\n'}</View>
                        <View className='font-break'>2）具有2年及以上创业投资工作经验；{'\n'}</View>
                        <View className='font-break'>3）工作认真负责，做事严谨踏实，学习能力强，善于思考，积极进取，为人坦诚；{'\n'}</View>
                        <View className='font-break'>4）有项目资源者优先，海归优先。</View>
                        

                        <View className='at-article__h3'>
                        待遇：
                        </View>

                        <View className='font-break'>1）工资1.2-1.5万元/月；{'\n'}</View>
                        <View className='font-break'>2）项目成功融资、成功退出，公司均对项目团队实施奖励；{'\n'}</View>
                        <View className='font-break'>3）公司对正式员工实施股权激励；{'\n'}</View>
                        <View className='font-break'>4）公司向正式员工开放所有项目的跟投机会。</View>
                        
                        
                        <View className='at-article__h2'>
                        3、职位：高级投资经理（北京1名、上海1名、深圳1名）
                        </View>
                        <View className='at-article__h3'>
                        工作职责：
                        </View>

                        <View className='font-break'>1）发掘、筛选优质项目；{'\n'}</View>
                        <View className='font-break'>2）全程负责项目的融资事宜；{'\n'}</View>
                        <View className='font-break'>3）参与已投项目的投后管理，为其提供增值服务；{'\n'}</View>
                        <View className='font-break'>4）根据项目发展情况，负责项目退出事宜。</View>
                        
                        <View className='at-article__h3'>
                        任职要求：
                        </View>

                        <View className='font-break'>1）985高校毕业，理工科、IT、金融相关专业，硕士及以上学历；{'\n'}</View>
                        <View className='font-break'>2）具有1年及以上创业投资工作经验；{'\n'}</View>
                        <View className='font-break'>3）工作认真负责，做事严谨踏实，学习能力强，善于思考，积极进取，为人坦诚；{'\n'}</View>
                        <View className='font-break'>4）有项目资源者优先，海归优先。</View>

                        <View className='at-article__h3'>
                        待遇：
                        </View>

                        <View className='font-break'>1）工资1-1.2万元/月；{'\n'}</View>
                        <View className='font-break'>2）项目成功融资、成功退出，公司均对项目团队实施奖励；{'\n'}</View>
                        <View className='font-break'>3）公司对正式员工实施股权激励；{'\n'}</View>
                        <View className='font-break'>4）公司向正式员工开放所有项目的跟投机会。</View>

                        <View className='at-article__h3'>
                        简历投递
                        </View>
                        <View className='font-break'>
                            <Text>邮箱：</Text>
                            <Text style="color:#fe5d25">1735335832@qq.com</Text>
                        </View>

                        <View className='at-article__h3'>
                        补充说明
                        </View>
                        <View className='font-break'>
                        希望2021年12月31日前能到岗。
                        </View>
                    </View>
                </AtAccordion>
            </View>

        )
        
    }
}