import React, { Component } from 'react'
import axios from 'axios'
import UserDetails from './UserDetails'
import { Button, Card, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class UserList extends Component {
    // state for the component 
    state = {
        info: [],
        persona: []
    }
    // Lifecycle of the commponent 
    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=10`)
        .then(res => {
            const info = res.data.info; 
            const persona = res.data.results;
            this.setState({info: info, persona: persona});
        })
        .catch(error => console.log(error))
    }
    // axios looking for users and filtering out some of the users 
    getUser = (email) => {
        axios.get(`https://randomuser.me/api/?seed=${this.state.info.seed}&results=10`)
        .then(res => {
            let sPersona = res.data.results; // saving results of data use console.log(sPersona)
            let newList = sPersona.filter(u => {
                return u.email === email
            })
            this.setState({persona: newList})
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign:'center', backgroundColor:'#1A7307'}}>User List</h1>
                {
                    // User card detail input 
                    this.state.persona.map(u => (
                        <>
                        <div style={{backgroundColor:'#0092B3', margin:'20px'}}>
                            <p style={{clear:'both'}}></p>
                            <p style={{backgroundColor:'#007F9C', fontWeight:'bold'}}>{u.name.title} {u.name.first} {u.name.last} - {u.login.uuid}</p>
                            <div>
                                <Card style={{backgroundColor:'#0092B3', width:'10rem', display:'table', float:'left', border:"none", marginLeft:'20px'}}>
                                <Image src={u.picture.large} roundedCircle></Image>
                                <Button style={{marginLeft:'1.5rem', marginTop:'1rem'}} onClick={() => this.getUser(u.email)}>Details</Button>
                                </Card>
                            </div>
                            <UserDetails person={u}/>
                            <p style={{clear:'both'}}></p>
                        </div>
                        </>
                    ))
                }
            </div>
        )
    }
}
