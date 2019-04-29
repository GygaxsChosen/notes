import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import './App.css';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomLineItem from './CustomLineItem';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  
  
});

class PermanentDrawer extends React.Component {
	constructor(props) {
    super(props);
    this.state = { 
	anchor: 'left',
	showNoteCard: false,
	multiline: '',
	noteCount: []
	};

	
	this.doSomething = this.doSomething.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.deleteNote=this.deleteNote.bind(this);
	this.switchNotes =this.switchNotes.bind(this);
  }
  
deleteNote(){
let activeNote = this.state.noteCount.find(note => note.isActive === true);
	

let locationOfNote = this.state.noteCount.findIndex(note => note.id === activeNote.id)

let splicedList = this.state.noteCount
 splicedList.splice(locationOfNote,1)
this.setState({showNoteCard: false, noteCount: splicedList})
}  

doSomething(){
let parsedValue = this.state.showNoteCard;
let newNotes = this.state.noteCount;
const uuidv1 = require('uuid/v4');
let newGuid =uuidv1();

let lastEntry = this.state.noteCount[this.state.noteCount.length-1];

if(!lastEntry){
lastEntry={index: 0};
}


if(!this.state.showNoteCard){
newNotes.push({label: `note ${lastEntry.index}`,isActive: true, data:'', id: newGuid, index: lastEntry.index + 1});
this.setState({showNoteCard: true,  noteCount: newNotes});
}else {
newNotes.push({label: `note ${lastEntry.index}`,isActive: false, data:'',id: newGuid, index: lastEntry.index + 1});
this.setState({noteCount: newNotes});
}




}

switchNotes(targetNote){
let activeNote = this.state.noteCount.find(note => note.isActive === true);
let filteredList = this.state.noteCount;
if (activeNote){
 filteredList = this.state.noteCount.filter(note=> note.isActive !== true);
activeNote.isActive = false;

filteredList.push(activeNote);
}


let parsedNote = targetNote;

parsedNote.isActive = true;

let filteredListAgain = this.state.noteCount.filter(note=> note.id !== targetNote.id);
filteredListAgain.push(parsedNote);

let sortedList = filteredList.sort((a,b) => a.index - b.index)

this.setState({noteCount: sortedList, showNoteCard:true})




}


handleChange(e){
	let newValue = e.target.value
	
	
	let activeNoteLocation;

	let activeNote = this.state.noteCount.find(note => note.isActive === true);
	let filteredList = this.state.noteCount.filter(note=> note.isActive !== true)
activeNote.data = newValue;
filteredList.push(activeNote);

let sortedList = filteredList.sort((a,b) => a.index - b.index)


	this.setState({multiline: newValue, noteCount: sortedList})
}


  render() {
    const { classes } = this.props;
    const { anchor } = this.state;

    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={anchor}
      >
        <div className={classes.toolbar} />
		
		
		<div>
		{this.state.noteCount.map(note => (
		<div  >
				<Divider/>

		<CustomLineItem
		inputString={note.label}
		data={note}
		onClick={this.switchNotes}
		/>
		<Divider/>
		</div>

		))
}
		</div>
   
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }


let activeNote = this.state.noteCount.find(note => note.isActive === true);
    return (
	<div className = 'body'>
	     <div className={classes.root, 'body'}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
          >
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Note Viewer
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main className={'noteContents', classes.content}>
            <div className={'noteContents',classes.toolbar} />
				{this.state.showNoteCard &&
					<Paper className='note' elevation={1}>
					<Typography variant="h5" component="h3">
					 <TextField
					  id="standard-multiline-flexible"
					  label={activeNote.label}
					  multiline
					  rowsMax="4"
					  value={activeNote.data}
					  onChange={this.handleChange}
					  margin="normal"
					  fullWidth
					  rowsMax={13}
					/>
				
				</Typography>
			</Paper>
				}
			
			
			<div className='button' >
			{this.state.showNoteCard &&
<IconButton className='trash' aria-label="Delete"
					onClick={this.deleteNote}
					>
					<DeleteIcon />
					</IconButton>
			}
					

			 <Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={this.doSomething}>
        <AddIcon />
		</Button>
			</div>
			 
          </main>
          {after}
        </div>
      </div>
	</div>
 
    );
  }
}

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);