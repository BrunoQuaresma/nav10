class Sections extends React.Component {
  constructor(props) {
    super(props)

    this.addNewSection = this.addNewSection.bind(this)

    this.state = {
      sections: []
    }
  }

  addNewSection(newSection) {
    $('#newSectionModal').modal('toggle')

    this.setState({
      sections: this.state.sections.concat(newSection)
    })  
  }

  removeSection(indexToRemove) {
    const { sections } = this.state
    const sectionToRemove = sections[indexToRemove]

    if (!confirm(`Você deseja apagar a seção ${sectionToRemove.name}`)) {
      return
    }

    this.setState({ 
      sections: sections.filter((section, index) => index !== indexToRemove)
    })
  }
 
  render() {
    const { sections } = this.state
    const sectionsAreEmpty = sections.length === 0

    return (
      <React.Fragment>
        <div className="mb-4">
          <div className="d-flex mb-2 align-items-center">
            <b className="text-muted">SEÇÕES</b>

            <div className="ml-auto">
              <button className="btn btn-sm btn-link" data-toggle="modal" data-target="#newSectionModal">
                <i className="fa fa-plus"></i> ADICIONAR
              </button>
            </div>
          </div>
          
          <hr className="mt-0"/>

          {
            sectionsAreEmpty
              ? this.renderEmptySections()
              : this.renderSections()
          }
        </div>
        
        <NewSectionModal onSubmit={this.addNewSection} />
      </React.Fragment>
    )
  }

  renderEmptySections() {
    return (
      <div className="card p-3 text-center">
        Você pode usar seções para dividir o seu simulado em matérias.
      </div>
    )
  }

  renderSections() {
    const { sections } = this.state
    const sortedSections = sections.sort((a, b) => a.start_at - b.start_at)

    return sortedSections.map((section, index) => (
      <div className="card p-3 mb-1" key={index}>
        <input
          type="hidden"
          name={`exam[exam_sections_attributes][${index}]['name']`}
          value={section.name}
        />

        <input
          type="hidden"
          name={`exam[exam_sections_attributes][${index}]['start_at']`}
          value={section.start_at}
        />

        <input
          type="hidden"
          name={`exam[exam_sections_attributes][${index}]['end_at']`}
          value={section.end_at}
        />

        <div className="row align-items-center">
          <div className="col-4">
            <b>{section.name}</b>
          </div>

          <div className="col-4">
            De {section.start_at} até {section.end_at}
          </div>

          <div className="col-4 text-right">
            <button
              onClick={this.removeSection.bind(this, index)}
              className="btn btn-sm btn-light"
            >
              <i className="fa fa-trash" />
            </button>
          </div>
        </div>
      </div>
    ))
  }
}

class NewSectionModal extends React.Component {
  constructor(props) {
    super(props)

    this.handleInputOnChange = this.handleInputOnChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      form: {
        name: '',
        start_at: '',
        end_at: ''
      }
    }
  }

  handleInputOnChange(event) {
    const { target } = event

    this.setState({
      form: {
        ...this.state.form,
        [target.name]: target.value
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.form)
    $('#newSectionForm')[0].reset()
  }

  render() {
    return (
      <div className="modal fade" id="newSectionModal" tabIndex="-1" role="dialog" aria-labelledby="newSectionModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form id="newSectionForm" onSubmit={this.handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="newSectionModalLabel">Nova seção</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              
              <div className="modal-body">                
                <div className="form-group">
                  <label htmlFor="">Nome da seção</label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Ex. Geografia"
                    className="form-control"
                    onChange={this.handleInputOnChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="">Questões da seção</label>
                  <div className="row align-items-center">
                    <div className="col">
                      <input
                        required
                        type="number"
                        name="start_at"
                        placeholder="1"
                        className="form-control"
                        min="0"
                        onChange={this.handleInputOnChange}
                      />
                    </div>

                    <div className="col-auto p-0">até</div>
                    
                    <div className="col">
                      <input
                        required
                        type="number"
                        name="end_at"
                        placeholder="20"
                        className="form-control"
                        min="0"
                        onChange={this.handleInputOnChange}
                      />
                    </div>
                  </div>
                </div>                
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="submit" className="btn btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}