class Panel::StudentsController < PanelController
  def index
    @students = User.where(role: :student)
  end

  def new
    @new_student = User.new
  end

  def create
    new_student = User.new(student_params)
    new_student.role = :student

    new_student.save!

    redirect_to panel_students_path
  end

  def destroy
    User.find(params[:id]).destroy

    redirect_to panel_students_path
  end

  private

  def student_params
    params.require(:user).permit(
      :name, :email, :password, :confirm_password
    )
  end
end
