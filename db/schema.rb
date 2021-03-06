# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180624213648) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "exam_application_logs", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "exam_application_id"
    t.string "event"
    t.string "subject"
    t.integer "subject_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exam_application_id"], name: "index_exam_application_logs_on_exam_application_id"
    t.index ["user_id"], name: "index_exam_application_logs_on_user_id"
  end

  create_table "exam_applications", force: :cascade do |t|
    t.bigint "exam_id"
    t.bigint "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_self", default: false
    t.bigint "user_id"
    t.index ["exam_id"], name: "index_exam_applications_on_exam_id"
    t.index ["group_id"], name: "index_exam_applications_on_group_id"
    t.index ["user_id"], name: "index_exam_applications_on_user_id"
  end

  create_table "exam_questions", force: :cascade do |t|
    t.text "description"
    t.integer "right_option_index"
    t.integer "difficulty_level"
    t.bigint "exam_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exam_id"], name: "index_exam_questions_on_exam_id"
  end

  create_table "exam_sections", force: :cascade do |t|
    t.bigint "exam_id"
    t.string "name"
    t.integer "start_at"
    t.integer "end_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exam_id"], name: "index_exam_sections_on_exam_id"
  end

  create_table "exams", force: :cascade do |t|
    t.string "title"
    t.integer "duration_in_minutes"
    t.integer "number_of_questions"
    t.integer "number_of_options"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "answers"
    t.integer "start_question_number"
    t.index ["user_id"], name: "index_exams_on_user_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups_users", force: :cascade do |t|
    t.bigint "group_id"
    t.bigint "user_id"
    t.index ["group_id"], name: "index_groups_users_on_group_id"
    t.index ["user_id"], name: "index_groups_users_on_user_id"
  end

  create_table "user_answers", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "exam_application_id"
    t.json "logs"
    t.json "answers"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exam_application_id"], name: "index_user_answers_on_exam_application_id"
    t.index ["user_id"], name: "index_user_answers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "exam_application_logs", "exam_applications"
  add_foreign_key "exam_application_logs", "users"
  add_foreign_key "exam_applications", "exams"
  add_foreign_key "exam_applications", "groups"
  add_foreign_key "exam_applications", "users"
  add_foreign_key "exam_questions", "exams"
  add_foreign_key "exam_sections", "exams"
  add_foreign_key "exams", "users"
  add_foreign_key "groups_users", "groups"
  add_foreign_key "groups_users", "users"
  add_foreign_key "user_answers", "exam_applications"
  add_foreign_key "user_answers", "users"
end
