import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import './item.css';
class ItemItem extends React.Component {

    constructor(props) {
        super(props)
    }

    handleDelete = () => {
        this.props.handleDelete(this.props.value._id)
    }

    handleSelect = () => {
        this.props.handleSelect(this.props.value)
    }

    render() {

        return <div className="itemlist"> <ListItem  button onClick={this.handleSelect} >
        <ListItemText  primary={this.props.value.nome}/>
        <ListItemSecondaryAction onClick={this.handleDelete}>
            <IconButton edge="end" aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem> 
    </div>

    }


}

export default ItemItem;