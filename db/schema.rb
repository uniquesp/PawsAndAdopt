# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_02_26_115843) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "adopt_pets", force: :cascade do |t|
    t.string "email", null: false
    t.string "address", null: false
    t.string "phone_no", null: false
    t.datetime "expected_adoption_date"
    t.datetime "actual_adoption_date"
    t.integer "status", default: 0
    t.integer "user_id", null: false
    t.integer "pet_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pet_id"], name: "index_adopt_pets_on_pet_id"
    t.index ["user_id"], name: "index_adopt_pets_on_user_id"
  end

  create_table "breeds", force: :cascade do |t|
    t.string "breed_name", null: false
    t.integer "category_id", null: false
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_breeds_on_category_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "category_name", null: false
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "donate_pets", force: :cascade do |t|
    t.string "address", null: false
    t.string "phone_no", null: false
    t.integer "status", default: 0
    t.datetime "expected_donate_date"
    t.datetime "actual_donate_date"
    t.integer "user_id", null: false
    t.integer "pet_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pet_id"], name: "index_donate_pets_on_pet_id"
    t.index ["user_id"], name: "index_donate_pets_on_user_id"
  end

  create_table "pets", force: :cascade do |t|
    t.integer "age"
    t.integer "gender", null: false
    t.string "temperament"
    t.boolean "vaccination_status", default: false
    t.text "medical_history"
    t.text "recommended_food"
    t.text "common_health_issues"
    t.integer "status"
    t.string "pet_image_url"
    t.integer "breed_id", null: false
    t.integer "category_id", null: false
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "age_unit"
    t.index ["breed_id"], name: "index_pets_on_breed_id"
    t.index ["category_id"], name: "index_pets_on_category_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "profile_img_url"
    t.string "email", null: false
    t.string "phone_no"
    t.integer "role", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_users_on_discarded_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "adopt_pets", "pets"
  add_foreign_key "adopt_pets", "users"
  add_foreign_key "breeds", "categories"
  add_foreign_key "donate_pets", "pets"
  add_foreign_key "donate_pets", "users"
  add_foreign_key "pets", "breeds"
  add_foreign_key "pets", "categories"
end
