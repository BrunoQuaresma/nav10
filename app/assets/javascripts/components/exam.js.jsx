class Exam extends React.Component {
  constructor(props) {
    super(props)

    this.history = [];

    this.state = {
      wasStarted: false,
      currentQuesitonIndex: 0,
      questionAnswers: {},
      finishLoading: false,
      finished: false
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

          <a href="/panel/student_exams/" className="btn btn-primary btn-lg btn-block">
            Ir para página inicial
          </a>
        </div>
      )
    }

    if(!this.state.wasStarted) {
      return (
        <div className="container text-center py-5">
          <h1>Aviso!</h1>
          <p className="lead">
            Após o início do exame ele não poderá ser interrompido até sua finalização
            ou limite de tempo.
          </p>
          <a href="/panel/student_exams/" className="btn btn-light btn-lg btn-block">Voltar</a>
          <button onClick={this.start.bind(this)} className="btn btn-primary btn-lg btn-block">Ok, começar agora</button>
        </div>
      )
    }

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

        {this.renderQuestion(currentQuestion)}
      </div>
    )
  }

  renderQuestion(currentQuestion) {
    this.history.push({
      event: 'see',
      subject: 'question',
      subject_id: currentQuestion.id
    })

    return (
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
    )
  }

  start() {
    this.history.push({
      event: 'start',
      subject: 'exam',
      subject_id: this.props.questions[0].exam_id
    })

    this.setState({
      wasStarted: true
    })
  }

  answerCurrentQuestion(index) {
    const { currentQuesitonIndex, questionAnswers } = this.state

    this.history.push({
      event: 'select',
      subject: 'question',
      subject_id: this.getCurrentQuestion().id
    })

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
        {isLastQuestion && isAnswer && <button className="btn btn-block btn-lg btn-primary" onClick={this.finish.bind(this)}>Finalizar</button>}
        {isAnswer && !isLastQuestion && <button onClick={this.goToNextQuestion.bind(this)} className="btn btn-block btn-lg btn-primary">Ir para próxima</button>}
        {!isFirstQuestion && <button onClick={this.goToPreviousQuestion.bind(this)} className="btn btn-block btn-lg btn-light">Voltar</button>}
        {!isAnswer && !isLastQuestion && <button onClick={this.jumpQuestion.bind(this)} className="btn btn-block btn-lg btn-light">Pular questão</button>}
        {isLastQuestion && !isAnswer && <button className="btn btn-block btn-lg btn-secondary" onClick={this.finish.bind(this)}>Finalizar</button>}
      </div>
    )
  }

  finish() {
    this.history.push({
      event: 'finish',
      subject: 'exam',
      subject_id: this.props.questions[0].exam_id
    })

    this.setState({
      finishLoading: true
    })

    this.sendHistory();
  }

  sendHistory() {
    const url = '/panel/student_exams/' + this.props.questions[0].exam_id + '/history';

    $.post(url, { histories: this.history })
      .then(() => this.setState({ finishLoading: false, finished: true }));
  }

  jumpQuestion() {
    this.history.push({
      event: 'jump',
      subject: 'question',
      subject_id: this.getCurrentQuestion().id
    })

    this.goToNextQuestion();
  }

  goToNextQuestion() {
    this.history.push({
      event: 'go_to_next',
      subject: 'question',
      subject_id: this.getCurrentQuestion().id
    })

    this.setState({
      currentQuesitonIndex: this.state.currentQuesitonIndex + 1
    })
  }

  goToPreviousQuestion() {
    this.history.push({
      event: 'go_to_previous',
      subject: 'question',
      subject_id: this.getCurrentQuestion().id
    })

    this.setState({
      currentQuesitonIndex: this.state.currentQuesitonIndex - 1
    })
  }

  goToQuestion(index) {
    this.history.push({
      event: 'go_to',
      subject: 'question',
      subject_id: this.getCurrentQuestion().id
    })

    this.setState({
      currentQuesitonIndex: index
    })
  }
}
