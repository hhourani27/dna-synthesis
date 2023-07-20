def generate_oligo(min_size, max_size)
  oligo_size = rand min_size..max_size
  nucleotides = %w[A C T G]
  Array.new(oligo_size) { nucleotides.sample }.join
end

def generate_db(idle_machines_count:, idle_assigned_order_machines_count:, synthethizing_machines_count:,
                waiting_for_dispatch_machines_count:)

  # (0) Create the model
  Model.create!(name: 'DNA-SYNTH-96', well_array_rows: 8, well_array_cols: 12)

  # (1) Create orders for non-idle machines
  non_idle_machines_count = idle_assigned_order_machines_count + synthethizing_machines_count + waiting_for_dispatch_machines_count
  orders = non_idle_machines_count.times.map { Order.create!(oligos: 96.times.map { generate_oligo(15, 120) }) }
end

generate_db(idle_machines_count: 2, idle_assigned_order_machines_count: 2, synthethizing_machines_count: 10,
            waiting_for_dispatch_machines_count: 2)
