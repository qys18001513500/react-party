import React from 'react';

/**
 * 全局路由守卫
 */
export default class RouterGuard extends React.Component {
    
    componentWillMount() {
        console.log("isLogin:" + sessionStorage.getItem("isPartyLogin"));
        // console.log('路由跳转前的拦截', sessionStorage.getItem("isLogin"));
        // console.log('路由跳转前的拦截', this.props);
        let { history: { replace } } = this.props
        if (!sessionStorage.getItem("isPartyLogin")) {
            const search = this.props.location.search.toString();
            if(search) {
                const isLogin = search.split("?")[1].split("=")[1];
                if(isLogin === "true") {
                    sessionStorage.setItem("isPartyLogin", true);
                }else {
                    replace('/');  
                }
            }else {
                replace('/');   
            }
        }
    }

    render() {
        const { layout, component } = this.props;
        const render = layout === "" ? React.createElement(component, this.props) : React.createElement(layout, this.props, component);
        return (
            <div className="routerGuard-wrap">{render}</div>
        );
    }
}


