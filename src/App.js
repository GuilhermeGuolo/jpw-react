import React from 'react';
import logo from './logo.svg';
import './App.css';
import ItemPage from './components/ItemPage';
import BolsaPage from './components/BolsaPage';
import MapaPage from './components/MapaPage';
import PersonagemPage from './components/PersonagemPage';
import InventarioPage from './components/InventarioPage';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
        <Route path="/itens"
                  render={() => <ItemPage/>}
        />
       <Route path="/bolsas"
                  render={() => <BolsaPage/>}
        />
        <Route path="/mapas"
                  render={() => <MapaPage/>}
        />
        <Route path="/personagens"
                  render={() => <PersonagemPage/>}
        />
        <Route path="/inventarios"
                  render={() => <InventarioPage/>}
        />
        </Switch>
      </BrowserRouter>
    </div>
    //<ItemPage/>
  );
}



export default App;
