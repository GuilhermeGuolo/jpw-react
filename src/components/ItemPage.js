import React from 'react'
import axios from 'axios'
import ItemItem from './ItemItem'
import ItemForm from './ItemForm'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import 'typeface-roboto';

class ItemPage extends React.Component {

    constructor(props) {
        super(props)
        this.BASE_URL = "http://localhost:4000/itens"
        this.state = { itens: [], init: 0, selectedItem: undefined }
        //this.loadItens();

    }

    async componentDidMount() {
        await axios.get(this.BASE_URL).then((response) => {

            this.setState({ itens: response.data, init: 1 })



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

    selectedItem = (item) => {
        if (this.state.selectedItem) {
            var item = this.state.selectedItem._id == item._id ? undefined : item
        }

        this.setState({ selectedItem: item })
    }

    handleUpdate = (id, data) => {
        console.log(data)
        axios.put(this.BASE_URL + "/id?id=" + id, data).then(() => {
            this.componentDidMount()
            alert("Item:" + data.nome + " atualizado com sucesso!")
        }).catch((error) => {
            alert("Atualização falhou. Código de erro:" + error.request.status)
        })
    }

    handleInsert = (data) => {
        console.log(data)
        axios.post(this.BASE_URL, data).then((response) => {
              alert("Item:" + data.nome + " inserido com sucesso!")
            this.componentDidMount()
            

        }).catch((error) => {
            alert("Inserção falhou. Código de erro:" + error.request.status)
        })
    }

    handleDelete = (id) => {
        console.log(id)
        axios.delete(this.BASE_URL + "/id?id=" + id).then(() => {
            this.componentDidMount()
            alert("Item excluído com sucesso!")
        }).catch((error) => {
            alert("Deleção falhou. Código de erro:" + error.request.status)
        })
        this.setState({ selectedItem: undefined })
    }

    render() {

        /* if (this.state.selectedItem) {
             var editLabel = <div>Editando {this.state.selectedItem.nome}</div>
         } else {
             var editLabel = "Inserindo"
         }*/

        var itemList = this.state.itens.map((value) => {
            return <ItemItem
                key={value._id}
                value={value}
                handleDelete={(id) => this.handleDelete(id)}
                handleSelect={(id) => this.selectedItem(id)}
            />
        })

        let { nome, peso, raridade, _id } = this.state.selectedItem ? this.state.selectedItem : ""

        var itemForm = <ItemForm
            handleAction={(data) => this.handleAction(data)}
            key={_id}
            nome={nome}
            peso={peso}
            raridade={raridade}
        />

        return <div>

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {itemForm}
            </Grid>

            <List subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Itens
                    </ListSubheader>
            }
            >
                {itemList}
            </List>

        </div>
    }
}

export default ItemPage;