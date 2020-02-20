import React from 'react';
import axios from 'axios';
import 'styles/components/login.scss';

export default class LoginInterface extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',  //用户名
      password: '',  //密码
    }
  }
 

  componentDidMount() {
    this.bindEvent();
  }


  bindEvent = () => {
    window.addEventListener('keydown', function(e){
      if(e.code=="Enter"){
        this.login();
      }
    });
  }

  login = () => {
    //let username = this.refs.username.value;
    console.log(localStorage.getItem("projectInfoList"));
    let password = this.refs.password.value;
    let params = {
      //username:username,
      password:password,
    }
    axios.post('http://multiple.chinawaytek.com/showSystemMgr/api/showSystemProjectMgr/login',params).then( (res) => {
      // console.log(res.data);
      if(res.data.isLogin){
        sessionStorage.setItem("isPartyLogin", res.data.isLogin);
        let params = {
          project_id: res.data.id,
        }
        axios.post('http://multiple.chinawaytek.com/showSystemMgr/api/showSystemProjectMgr/getProjectInfo',params).then((res) => {  
            // console.log(res.data);
            let projectParams = res.data.projectInfo.projectParams;
            let jsonParam = JSON.parse(projectParams);
            localStorage.clear();
            localStorage.setItem("project_id",jsonParam.project_id);
            localStorage.setItem("party_organization_id",jsonParam.party_organization_id);
            localStorage.setItem("base_geo_id",jsonParam.base_geo_id);
            localStorage.setItem("year",new Date().getFullYear());
            localStorage.setItem("zoom",jsonParam.zoom);
            localStorage.setItem("lng",jsonParam.lng);
            localStorage.setItem("lat",jsonParam.lat);
            localStorage.setItem("name",res.data.projectInfo.projectTitle);
            localStorage.setItem("radioUrl",jsonParam.radioUrl);
            localStorage.setItem("isdemo",jsonParam.isdemo);
            this.props.history.push('/home');
        });
      }
    });
   
  }

  render() {
    return (
      <div className='login'>
          <div className='wrapper'>
              <div className='logo'></div>
              <div className='name'>请输入密码：</div>
              <div className='password'><input type="password" value={this.state.password}  ref="password" onChange={(e) => this.setState({ password: e.target.value }) }/></div>
              <button className='btn' onClick={this.login}>登录</button>
          </div>
      </div>
    );
  }
}

