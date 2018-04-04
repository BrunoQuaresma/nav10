class Exam extends React.Component {
  constructor(props) {
    super(props)

    this.logs = []

    this.state = {
      wasStarted: false,
      currentQuesitonIndex: 0,
      questionAnswers: {},
      finishLoading: false,
      finished: false,
      screen: 'all'
    }
  }

  render() {
    const currentQuestion = this.getCurrentQuestion();

    if(this.state.finishLoading) {
      return (
        <div className="container text-center py-5">
          <h1>Enviando dados...</h1>
        </div>
      )
    }

    if(this.state.finished) {
      return (
        <div className="container text-center py-5">
          <h1 className="mb-4">Você finalizou o simulado!</h1>

          <a href="/panel/exam_applications" className="btn btn-primary btn-lg btn-block">
            Ir para página inicial
          </a>
        </div>
      )
    }

    if(!this.state.wasStarted) {
      return (
        <div className="container text-center py-5">
          <h1>Aviso!</h1>
          <p className="lead mb-5">
            Após o início do exame ele não poderá ser interrompido até sua finalização
            ou limite de tempo.
          </p>
          <a href="/panel/exam_applications" className="btn btn-light btn-lg btn-block">Voltar</a>
          <button onClick={this.start.bind(this)} className="btn btn-primary btn-lg btn-block">Ok, começar agora</button>
        </div>
      )
    }

    if(this.state.screen === 'all') {
      return (
        <div className="container py-3">
          <div className="row mb-5">
            {this.questions().map((question, index) => (
              <div className="col-4" key={index}>
                <div className={`card mb-3 ${this.isAnswer(index) ? 'bg-primary text-white' : ''}`} onClick={this.goToQuestion.bind(this, index)}>
                  <div className="p-3 text-center">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={this.finish.bind(this)} className="btn btn-lg btn-primary btn-block">
            Enviar gabarito
          </button>
        </div>
      )
    }

    return this.renderCurrentQuestion()
  }

  renderCurrentQuestion() {
    const currentQuestion = this.getCurrentQuestion()

    this.log({
      event: 'see',
      subject: 'question',
      subject_id: currentQuestion.id
    })

    return (
      <div className="container py-3">
        <div className="mb-3">
          <h3 className="mb-3">Questão #{this.state.currentQuesitonIndex + 1}</h3>
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

  questions() {
    return this.props.exam_application
                     .exam
                     .exam_questions
  }

  start() {
    this.log({
      event: 'start',
      subject: 'exam',
      subject_id: this.questions()[0].exam_id
    })

    this.setState({
      wasStarted: true
    })
  }

  answerCurrentQuestion(index) {
    const { currentQuesitonIndex, questionAnswers } = this.state

    this.log({
      event: 'select',
      subject: 'option',
      subject_id: `${this.getCurrentQuestion().id}_${index}`
    })

    this.setState({
      questionAnswers: {
        ...questionAnswers,
        [currentQuesitonIndex]: index
      }
    })
  }

  isAnswer(questionIndex) {
    return this.state.questionAnswers[questionIndex] !== undefined
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
    return this.questions()[this.state.currentQuesitonIndex];
  }

  isLastQuestion() {
    const totalQuestionsCount = this.questions().length;
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
        {!isAnswer && <button className="btn btn-block btn-lg btn-light" onClick={this.showAll.bind(this)}>Voltar</button>}
        {isAnswer && <button onClick={this.showAll.bind(this)} className="btn btn-block btn-lg btn-primary">Marcar questão</button>}
      </div>
    )
  }

  showAll() {
    this.log({
      event: 'see',
      subject: 'all'
    })

    this.setState({
      screen: 'all'
    })
  }

  finish() {
    if(!confirm('Você deseja entregar o gabarito?')) {
      return;
    }

    const { id } = this.props.exam_application

    this.setState({ finishLoading: true })
    this.log({ event: 'finish' })

    const requestUrl = `/panel/exam_applications/${id}/user_answers.json`;

    $.post(requestUrl, {
      logs: this.logs,
      answers: this.state.questionAnswers
    })
    .always(() => {
      this.setState({
        finishLoading: false,
        finished: true
      })
    })
  }

  log(log) {
    log.time = new Date();

    this.logs.push(log);
  }

  jumpQuestion() {
    this.log({
      event: 'jump',
      subject: 'question',
      subject_id: this.getCurrentQuestion().id
    })

    this.goToNextQuestion();
  }

  goToNextQuestion() {
    this.log({
      event: 'go_to_next',
      subject: 'question',
      subject_id: this.getCurrentQuestion().id
    })

    this.setState({
      currentQuesitonIndex: this.state.currentQuesitonIndex + 1
    })
  }

  goToPreviousQuestion() {
    this.log({
      event: 'go_to_previous',
      subject: 'question',
      subject_id: this.getCurrentQuestion().id
    })

    this.setState({
      currentQuesitonIndex: this.state.currentQuesitonIndex - 1
    })
  }

  goToQuestion(index) {
    this.log({
      event: 'go_to',
      subject: 'question',
      subject_id: this.getCurrentQuestion().id
    })

    this.setState({
      currentQuesitonIndex: index,
      screen: 'question'
    })
  }
}
