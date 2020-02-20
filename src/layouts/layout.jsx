import React from 'react';
import Nav from 'components/nav';
import './layout.scss';

export default function layout(props) {
    const showNav = (e) => {
        let btn = e.target;
        if(btn.classList.contains('icon-jiantoushang')) {
            btn.classList.remove('icon-jiantoushang');
            btn.classList.add('icon-jiantouxia');
        }else {
            btn.classList.remove('icon-jiantouxia');
            btn.classList.add('icon-jiantoushang');
        }
        let nav = document.querySelector('.nav-container');
        let mask = document.querySelector('.mask');
        if(nav.classList.contains('show')) {
            nav.classList.remove('show');
            mask.classList.add('hidden')
        }else {
            nav.classList.add('show');
            mask.classList.remove('hidden')
        }
    }
    return (
        <div className="layout">
            <div className="mask hidden"></div>
            <div>{props.children}</div>
            <i className="iconfont icon-jiantoushang" onClick={showNav}></i>
            <div className="nav-container">
                <Nav history={props.history}/>
            </div>
        </div>
    )
}

