
import React,{ Component } from 'react';
import { getJwt} from '../../Features/JwtHelper'

class Authenticate extends Component {
constructor(props){
   super();
}


componentDidMount(){
 
    const jwt = getJwt();
    if(!jwt){
        this.props.history.push('/login');
    }

}

render(){
    return(
        <div>

        </div>
    );
}}

export default Authenticate;