class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.text :oligos, array: true, null: false, default: []
      t.belongs_to :machine, foreign_key: true

      t.timestamps
    end
  end
end
