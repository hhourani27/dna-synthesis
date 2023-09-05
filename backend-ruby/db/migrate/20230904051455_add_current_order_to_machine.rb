class AddCurrentOrderToMachine < ActiveRecord::Migration[7.0]
  def change
    add_reference :machines, :current_order, foreign_key: { to_table: :orders }
  end
end
