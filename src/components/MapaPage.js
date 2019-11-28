import React from 'react'
import axios from 'axios'
import MapaItem from './MapaItem'
import MapaForm from './MapaForm'
import { message, Button } from 'antd';
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import 'typeface-roboto';

class MapaPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.BASE_URL = "http://localhost:4000/mapas"
        this.state = { mapas: [],  init:0,selectedItem: undefined}
        //this.loadItens();
        
    }

  async componentDidMount(){
    await axios.get(this.BASE_URL).then((response) => {
        this.setState({ mapas: response.data,  init:1 })
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

    selectedItem = (mapa) => {
        if (this.state.selectedItem) {
            var mapa = this.state.selectedItem._id == mapa._id ? undefined : mapa
        }

        this.setState({ selectedItem: mapa })
    }

    handleUpdate = (id, data) => {
        console.log(data)
        axios.put(this.BASE_URL + "/id?id=" + id, data).then(() => {
            message.info("Mapa:" + data.nome + " atualizado com sucesso!")
            this.componentDidMount()
            
        }).catch((error) => {
            message.error("Inserção falhou. Código de erro:" + error.request.status)
        })
    }

    handleInsert = (data) => {
        console.log(data)
        axios.post(this.BASE_URL, data).then(() => {
            message.info("Mapa:" + data.nome + " inserido com sucesso!")
            this.componentDidMount()
        }).catch((error) => {
            
            message.error("Inserção falhou. Código de erro:" + error.request.status)
        })
    }

    handleDelete = (id) => {
        console.log(id)
        axios.delete(this.BASE_URL + "/id?id=" + id).then(() => {
            alert("Mapa:" + this.state.nome + "excluído com sucesso!")
            this.componentDidMount()
            
        }).catch((error) =>{
            alert("Deleção falhou. Código de erro:" + error.request.status)
        })
        this.setState({ selectedItem: undefined })
    }

    render() {

 

        var mapaList = this.state.mapas.map((value) => {
            return <MapaItem
                key={value._id}
                value={value}
                handleDelete={(id) => this.handleDelete(id)}
                handleSelect={(id) => this.selectedItem(id)}
            />
        })

        let { nome, descricao, _id } = this.state.selectedItem ? this.state.selectedItem : ""

        var mapaForm = <MapaForm
            handleAction={(data) => this.handleAction(data)}
            key={_id}
            nome={nome}
            descricao={descricao}
            
        />
 
        return <div>
            <AppBar position="static"></AppBar>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {mapaForm}
            </Grid>
            
                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Mapas
                    </ListSubheader>
                    }
                >
                    {mapaList}
                </List>
        
        </div>
    }
}

export default MapaPage;