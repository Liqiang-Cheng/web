var CredentialBox = React.createClass({
    handleSubmit: function() {
        var userName = React.findDOMNode(this.refs.userName).value.trim();
        var password = React.findDOMNode(this.refs.password).value.trim();
        if (!userName || !password) {
            return;
        }
        var user = {userName: userName, password: password};
        this.props.onSubmit(JSON.stringify(user));
        React.findDOMNode(this.refs.userName).value="";
        React.findDOMNode(this.refs.password).value="";
        return;
    },
    render: function() {
        return (
            <div>
                <span>UserName: </span>
                <input type="text" placeholder="User name" ref="userName"/>
                <br/>
                <span>Password: </span>
                <input type="password" ref="password"/>
                <br/>
                <input type="button" value={this.props.type} onClick={this.handleSubmit}/>
            </div>
        );
    }
});

var Login = React.createClass({
    getUrl: function() {
        return '/loginUser';
    },
    getInitialState: function() {
        return {data: []};
    },
    login: function(user) {
        $.ajax({
          url: this.getUrl(),
          contentType: 'application/json',
          type: 'POST',
          data: user,
          success: function(data) {
            this.setState({data: data});
            console.log(data);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.getUrl(), status, err.toString());
          }.bind(this)
        });
    },
    render: function(){
        return(
            <div>
                <h2>Login</h2>
                <CredentialBox type="login" onSubmit={this.login} />
            </div>
        );
    }
});

var CreateUser = React.createClass({
    getUrl: function() {
        return '/createUser';
    },
    getInitialState: function() {
        return {data: []};
    },
    createUser: function(user) {
        $.ajax({
          url: this.getUrl(),
          contentType: 'application/json',
          type: 'POST',
          data: user,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.getUrl, status, err.toString());
          }.bind(this)
        });
    },
    render: function(){
        return(
            <div>
                <h2>Create</h2>
                <CredentialBox type="Create" onSubmit={this.createUser} />
            </div>
        );
    }
});

React.render(
    <div>
        <Login/>
        <CreateUser/>
    </div>,
    document.getElementById('credential')
);