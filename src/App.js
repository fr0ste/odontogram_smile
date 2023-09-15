import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar } from '@mui/material';
import { Tab, Tabs, Typography } from '@mui/material';

import Store from './Store/Store'
import Header from './components/Header'
import Tooth from './components/Tooth'
import Toolbar from './components/Toolbar'


import './App.css';


const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});




class App extends Component {
  constructor(props){
    super(props)

    this.state = Store
    this.state.value = 0
  }

  //Muda as abas
  handleChange = (event, value) => {
    this.setState({ value });
  };

  //Muda acao dos de pintura 
  handleAction = (cor, nome) => {
      this.setState({marked: {selecionado: nome, cor}})
  }
  //Toogle - adiciona e remove dente
  toggleTooth = (data) => {
    if(data.status){
      data.status = false
      this.setState({data})
    } else {
      data.status = true
      this.setState({data})
    }
  }
  //Pinta face
  setFace = (face, index, data) => {
    const acao = this.state.marked.cor
    if(acao === data.faces[index].estado){
      data.faces[index].estado = 'white'
    } else {
      data.faces[index].estado = acao
    }
    this.setState({data})
  }

  render() {

    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="container">
        
        <Header />
        <main>
          <div className={classes.root}>

            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Adulto" />
                <Tab label="Infantil" />
              </Tabs>
            </AppBar>

            {value === 0 && 
              <TabContainer>
                {this.state.arcada.adulto.map((item, index) => {
                  return <Tooth 
                            key={item.id}
                            index={index}
                            data={item} 
                            toggleTooth={this.toggleTooth}
                            setFace={this.setFace}
                          />
                })}
              </TabContainer>
            }

            {value === 1 && 
              <TabContainer>
                {this.state.arcada.infantil.map((item, index) => {
                  return <Tooth 
                            key={item.id}
                            index={index}
                            data={item}
                            toggleTooth={this.toggleTooth}
                            setFace={this.setFace}
                          />
                })}
              </TabContainer>
            }
          </div>

          <Toolbar toolbar={this.state.toolbar} handleAction={this.handleAction} cor={this.state.marked.cor}/>
        </main>
        
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
