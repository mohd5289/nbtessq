import React , {Component} from 'react';
import Topic from './Topic';
import Confidentiality from './Confidentiality';
import './section.css';
import Notes from './notes';
import Radium from 'radium';
import Auth from './Auth/Auth';


class section extends Component{
state = {
    authButtonClicked : false
}

authButtonClickedHandler= ()=>{
 
    this.setState({authButtonClicked: true});
    
}
closedAuthButtonClicked =()=>{
    this.setState({authButtonClicked: false});
}



render(){


return(
<div className = 'FullSection'>
   <Auth checkFileNo= {this.props.checkFileNo} show = {this.state.authButtonClicked} closeClicked = {this.closedAuthButtonClicked}/>    
    <Topic/>
    <Confidentiality/>
     <Notes></Notes>
     <button className ="button" onClick = {this.authButtonClickedHandler}  style ={{':hover':{backgroundColor:'lightgreen'}} } > Please click to register or login</button> 
  

</div>

);

}


}
export default Radium(section);