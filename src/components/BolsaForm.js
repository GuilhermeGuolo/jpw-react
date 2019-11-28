import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'


class BolsaForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            nome: this.props.nome,
            peso: this.props.espaco,
        }
    }

    handleChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        this.setState({ [inputName]: inputValue })
    }

    handleClick = () => {
        var data = { "nome": this.state.nome, "espaco": this.state.espaco}
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
         Espaço: <br/> <TextField
                id="filled-basic"
                label="Espaço"
                margin="normal"
                variant="filled"
                name="espaco" 
                value={this.state.peso}
                onChange={this.handleChange}/> <br/>
     
  

        </div>
        <div>
        <Button color="primary" onClick={this.handleClick}>Salvar</Button>
        </div>
    </form> 
     
    }
}

export default BolsaForm;