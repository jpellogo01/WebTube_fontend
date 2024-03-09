import React, { Component } from 'react'
import axios from 'axios'
import UserService from '../services/UserService';
import { Redirect } from 'react-router-dom'; // Import Redirect from react-router-dom


class ListUserComponent extends Component {
    maskPassword(password) {
        return '*'.repeat(password.length); // Replace each character with an asterisk
    }

    

    constructor(props) {
        super(props)

        this.state = {
                users: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }
    viewUser(id){
        this.props.history.push(`/view-user/${id}`);
    }
    editUser(id){
        this.props.history.push(`/add-user/${id}`);
    }
    addUser(){
        console.log("Add User button clicked"); // Add this line to log a message when the button is clicked

        this.props.history.push('/add-user/_add');
    }
   


    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:8080/api/v1/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            this.setState({ users: response.data });
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error
        }
    

    }

    logout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        localStorage.removeItem('role'); // Remove the role from local storage
        // Redirect to the login page or any other appropriate page
        this.props.history.push('/login'); // Assuming '/login' is the route for your login page
    };
    cms = () =>{
        console.log("Add User button clicked"); // Add this line to log a message when the button is clicked

        this.props.history.push('/news');
    };
    

    render() {
        const role = localStorage.getItem('role'); // Retrieve the user's role from local storage
        if (role !== "ADMIN") {
            // Redirect the user to another page if they are not an admin
            return <Redirect to="/unauthorized" />;
            // Alternatively, you can render a message indicating they don't have access
            // return <div>You don't have access to this page.</div>;
        }
        return (
          <div>
            <header className="header">
                <div>WEBTUBE USER MANAGEMENT</div> 
                    <button className="logout-button" onClick={this.cms}>CMS</button>
                    <button onClick={this.logout} className="logout-button">Logout </button>  
            </header>
                <div className="body">
                    <button className="bntAction" onClick={this.addUser}> Add User</button>
                    <br></br>
                    <div className="row scrollable-div"> {/* Add a container div with the scrollable-div class */}
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Full Name</th>
                                    <th> Username</th>
                                    <th> Password</th>
                                    <th> User Role</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>         
                                {Array.isArray(this.state.users) && this.state.users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.fullName}</td>
                                        <td>{user.username}</td>
                                        <td>{this.maskPassword(user.password)}</td> {/* Change maskPassword to this.maskPassword */}
                                        <td>{user.role}</td>
                                        <td>
                                            <button onClick={() => this.editUser(user.id)} className="bntAction">Update</button>
                                            <button style={{ marginLeft: "10px" }}  onClick={() => 
                                                {  if (window.confirm("Are you sure you want to delete this user?")) 
                                                {this.deleteUser(user.id); } }}  className="bntAction" id ="btnDel">Delete
                                            </button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => this.viewUser(user.id)} className="bntAction" >View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            <footer className="footer">
                <span className="">"Stay Connected with WebTube for the Latest Updates from De La Salle Araneta University!"</span>
                <br></br>
                <span className="">All Rights Reserved 2024 @JOHN PAUL PELLOGO</span>
            </footer>
</div>

        )
    }
}

export default ListUserComponent

