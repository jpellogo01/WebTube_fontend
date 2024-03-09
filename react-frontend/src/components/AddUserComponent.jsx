import React, { Component } from 'react'
import UserService from '../services/UserService';

class AddUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            fullName: '',
            username: '',
            password: '',
            role: ''
        }
        this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeRoleHandler = this.changeRoleHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            UserService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({fullName: user.fullName,
                    username: user.username,
                    password: user.password,
                    role: user.role
                });
            });
        }        
    }

    
    saveOrUpdateUser = (e) => {
        e.preventDefault();
        let user = {fullName: this.state.fullName, username: this.state.username, password: this.state.password, role: this.state.role};
        console.log('user => ' + JSON.stringify(user));

        // step 5
        if(this.state.id === '_add'){
            UserService.createUser(user).then(res =>{
                this.props.history.push('/users');
            });
        }else{
            UserService.updateUser(user, this.state.id).then( res => {
                this.props.history.push('/users');
            });
        }
    }
    
    changeFullNameHandler= (event) => {
        this.setState({fullName: event.target.value});
    }

    changeUsernameHandler= (event) => {
        this.setState({username: event.target.value});
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    changeRoleHandler= (event) => {
        this.setState({role: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add User</h3>
        }else{
            return <h3 className="text-center">Update User</h3>
        }
    }
    render() {
        return (
            <div>
                 <header className="header">
                <div>WEBTUBE USER MANAGEMENT</div>   
            </header>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 mt-5">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Full Name: </label>
                                            <input placeholder="Full Name" name="fullName" className="form-control" 
                                                value={this.state.fullName} onChange={this.changeFullNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Username: </label>
                                            <input placeholder="Username" name="username" className="form-control" 
                                                value={this.state.username} onChange={this.changeUsernameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Password </label>
                                            <input placeholder="Password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Role: </label>
                                            <input placeholder="Role : AUTHOR/ADMIN" name="role" className="form-control" 
                                                value={this.state.role} onChange={this.changeRoleHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default AddUserComponent
