Rails.application.routes.draw do
  devise_for :users

  namespace :panel do
    resources :students
    resources :exams
  end
end
