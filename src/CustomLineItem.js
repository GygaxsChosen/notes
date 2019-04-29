import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class CustomLineItem extends React.Component{

constructor(props) {
    super(props);
  

this.handleClick = this.handleClick.bind(this);
}
handleClick(){
this.props.onClick(this.props.data)
}

render(){
return (
   <div onClick={this.handleClick}>
	{this.props.inputString}
	</div>
  );
}
  
}


export default(CustomLineItem);