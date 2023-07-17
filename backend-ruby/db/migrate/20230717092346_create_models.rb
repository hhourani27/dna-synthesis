class CreateModels < ActiveRecord::Migration[7.0]
  def change
    create_table :models, id:false, primary_key: :id do |t|
      t.string :id
      t.integer :well_array_rows
      t.integer :well_array_cols

      t.timestamps
    end
  end
end
