import React,{Component} from 'react';
import Mast from './Mast/Mast' ;
import './App.css';
import Footer from './footer/footer';
import Section from './section/sections';
import Radium, {StyleRoot} from 'radium';
import SSQform from './SSQforms/SSQform';
import {BrowserRouter,Route} from 'react-router-dom';
import fire from './section/Auth/firebaseConfig';
import createBrowserHistory from 'history/createBrowserHistory'


class App extends Component {
  constructor(props){
    super(props);
    const newHistory = createBrowserHistory();
    
    this.state = {
      user:{},
    fileNoPassed:false,
    databaseKey:"",
  institutionDetails:{}  
  }
  }

checkFileRefNo=(fileRefNo)=>{
const fileRefNoRegex = /TEB\/PRO\/([SF]P\.\d+)/;
const dotRegex = /\./;

var match = fileRefNoRegex.exec(fileRefNo);
console.log(match[1]);
var dbkey = match[1].replace(dotRegex,"");
this.setState({databaseKey:dbkey});
console.log(this.state.databaseKey);
if(match!=null){
  this.setState({fileNoPassed:true});
}

console.log(this.state.fileNoPassed);
}

componentDidMount(){
  this.authListener();
  
}

authListener=()=>{
  fire.auth().onAuthStateChanged((user) =>{
   if(user){
    console.log(user);
    if(this.state.fileNoPassed){
fetch(`https://ssq2-2f329.firebaseio.com/Institutions/${this.state.databaseKey}.json`)
.then(response =>{
console.log(response.json().then(data=>{
  this.setState({user:user});



  console.log(this.state.user);
  console.log(this.state.databaseKey)
  this.setState({institutionDetails:data})
}));

}).catch(error=>{console.log(error)}
)}else{
  this.setState({user:null});
}
   }else{
    this.setState({user:null});
}
  });
}

 
  render(){
 //console.log(this.state.user);
    return (
   <BrowserRouter>
   <StyleRoot>
   <div>
   <Mast/>
    {this.state.user?(<Route path = "/" render= {(props)=><SSQform  {...props} databaseKey = {this.state.databaseKey} 
    institutionName = {this.state.institutionDetails['name']}/>}/>)
    :(<Section   checkFileNo= {this.checkFileRefNo}/>)}
   <Footer/>
    </div>
    </StyleRoot>
    </BrowserRouter>
  );
}
}
export default Radium(App);
