import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'


class PersonagemForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            nome: this.props.nome,
            classe: this.props.classe,
            sexo: this.props.sexo,
            carga: this.props.carga
        }
    }

    handleChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        this.setState({ [inputName]: inputValue })
    }

    handleClick = () => {
        var data = { "nome": this.state.nome, "classe": this.state.classe, "sexo": this.state.sexo, "carga": this.state.carga}
        this.props.handleAction(data)
    }
    render(){
        return <form onSubmit={this.handleClick}>
        <div>
         Nome: <br/> <TextField             
                id="filled-basic"
                label="Nome"
                margin="normal"
                variant="filled"
                name="nome" 
                value={this.state.nome}
                onChange={this.handleChange}/> <br/>
         Classe: <br/> <TextField
                id="filled-basic"
                label="Classe"
                margin="normal"
                variant="filled"
                name="classe" 
                value={this.state.classe}
                onChange={this.handleChange}/> <br/>
         Sexo: <br/> <TextField
                id="filled-basic"
                label="Sexo"
                margin="normal"
                variant="filled"
                name="sexo" 
                value={this.state.sexo}
                onChange={this.handleChange}/> <br/>
         Carga: <br/> <TextField
                id="filled-basic"
                label="Carga"
                margin="normal"
                variant="filled"
                name="carga" 
                value={this.state.carga}
                onChange={this.handleChange}/> <br/>
     
  

        </div>
        <div>
        <Button color="primary" onClick={this.handleClick}>Salvar</Button>
        </div>
    </form> 
     
    }
}

export default PersonagemForm;