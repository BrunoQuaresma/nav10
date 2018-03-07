class PanelController < ApplicationController
  layout 'panel'

  before_action :authenticate_user!
end
