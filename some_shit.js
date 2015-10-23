console.log('WTF');

var HolaMundo = React.createClass({
    render: function(){
        return <div> Hola Mundo </div>;
    }
});

ReactDOM.render(
  <HolaMundo />,
  $('#div-app')[0]
);


console.log('WTF');