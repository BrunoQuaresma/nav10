class Panel::UserAnswersController < PanelController
  def create
    current_user.user_answers.create!(
      exam_application_id: params[:exam_application_id],
      logs: params[:logs],
      answers: params[:answers]
    )

    render status: 200
  end

  def show
    @user_answer = UserAnswer.find(params[:id])
  end
end
