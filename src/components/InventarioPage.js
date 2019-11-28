import React from 'react'
import axios from 'axios'
import InventarioItem from './InventarioItem'
import InventarioForm from './InventarioForm'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import 'typeface-roboto';

class InventarioPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.BASE_URL = "http://localhost:4000/inventarios"
        this.state = { inventarios: [],  init:0,selectedItem: undefined}
        //this.loadItens();
        
    }

  async componentDidMount(){
    await axios.get(this.BASE_URL).then((response) => {
        this.setState({ inventarios: response.data,  init:1 })
    }).catch((error) => {
        console.error(error)
    })
  }


    handleAction = (data) => {
        if (this.state.selectedItem) {
            var id = this.state.selectedItem._id
            this.handleUpdate(id, data)
        } else {
            this.handleInsert(data)
        }
    }

    selectedItem = (inventario) => {
        if (this.state.selectedItem) {
            var inventario = this.state.selectedItem._id == inventario._id ? undefined : inventario
        }

        this.setState({ selectedItem: inventario })
    }

    handleUpdate = (id, data) => {
        console.log(data)
        axios.put(this.BASE_URL + "/id?id=" + id, data).then(() => {
            this.componentDidMount()
            alert("Inventario atualizado com sucesso!")
        }).catch((error) => {
            console.error(error)
        })
    }

    handleInsert = (data) => {
        console.log(data)
        axios.post(this.BASE_URL, data).then(() => {
            this.componentDidMount()
            alert("Inventario inserido com sucesso!")
        }).catch((error) => {
            
            console.error(error)
        })
    }

    handleDelete = (id) => {
        console.log(id)
        axios.delete(this.BASE_URL + "/id?id=" + id).then(() => {
            this.componentDidMount()
            alert("Inventario excluído com sucesso!")
        })
        this.setState({ selectedItem: undefined })
    }

    render() {

        if (this.state.selectedItem) {
            var editLabel = <div>Editando {this.state.selectedItem.nome}</div>
        } else {
            var editLabel = "Inserindo"
        }

        var inventarioList = this.state.inventarios.map((value) => {
            return <InventarioItem
                key={value._id}
                value={value}
                handleDelete={(id) => this.handleDelete(id)}
                handleSelect={(id) => this.selectedItem(id)}
            />
        })

        let { nome, espaco,bags, _id } = this.state.selectedItem ? this.state.selectedItem : ""

        var inventarioForm = <InventarioForm
            handleAction={(data) => this.handleAction(data)}
            key={_id}
            nome={nome}
            espaco={espaco}
            bags={bags}
            
            
        />
 
        return <div>
            <AppBar position="static">{editLabel}</AppBar>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {inventarioForm}
            </Grid>
           
                <List

                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Inventários
                    </ListSubheader>
                    }
                >
                    {inventarioList}
                </List>
        
        </div>
    }
}

export default InventarioPage;