class QuestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      headline: props.question.description
    }
  }

  render() {
    const { question } = this.props

    if(question.destroy) {
      return question.isNew
                ? <div />
                :  (
                  <div>
                    <input
                      type="hidden"
                      name={`exam[exam_questions_attributes][${question.id}][id]`}
                      value={question.id}
                    />

                    <input
                      type="hidden"
                      name={`exam[exam_questions_attributes][${question.id}][_destroy]`}
                      value={question.id}
                    />
                  </div>
                )
    }

    return(
      <div className={`card mb-1`}>
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col text-ellipsis">
              <span className="card-title">
                {this.state.headline}
              </span>
            </div>

            <div className="col-auto">
              <button type="button" className="btn btn-link" onClick={this.handleToggleClick.bind(this)}>
                {question.open ? 'Esconder' : 'Exibir'}
              </button>

              <button type="button" className="btn btn-link" onClick={this.handleRemoveClick.bind(this)}>Remover</button>
            </div>
          </div>
        </div>

        {question.open && this.renderBody()}
      </div>
    )
  }

  renderBody() {
    const { question } = this.props

    return (
      <div className="card-body">
        {
          !question.isNew && (
            <input
              type="hidden"
              name={`exam[exam_questions_attributes][${question.id}][id]`}
              value={question.id}
            />
          )
        }

        <div className="form-group">
          <label className="required" htmlFor="">Enunciado</label>
          <textarea
            onChange={this.updateHeadline.bind(this)}
            defaultValue={question.description}
            className="form-control"
            name={`exam[exam_questions_attributes][${question.id}][description]`}
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label className="required" htmlFor="">Respostas</label>

          {question.exam_question_options.map((option, index) => (
            <div key={option.id}>
              {
                !question.isNew && (
                  <input
                    type="hidden"
                    name={`exam[exam_questions_attributes][${question.id}][exam_question_options_attributes][${option.id}][id]`}
                    value={option.id}
                  />
                )
              }

              <div className="div d-flex align-items-center">
                <div className="pr-2">
                  <input
                    type="radio"
                    name={`exam[exam_questions_attributes][${question.id}][right_option_index]`}
                    value={index}
                    defaultChecked={question.right_option_index === index}
                  />
                </div>

                <input
                  required
                  name={`exam[exam_questions_attributes][${question.id}][exam_question_options_attributes][${option.id}][title]`}
                  type="text"
                  className="form-control mb-1"
                  placeholder={`Resposta ${index + 1}`}
                  defaultValue={option.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  handleRemoveClick() {
    const confirmRemove = confirm('Você realmente deseja deletar esta questão?')

    if(confirmRemove) {
      const { onRemove, question } = this.props

      onRemove(question.id)
    }
  }

  handleToggleClick() {
    const { onToggle, question } = this.props

    onToggle(question.id)
  }

  updateHeadline(event) {
    this.setState({ headline: event.target.value })
  }
}
