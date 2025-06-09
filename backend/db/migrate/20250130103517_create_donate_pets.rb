class CreateDonatePets < ActiveRecord::Migration[7.2]
  def change
    create_table :donate_pets do |t|
      t.string :address, null: false
      t.string :phone_no, null: false
      t.integer :status, default: 0
      t.datetime :expected_donate_date
      t.datetime :actual_donate_date
      t.references :user, null: false, foreign_key: true
      t.references :pet, null: false, foreign_key: true

      t.timestamps
    end
  end
end
