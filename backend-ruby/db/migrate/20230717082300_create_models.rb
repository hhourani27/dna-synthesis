class CreateModels < ActiveRecord::Migration[7.0]
  def change
    create_table :models do |t|
      t.string :name, null: false
      t.integer :well_array_rows, null: false
      t.integer :well_array_cols, null: false

      t.timestamps
    end
  end
end
