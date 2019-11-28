import React from 'react'
import axios from 'axios'
import PersonagemItem from './PersonagemItem'
import PersonagemForm from './PersonagemForm'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import 'typeface-roboto';

class PersonagemPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.BASE_URL = "http://localhost:4000/personagens"
        this.state = { personagens: [],  init:0,selectedItem: undefined}
        //this.loadItens();
        
    }

  async componentDidMount(){
    await axios.get(this.BASE_URL).then((response) => {
        this.setState({ personagens: response.data,  init:1 })
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

    selectedItem = (personagem) => {
        if (this.state.selectedItem) {
            var personagem = this.state.selectedItem._id == personagem._id ? undefined : personagem
        }

        this.setState({ selectedItem: personagem })
    }

    handleUpdate = (id, data) => {
        console.log(data)
        axios.put(this.BASE_URL + "/id?id=" + id, data).then(() => {
            this.componentDidMount()
            alert("Personagem atualizado com sucesso!")
        }).catch((error) => {
            console.error(error)
        })
    }

    handleInsert = (data) => {
        console.log(data)
        axios.post(this.BASE_URL, data).then(() => {
            this.componentDidMount()
            alert("Personagem inserido com sucesso!")
        }).catch((error) => {
            
            console.error(error)
        })
    }

    handleDelete = (id) => {
        console.log(id)
        axios.delete(this.BASE_URL + "/id?id=" + id).then(() => {
            this.componentDidMount()
            alert("Personagem excluído com sucesso!")
        })
        this.setState({ selectedItem: undefined })
    }

    render() {

        if (this.state.selectedItem) {
            var editLabel = <div>Editando {this.state.selectedItem.nome}</div>
        } else {
            var editLabel = "Inserindo"
        }

        var personagemList = this.state.personagens.map((value) => {
            return <PersonagemItem
                key={value._id}
                value={value}
                handleDelete={(id) => this.handleDelete(id)}
                handleSelect={(id) => this.selectedItem(id)}
            />
        })

        let { nome, classe,sexo,carga, _id } = this.state.selectedItem ? this.state.selectedItem : ""

        var personagemForm = <PersonagemForm
            handleAction={(data) => this.handleAction(data)}
            key={_id}
            nome={nome}
            classe={classe}
            sexo={sexo}
            carga={carga}
            
        />
 
        return <div>
            <AppBar position="static">{editLabel}</AppBar>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {personagemForm}
            </Grid>
           
                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Personagens
                    </ListSubheader>
                    }
                >
                    {personagemList}
                </List>
        
        </div>
    }
}

export default PersonagemPage;