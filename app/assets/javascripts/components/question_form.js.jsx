class QuestionForm extends React.Component {
  render() {
    const { question } = this.props

    return(
      <div className="card mb-1">
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
    return (
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="">Enunciado</label>
          <textarea className="form-control" name="" id="" rows="3"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="">Respostas</label>
          <input type="text" className="form-control mb-1" placeholder="Resposta 1" />
          <input type="text" className="form-control mb-1" placeholder="Resposta 2" />
          <input type="text" className="form-control mb-1" placeholder="Resposta 3" />
          <input type="text" className="form-control mb-1" placeholder="Resposta 4" />
          <input type="text" className="form-control mb-1" placeholder="Resposta 5" />
        </div>

        <div className="form-group">
          <label htmlFor="">Resposta correta</label>

          <select name="" id="" className="form-control">
            <option value="">Resposta 1</option>
            <option value="">Resposta 2</option>
            <option value="">Resposta 3</option>
            <option value="">Resposta 4</option>
            <option value="">Resposta 5</option>
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
