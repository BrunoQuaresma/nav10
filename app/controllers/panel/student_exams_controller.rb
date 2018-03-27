class Panel::StudentExamsController < PanelController
  skip_before_action :verify_authenticity_token, only: [:history]

  def index
    @exam_applications = current_user.exam_applications
  end

  def start
    @exam_application = current_user.exam_applications.find(params[:student_exam_id])
  end

  def history
    histories_params.each do |index|
      history_params = histories_params[index]
      exam_application_history = ExamApplicationHistory.new(history_params)
      exam_application_history.exam_id = params[:student_exam_id]

      current_user.exam_application_histories << exam_application_history
    end

    current_user.save!

    head :ok
  end

  private

  def histories_params
    params.permit(histories: [:subject_id, :subject, :event])['histories']
  end
end
