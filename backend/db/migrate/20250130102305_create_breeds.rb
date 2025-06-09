class CreateBreeds < ActiveRecord::Migration[7.2]
  def change
    create_table :breeds do |t|
      t.string :breed_name, null: false
      t.references :category, null: false, foreign_key: true
      t.datetime :discarded_at
      t.timestamps
    end
  end
end
