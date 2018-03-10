class Panel::ExamsController < PanelController
  def index
    @exams = Exam.all
  end

  def new
    @new_exam = current_user.exams.new
  end

  def edit
    @exam = Exam.find(params[:id])
  end

  def update
    @exam = Exam.find(params[:id])

    @exam.update(exam_params)

    redirect_to panel_exams_path
  end

  def create
    current_user.exams.create(exam_params)

    redirect_to panel_exams_path
  end

  private

  def exam_params
    params.require(:exam).permit(
      :title, :duration_in_minutes,
      exam_questions_attributes: [:id, :description, :_destroy, :right_option_id,
        exam_question_options_attributes: [:id, :title]
      ]
    )
  end
end
