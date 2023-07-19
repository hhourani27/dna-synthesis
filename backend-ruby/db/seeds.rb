# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Model.create!(name: 'DNA-SYNTH-96', well_array_rows: 8, well_array_cols: 12)

def generate_db(idle_machines_count:, idle_assigned_order_machines_count:, synthethizing_machines_count:,
                waiting_for_dispatch_machines_count:)

  # Create orders for non-idle machines
end
