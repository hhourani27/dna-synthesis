class CreateWells < ActiveRecord::Migration[7.0]
  def change
    create_table :wells do |t|
      t.integer :row
      t.integer :col
      t.string :oligo
      t.integer :total_cycles
      t.integer :status
      t.integer :synthetized_nucleotide_count
      t.references :machine, foreign_key:true

      t.timestamps
    end
  end
end
