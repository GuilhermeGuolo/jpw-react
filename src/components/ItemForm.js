import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'


class ItemForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            nome: this.props.nome,
            peso: this.props.peso,
            raridade:this.props.raridade
        }
    }

    handleChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        this.setState({ [inputName]: inputValue })
    }

    handleClick = () => {
        var data = { "nome": this.state.nome, "peso": this.state.peso, "raridade": this.state.raridade}
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
         Peso: <br/> <TextField
                id="filled-basic"
                label="Peso"
                margin="normal"
                variant="filled"
                name="peso" 
                value={this.state.peso}
                onChange={this.handleChange}/> <br/>
     
        Raridade: <br/><TextField
                id="filled-basic"
                label="Raridade"
                margin="normal"
                variant="filled"
                name="raridade" 
                value={this.state.raridade}
                onChange={this.handleChange}/>

        </div>
        <div>
        <Button color="green" onClick={this.handleClick}>Salvar</Button>
        </div>
    </form> 
     
    }
}

export default ItemForm;