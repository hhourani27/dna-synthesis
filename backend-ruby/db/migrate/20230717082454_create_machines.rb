class CreateMachines < ActiveRecord::Migration[7.0]
  def change
    create_table :machines do |t|
      t.string :model
      t.string :location
      t.integer :status
      t.integer :order_total_cycles
      t.integer :order_completed_cycles
      t.integer :order_current_step

      t.timestamps
    end
  end
end
