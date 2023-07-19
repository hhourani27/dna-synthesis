class CreateMachines < ActiveRecord::Migration[7.0]
  def change
    create_table :machines do |t|
      t.belongs_to :model, null: false, foreign_key: true
      t.string :location, null: false
      t.integer :status, null: false
      t.integer :synthesis_total_cycles
      t.integer :synthesis_completed_cycles
      t.integer :synthesis_current_step

      t.timestamps
    end
  end
end
