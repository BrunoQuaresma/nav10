class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  enum role: { student: 0, teacher: 1 }

  has_and_belongs_to_many :groups
  has_many :exams
  has_many :exam_application_histories
  has_many :exam_applications, through: :groups
  has_many :user_answers

  def teacher?
    role == "teacher"
  end

  def answered?(exam_application)
    exam_application.user_answers.where(user_id: id).count > 0
  end
end
