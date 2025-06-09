class CreateCategories < ActiveRecord::Migration[7.2]
  def change
    create_table :categories do |t|
      t.string :category_name, null: false
      t.datetime :discarded_at
      t.timestamps
    end
  end
end
