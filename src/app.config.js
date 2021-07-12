export default {
    pages: [
        'pages/index/index',
        'pages/companyDetail/companyDetail',
        'pages/stock/stock',
        'pages/me/me',
        'pages/invention/invention',
        'pages/inventionDetail/inventionDetail',
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black',
    },
    tabBar: {
        color: '#626567',
        selectedColor: '#fe5d25',
        backgroundColor: '#FBFBFB',
        borderStyle: 'white',
        list: [
            {
                pagePath: 'pages/index/index',
                text: '搜索',
                iconPath: 'static/icons/search.png',
                selectedIconPath: 'static/icons/selected_search.png',
            },
            {
                pagePath: 'pages/me/me',
                text: '我的',
                iconPath: 'static/icons/me.png',
                selectedIconPath: 'static/icons/selected_me.png',
            },
        ],
    },
}
