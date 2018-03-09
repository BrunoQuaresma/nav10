class Panel::ExamsController < PanelController
  def index
  end

  def new
    @new_exam = current_user.exams.new
  end
end
