class Panel::StudentExamsController < PanelController
  skip_before_action :verify_authenticity_token, only: [:history]

  def index
    @exam_applications = current_user.exam_applications
  end

  def new
    @new_exam = current_user.exams.new
  end

  def create
    exam = current_user.exams.create(exam_params)

    redirect_to :back
  end

  def start
    @exam_application = current_user.exam_applications.find(params[:student_exam_id])
  end

  def history
    exam_application_history = ExamApplicationHistory.new(history_params)
    exam_application_history.exam_application_id = params[:student_exam_id]

    current_user.exam_application_histories << exam_application_history

    current_user.save!

    head :ok
  end

  def all_history
    @user_answer = current_user.user_answers.find_by(exam_application_id: params[:student_exam_id])
    @exam = @user_answer.exam_application.exam
  end

  private

  def history_params
    params.require(:history).permit(:subject_id, :subject, :event)
  end

  def exam_params
    params.require(:exam).permit(
      :title,
      :duration_in_minutes,
      :number_of_questions,
      :number_of_options,
      :start_question_number,
      :exam_sections_attributes
    )
  end
end
