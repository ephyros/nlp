class RecogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '0',
      text: " Dear Dr. Ronald, "+

      "I look forward to meeting you on Thursday, May 23, to further discuss the business incubation programme that was designed by the World Bank. Thursday evening is a good time for me." +

      " Two of my associates, Jay Abraham and Robert Kiyosaki, are planning to meet with you in Liverpool as well. We are very excited to be a part of this project, especially being in the same team with you. " +

      " Cheers, Kara Brandan. ",
      result: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleActionChange = this.handleActionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(event) {
    this.setState({text: event.target.value});
  }

  handleActionChange(event) {
    this.setState({action: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
     let compromise = nlp(this.state.text);
      // .nouns().toSingular();
    let result = '';
    switch(this.state.action) {
      case '0': {
        result = compromise.dates();
        break;
      }
     case '1': {
       result = compromise.people();
       break;
     }
     case '2': {
        result = compromise.places();
        break;
      }
    }
    console.log(result);
    let text = result.out('text');
      // .dates(),
      // .sentences().toNegative();
      // .match('#Person');
      // .people(),
    this.setState({result: text});

    // alert(this.state.result);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
        <fieldset className="form-group"  onChange={this.handleActionChange}>
          <p>{ this.state.result }</p>
          <legend>Action</legend>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="action" id="optionsRadios1" value="0" defaultChecked/>
               Find dates
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="action" id="optionsRadios2" value="1"/>
              Find people
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="action" id="optionsRadios3" value="2"/>
              Find places
            </label>
          </div>
        </fieldset>

          <div className="form-group">
            <textarea className="form-control" rows="20" value={this.state.text} onChange={this.handleTextChange} />
          </div>
        <input type="submit"  className="btn btn-primary" value="Submit" />
        </div>
      </form>
    );
  }
}

ReactDOM.render(
  <RecogForm />,
  document.getElementById('root')
);
