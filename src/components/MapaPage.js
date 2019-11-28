import React from 'react'
import axios from 'axios'
import MapaItem from './MapaItem'
import MapaForm from './MapaForm'
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
            this.componentDidMount()
            alert("Mapa atualizado com sucesso!")
        }).catch((error) => {
            console.error(error)
        })
    }

    handleInsert = (data) => {
        console.log(data)
        axios.post(this.BASE_URL, data).then(() => {
            this.componentDidMount()
            alert("Mapa inserido com sucesso!")
        }).catch((error) => {
            
            console.error(error)
        })
    }

    handleDelete = (id) => {
        console.log(id)
        axios.delete(this.BASE_URL + "/id?id=" + id).then(() => {
            this.componentDidMount()
            alert("Mapa excluído com sucesso!")
        })
        this.setState({ selectedItem: undefined })
    }

    render() {

        if (this.state.selectedItem) {
            var editLabel = <div>Editando {this.state.selectedItem.nome}</div>
        } else {
            var editLabel = "Inserindo"
        }

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
            <AppBar position="static">{editLabel}</AppBar>
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