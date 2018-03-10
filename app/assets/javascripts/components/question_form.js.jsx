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
      {
        return question.new
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
    }

    return(
      <div className={`card mb-1`}>
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col">
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

              <input
                required
                name={`exam[exam_questions_attributes][${question.id}][exam_question_options_attributes][${option.id}][title]`}
                type="text"
                className="form-control mb-1"
                placeholder={`Resposta ${index + 1}`}
                defaultValue={option.title}
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label className="required" htmlFor="">Resposta correta</label>

          <select required name={`exam[exam_questions_attributes][${question.id}][correct_option_index]`} className="form-control">
            <option value="1">Resposta 1</option>
            <option value="2">Resposta 2</option>
            <option value="3">Resposta 3</option>
            <option value="4">Resposta 4</option>
            <option value="5">Resposta 5</option>
          </select>
        </div>
      </div>
    )
  }

  handleRemoveClick() {
    const { onRemove, question } = this.props

    onRemove(question.id)
  }

  handleToggleClick() {
    const { onToggle, question } = this.props

    onToggle(question.id)
  }

  updateHeadline(event) {
    this.setState({ headline: event.target.value })
  }
}
