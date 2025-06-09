class ModifyPetsTable < ActiveRecord::Migration[7.2]
  def change
    # Add new column for age unit
    add_column :pets, :age_unit, :string

    # Remove default values from existing columns
    change_column_default :pets, :age, nil
    change_column_default :pets, :temperament, nil
    change_column_default :pets, :status, nil
  end
end
