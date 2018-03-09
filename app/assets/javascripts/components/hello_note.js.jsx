class HelloNote extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    this.createNewQuestion()
  }

  createNewQuestion(event) {
    if(event) {
      event.preventDefault();
    }

    const currentQuestions = this.state.questions
    const newQuestion = {
      id: Math.floor((Math.random() * 100000) + 1),
      open: true
    }

    this.setState({ questions: currentQuestions.concat(newQuestion)})
  }

  removeQuestion(questionId) {
    const currentQuestions = this.state.questions

    this.setState({
      questions: currentQuestions.filter(question => question.id !== questionId)
    })
  }

  toggleQuestion(questionId) {
    const currentQuestions = this.state.questions

    this.setState({
      questions: currentQuestions.map(question => {
        if(question.id === questionId) {
          return { ...question, open: !question.open }
        }

        return question
      })
    })
  }

  render() {
    return(
      <div>
        {this.state.questions.map(question => (
          <QuestionForm
            question={question}
            onRemove={this.removeQuestion.bind(this)}
            onToggle={this.toggleQuestion.bind(this)}
            key={question.id}
          />
        ))}

        <div className="form-group mt-3">
          <button
            onClick={this.createNewQuestion.bind(this)}
            className="btn btn-light mr-2"
          >
            Adicionar questão
          </button>

          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </div>
      </div>
    )
  }
}
