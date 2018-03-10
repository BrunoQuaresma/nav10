class Panel::StudentsController < PanelController
  def index
    @students = User.where(role: :student)
  end

  private

  def student_params
    params.require(:user).permit(
      :name, :email, :password, :confirm_password
    )
  end
end
