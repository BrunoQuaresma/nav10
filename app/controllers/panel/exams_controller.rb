class Panel::ExamsController < PanelController
  before_action :set_exam, only: [:update, :edit, :destroy]

  def index
    @exams = Exam.all
  end

  def new
    @new_exam = current_user.exams.new
  end

  def edit
  end

  def update
    @exam.update(exam_params)

    redirect_back fallback_location: edit_panel_exam_path(@exam)
  end

  def create
    exam = current_user.exams.create(exam_params)

    redirect_to edit_panel_exam_path(exam, sub_page: 'answers')
  end

  def destroy
    @exam.destroy

    redirect_to panel_exams_path
  end

  private

  def set_exam
    @exam = Exam.find(params[:id])
  end

  def exam_params
    if @exam.present?
      return params.require(:exam).permit(
        :title,
        :duration_in_minutes,
        :number_of_questions,
        :number_of_options,
        :start_question_number,
        answers: @exam.number_of_questions.times.map{|i| "#{i}".to_sym}
      )
    end

    params.require(:exam).permit(
      :title,
      :duration_in_minutes,
      :number_of_questions,
      :number_of_options,
      :start_question_number
    )
  end
end
