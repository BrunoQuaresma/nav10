class Panel::StudentExamsController < PanelController
  skip_before_action :verify_authenticity_token, only: [:history]

  def index
    @exam_applications = current_user.exam_applications
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
end
