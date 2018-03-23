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

  renderDefaultActions() {
    const currentQuestionAnswer = this.getCurrentQuestionAnswer()
    const isAnswer = currentQuestionAnswer !== undefined
    const isLastQuestion = this.isLastQuestion()
    const isFirstQuestion = this.isFirstQuestion()

    return (
      <div>
        {!isFirstQuestion && <button onClick={this.goToPreviousQuestion.bind(this)} className="btn btn-light">Voltar</button>}
        {!isAnswer && !isLastQuestion && <button onClick={this.jumpQuestion.bind(this)} className="btn btn-light">Pular questão</button>}
        {isAnswer && !isLastQuestion && <button onClick={this.goToNextQuestion.bind(this)} className="btn btn-primary">Ir para próxima</button>}
        {isLastQuestion && !isAnswer && <button className="btn btn-secondary">Finalizar</button>}
        {isLastQuestion && isAnswer && <button className="btn btn-primary">Responder e finalizar</button>}
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
}
