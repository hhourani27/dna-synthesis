class CreateMachines < ActiveRecord::Migration[7.0]
  def change
    create_table :machines do |t|
      t.references :model, null: false, foreign_key: true
      t.string :location, null: false
      t.integer :status, null: false
      t.references :order, foreign_key: true
      t.integer :order_total_cycles
      t.integer :order_completed_cycles
      t.integer :order_current_step

      t.timestamps
    end
  end
end
