class CreateWells < ActiveRecord::Migration[7.0]
  def change
    create_table :wells do |t|
      t.integer :row, null: false
      t.integer :col, null: false
      t.integer :status, null: false
      t.references :machine, foreign_key:true, null: false

      t.string :oligo
      t.integer :total_cycles
      t.integer :synthetized_nucleotide_count

      t.timestamps
    end
  end
end
