import React from 'react';
// import logo from './logo.svg';
import axios from 'axios'
import AnimatedTitle from './AnimatedTitle'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStupid: false,
      spinner: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sentence = React.createRef();
  }

  buildNewSentence = async (original, long) => {
    if (long.length === 0) return ''
    let newWords = original
    let limit = long.length < 6 ? long.length : 3
    this.setState({spinner: true})
    for (let i = 0; i < limit; i++) {
      await axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + long[i], {
        headers: {
          Accept: "application/json"
        },
        params: {
          key: 'fca6f403-e9b1-442c-82b0-f861e7b7a3d2'
        }
      }).then((response) => {
        try {
          if (response.data && response.data.length > 0) {
            let index = newWords.indexOf(long[i])
            newWords[index] = response.data[0].meta.syns[0].sort(function (a, b) { return b.length - a.length; })[0]
          }
        } catch (e) { console.log('weird words') }
      })
    }
    this.setState({
      newSentence: newWords.join(' '),
      spinner: false
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({newSentence: ''})
    if (this.state.isStupid) {
      this.setState({isStupid: false})
      return
    }
    let sentence = this.sentence.current.value.split(" ")
    let longWords = sentence.filter(val => {
      return val.length > 3
    })
    if (longWords.length === 0) {
      this.setState({isStupid: true})
    } else {
      this.buildNewSentence(sentence, longWords)
    }
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <header className="App-header">
            <AnimatedTitle></AnimatedTitle>
          </header>
          <div className="box">
            <form onSubmit={this.handleSubmit}>
              <p>Enter a sentence to make it sound more impressive.</p>
              <input
                autoComplete="off"
                className={this.state.spinner ? 'spin' : ''}
                placeholder="Why am I so lonely..."
                maxLength="100"
                type="text"
                name="sentence"
                ref={this.sentence}/>
            </form>
          </div>
          <div className="result">
            {this.state.newSentence && (<div><h4>Why don't you try saying this instead:</h4><p>"{this.state.newSentence}"</p></div>)}
            {this.state.isStupid ? <p>Use longer words stupid.</p> : <></>}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
