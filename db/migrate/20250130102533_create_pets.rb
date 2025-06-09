class CreatePets < ActiveRecord::Migration[7.2]
  def change
    create_table :pets do |t|
      t.integer :age, default: 0
      t.integer :gender, null: false
      t.string  :temperament, default: "Unknown"
      t.boolean :vaccination_status, default: false
      t.text    :medical_history
      t.text    :recommended_food
      t.text    :common_health_issues
      t.integer :status, default: 0
      t.string  :pet_image_url
      t.references :breed, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.datetime :discarded_at
      t.timestamps
    end
  end
end
