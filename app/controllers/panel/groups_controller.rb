class Panel::GroupsController < PanelController
  def index
    @groups = Group.all
  end

  def new
    @students = User.where(role: :student)
    @new_group = Group.new
  end

  def edit
    @students = User.where(role: :student)
    @group = Group.find(params[:id])
  end

  def create
    Group.create(group_params)

    redirect_to panel_groups_path
  end

  def update
    Group.find(params[:id]).update(group_params)

    redirect_to panel_groups_path
  end

  def destroy
    Group.find(params[:id]).destroy

    redirect_to panel_groups_path
  end

  private

  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end
end
