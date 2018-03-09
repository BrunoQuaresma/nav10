Rails.application.routes.draw do
  devise_for :users

  namespace :panel do
    resources :exams
  end
end
