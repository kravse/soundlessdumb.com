import React from 'react';
import AnimatedTitle from './AnimatedTitle';
import pronouns from './pronouns';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStupid: false,
      spinner: false,
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sentence = React.createRef();
  }

  thesaurus = (word) => {
    let letter = word.charAt(0);
    return import('./data/' + letter).then(module => {
      return module.default()[word];
    });
  }

  buildNewSentence = async (original, longWords) => {
    if (longWords.length === 0) {
      this.setState({isStupid: true});
      return;
    }
    let newWords = original
    let limit = longWords.length < 6 ? longWords.length : 3
    this.setState({
      spinner: true,
      error: ''
    })
    for (let i = 0; i < limit; i++) {
      let index = newWords.indexOf(longWords[i]);
      let newWord = await this.thesaurus(longWords[i]);

      if (newWord) {
        newWords[index] = newWord;
      } else if (longWords[i].endsWith('s')) {
        newWord = await this.thesaurus(longWords[i].slice(0, -1));
        if (newWord) {
          newWords[index] = newWord + 's';
        }
      }
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
    }
    let sentence = this.sentence.current.value.toLowerCase().split(" ")
    let longWords = sentence.filter(val => {
      return val.length > 3 && pronouns.indexOf(val) === -1
    })
    this.buildNewSentence(sentence, longWords)
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
              {this.state.error && <p class="error">{this.state.error}</p>}
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
            {this.state.newSentence && (<div><h4>Why don't you try saying this instead:</h4><p className="result-sentence">{this.state.newSentence}.</p></div>)}
            {this.state.isStupid ? <p>This sentence is so beyond helping</p> : <></>}
          </div>
        </div>
        <div class="contact">
          <p>A project by <a href="https://twitter.com/kravse">@kravse</a></p>
        </div>
      </div>
    )
  }
}

export default App;
