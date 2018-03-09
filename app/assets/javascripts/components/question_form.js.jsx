class QuestionForm extends React.Component {
  render() {
    const { question } = this.props

    return(
      <div className={`card mb-1`}>
        <div className="card-header text-right">
          <button className="btn btn-link" onClick={this.handleToggleClick.bind(this)}>
            {question.open ? 'Esconder' : 'Exibir'}
          </button>

          <button className="btn btn-link" onClick={this.handleRemoveClick.bind(this)}>Remover</button>
        </div>

        {question.open && this.renderBody()}
      </div>
    )
  }

  renderBody() {
    const { question } = this.props

    return (
      <div className="card-body">
        <div className="form-group">
          <label className="required" htmlFor="">Enunciado</label>
          <textarea
            className="form-control"
            name={`exam[exam_questions_attributes][${question.id}][description]`}
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label className="required" htmlFor="">Respostas</label>

          <input required name={`exam[exam_questions_attributes][${question.id}][exam_question_options_attributes][1][title]`} type="text" className="form-control mb-1" placeholder="Resposta 1" />
          <input required name={`exam[exam_questions_attributes][${question.id}][exam_question_options_attributes][2][title]`} type="text" className="form-control mb-1" placeholder="Resposta 2" />
          <input required name={`exam[exam_questions_attributes][${question.id}][exam_question_options_attributes][3][title]`} type="text" className="form-control mb-1" placeholder="Resposta 3" />
          <input required name={`exam[exam_questions_attributes][${question.id}][exam_question_options_attributes][4][title]`} type="text" className="form-control mb-1" placeholder="Resposta 4" />
          <input required name={`exam[exam_questions_attributes][${question.id}][exam_question_options_attributes][5][title]`} type="text" className="form-control mb-1" placeholder="Resposta 5" />
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
}
