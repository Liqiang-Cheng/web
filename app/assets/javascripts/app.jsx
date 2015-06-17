var CommentForm = React.createClass({
  handleSubmit: function() {
    var author = React.findDOMNode(this.refs.author).value.trim();
    if (! author) {
      return;
    }
    this.props.onCommentSubmit(JSON.stringify({message:author}));
    React.findDOMNode(this.refs.author).value="";
    return;
  },
  render: function() {
    return (
        <div>
          <input type="text" placeholder="Your name" ref="author"/>
          <br/>
          <input type="button" value="Post" onClick={this.handleSubmit}/>
        </div>
    );
  }
});

var CommentBox = React.createClass({
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.urlPost,
      contentType: 'application/json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urlPost, status, err.toString());
      }.bind(this)
    });
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.urlGet,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urlGet, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  render: function() {
    return (
      <div>
        <h1>Comments</h1>
        <Comment author={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function () {
    return (
        <div>
          <h2>
            {this.props.author}
          </h2>
          {this.props.children}
        </div>
      );
  }
});

React.render(
  <CommentBox urlGet="/hello" urlPost="/helloback"/>,
  document.getElementById('content')
);