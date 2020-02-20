import React from 'react';
import 'styles/components/nav.scss';

export default function nav(props) {
    const redirectPage = (e) => {
        // console.log(e.target.getAttribute("data-path"));
        if(e.target.getAttribute("data-path")) {
            // console.log(e.target.dataset.path);
            props.history.push("/" + e.target.dataset.path);
        }
    }
    return (
        <div className="nav" onClick={redirectPage}>
            <div className="nav-item">
                <img src="images/xtsm.png" alt="xtsm" data-path="xtsm"/>
                <p>系统说明</p>
            </div>
            <div className="nav-item">
                <img src="images/zbhx.png" alt="zbhx" data-path="zbhx"/>
                <p>支部画像</p>
            </div>
            <div className="nav-item">
                <img src="images/dyhx.png" alt="dyhx" data-path="dyhx"/>
                <p>党员画像</p>
            </div>
            <div className="nav-item">
                <img src="images/djyt.png" alt="djyt" data-path="djyt"/>
                <p>党建云图</p>
            </div>
        </div>
    )
}
