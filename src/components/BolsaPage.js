import React from 'react'
import axios from 'axios'
import BolsaItem from './BolsaItem'
import BolsaForm from './BolsaForm'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import 'typeface-roboto';
import { message } from 'antd'

class BolsaPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.BASE_URL = "http://localhost:4000/bolsas"
        this.state = { bolsas: [],  init:0,selectedItem: undefined}
        //this.loadItens();
        
    }

  async componentDidMount(){
    await axios.get(this.BASE_URL).then((response) => {
        this.setState({ bolsas: response.data,  init:1 })
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

    selectedItem = (bolsa) => {
        if (this.state.selectedItem) {
            var bolsa = this.state.selectedItem._id == bolsa._id ? undefined : bolsa
        }

        this.setState({ selectedItem: bolsa })
    }

    handleUpdate = (id, data) => {
        console.log(data)
        axios.put(this.BASE_URL + "/id?id=" + id, data).then(() => {
            this.componentDidMount()
            message.info("Bolsa atualizada com sucesso!")
        }).catch((error) => {
            message.error('Atualização falhou. Error:' + error.request.status)
        })
    }

    handleInsert = (data) => {
        console.log(data)
        axios.post(this.BASE_URL, data).then(() => {
            this.componentDidMount()
            message.info("Bolsa inserida com sucesso!")
        }).catch((error) => {
            
            message.error("Inserção falhou. Código de erro:" + error.request.status)
        })
    }

    handleDelete = (id) => {
        console.log(id)
        axios.delete(this.BASE_URL + "/id?id=" + id).then(() => {
            this.componentDidMount()
            message.info("Bolsa excluída com sucesso!")
        }).catch((error) =>{
            message.error("Deleção falhou. Código de erro:" + error.request.status)
        })
        this.setState({ selectedItem: undefined })
    }

    render() {



        var bolsaList = this.state.bolsas.map((value) => {
            return <BolsaItem
                key={value._id}
                value={value}
                handleDelete={(id) => this.handleDelete(id)}
                handleSelect={(id) => this.selectedItem(id)}
            />
        })

        let { nome, espaco, _id } = this.state.selectedItem ? this.state.selectedItem : ""

        var bolsaForm = <BolsaForm
            handleAction={(data) => this.handleAction(data)}
            key={_id}
            nome={nome}
            espaco={espaco}
            
        />
 
        return <div>
            <AppBar position="static"></AppBar>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {bolsaForm}
            </Grid>
           
                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Bolsas
                    </ListSubheader>
                    }
                >
                    {bolsaList}
                </List>
        
        </div>
    }
}

export default BolsaPage;