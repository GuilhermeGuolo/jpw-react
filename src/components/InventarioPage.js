import React from 'react'
import axios from 'axios'
import InventarioItem from './InventarioItem'
import InventarioForm from './InventarioForm'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import 'typeface-roboto';
import { message } from 'antd'

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
            message.info("Inventario atualizado com sucesso!")
        }).catch((error) => {
            message.error('Atualização falhou. Erro:' + error.request.status)
        })
    }

    handleInsert = (data) => {
        console.log(data)
        axios.post(this.BASE_URL, data).then(() => {
            this.componentDidMount()
            message.info("Inventario inserido com sucesso!")
        }).catch((error) => {
            
            message.error("Inserção falhou. Código de erro:" + error.request.status)
        })
    }

    handleDelete = (id) => {
        console.log(id)
        axios.delete(this.BASE_URL + "/id?id=" + id).then(() => {
            this.componentDidMount()
            message.info("Inventario excluído com sucesso!")
        }).catch((error) =>{
            message.error("Deleção falhou. Código de erro:" + error.request.status)
        })
        this.setState({ selectedItem: undefined })
    }

    render() {

   

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
            <AppBar position="static"></AppBar>
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