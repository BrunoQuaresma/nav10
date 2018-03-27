class Exam extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentQuesitonIndex: 0,
      questionAnswers: {}
    }
  }

  render() {
    const currentQuestion = this.getCurrentQuestion();

    return (
      <div>
        <div className="exam-top">
          <div className="exam-top__scroll">
            {this.props.questions.map((question, index) => {
              const className = `
                ${index === this.state.currentQuesitonIndex ? 'active' : ''}
                ${this.isQuestionComplete(index) ? 'complete' : ''}
              `

              return (
                <button onClick={this.goToQuestion.bind(this, index)} className={className} key={index}>{index + 1}</button>
              )
            })}
          </div>
        </div>

        <div className="container py-5">
          <h3 className="mb-4">{currentQuestion.description}</h3>

          <div className="mb-3">
            {currentQuestion.exam_question_options.map((option, index) => (
              <div
                className={this.getOptionClassName(index)}
                key={index}
                onClick={this.answerCurrentQuestion.bind(this, index)}
              >
                <div className="card-body">
                  {option.title}
                </div>
              </div>
            ))}
          </div>

          {this.renderDefaultActions()}
        </div>
      </div>
    )
  }

  answerCurrentQuestion(index) {
    const { currentQuesitonIndex, questionAnswers } = this.state

    this.setState({
      questionAnswers: {
        ...questionAnswers,
        [currentQuesitonIndex]: index
      }
    })
  }

  getOptionClassName(index) {
    const currentQuestionAnswer = this.getCurrentQuestionAnswer();
    const isOptionSelected = currentQuestionAnswer === index;

    return `
      card
      mb-2
      ${isOptionSelected ? 'bg-primary text-white' : ''}
    `
  }

  getCurrentQuestion() {
    return this.props.questions[this.state.currentQuesitonIndex];
  }

  isLastQuestion() {
    const totalQuestionsCount = this.props.questions.length;
    const lastQuestionsIndex = totalQuestionsCount - 1;

    return this.state.currentQuesitonIndex === lastQuestionsIndex;
  }

  isFirstQuestion() {
    return this.state.currentQuesitonIndex === 0;
  }

  getCurrentQuestionAnswer() {
    const { questionAnswers, currentQuesitonIndex } = this.state;

    return questionAnswers[currentQuesitonIndex];
  }

  isQuestionComplete(index) {
    const { questionAnswers } = this.state;

    return questionAnswers[index] !== undefined;
  }

  renderDefaultActions() {
    const currentQuestionAnswer = this.getCurrentQuestionAnswer()
    const isAnswer = currentQuestionAnswer !== undefined
    const isLastQuestion = this.isLastQuestion()
    const isFirstQuestion = this.isFirstQuestion()

    return (
      <div>
        {isLastQuestion && isAnswer && <button className="btn btn-block btn-lg btn-primary">Responder e finalizar</button>}
        {isAnswer && !isLastQuestion && <button onClick={this.goToNextQuestion.bind(this)} className="btn btn-block btn-lg btn-primary">Ir para próxima</button>}
        {!isFirstQuestion && <button onClick={this.goToPreviousQuestion.bind(this)} className="btn btn-block btn-lg btn-light">Voltar</button>}
        {!isAnswer && !isLastQuestion && <button onClick={this.jumpQuestion.bind(this)} className="btn btn-block btn-lg btn-light">Pular questão</button>}
        {isLastQuestion && !isAnswer && <button className="btn btn-block btn-lg btn-secondary">Finalizar</button>}
      </div>
    )
  }

  jumpQuestion() {
    this.goToNextQuestion();
  }

  goToNextQuestion() {
    this.setState({
      currentQuesitonIndex: this.state.currentQuesitonIndex + 1
    })
  }

  goToPreviousQuestion() {
    this.setState({
      currentQuesitonIndex: this.state.currentQuesitonIndex - 1
    })
  }

  goToQuestion(index) {
    this.setState({
      currentQuesitonIndex: index
    })
  }

}
