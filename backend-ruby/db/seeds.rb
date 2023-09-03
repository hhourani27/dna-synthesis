SEED = 27
srand(SEED)

def generate_oligo(min_size, max_size)
  oligo_size = rand min_size..max_size
  nucleotides = %w[A C T G]
  Array.new(oligo_size) { nucleotides.sample }.join
end

def generate_db(idle_machines_count:, idle_assigned_order_machines_count:, synthethizing_machines_count:,
                waiting_for_dispatch_machines_count:)

  locations = %w[Paris Nice]

  # (0) Create the model
  model = Model.create!(name: 'DNA-SYNTH-96', well_array_rows: 8, well_array_cols: 12)
  well_count = 8 * 12

  # (1) Create machines
  machine_count = idle_machines_count + idle_assigned_order_machines_count + synthethizing_machines_count + waiting_for_dispatch_machines_count
  machines = machine_count.times.map do
    Machine.create!(model: model, location: locations.sample,
                    status: :idle)
  end

  # Shuffle the array so that they are picked randomly
  machines.shuffle!

  # (2) Assign orders for some machines
  machines = machines.take(idle_assigned_order_machines_count + synthethizing_machines_count + waiting_for_dispatch_machines_count)
  machines.each do |_m|
    ordered_oligos = well_count.times.map { generate_oligo(15, 120) }
    order = Order.create!(oligos: ordered_oligos)
    _m.update!(status: :idle_assigned_order, order: order, synthesis_total_cycles: ordered_oligos.map do |o|
                                                                                     o.length
                                                                                   end.max, synthesis_completed_cycles: 0)
    _m.wells.each_with_index do |w, idx|
      w.update!(status: :idle_assigned_oligo, oligo: ordered_oligos[idx], total_cycles: ordered_oligos[idx].length,
                synthetized_nucleotide_count: 0)
    end
  end

  # (3) Start synthetizing for some machines
  machines = machines.take(synthethizing_machines_count + waiting_for_dispatch_machines_count)
  machines.each do |m|
    completed_cycles = rand 0...m.synthesis_total_cycles
    m.update!(status: :synthetizing, synthesis_completed_cycles: completed_cycles,
              synthesis_current_step: Machine.synthesis_current_steps.values.sample)
    m.wells.each do |w|
      if completed_cycles < w.oligo.length
        w.update!(status: :synthetizing_oligo, synthetized_nucleotide_count: completed_cycles)
      else
        w.update!(status: :completed_oligo, synthetized_nucleotide_count: w.oligo.length)
      end
    end
  end

  # (3) Finish synthetizing for some machines
  machines = machines.take(waiting_for_dispatch_machines_count)
  machines.each do |m|
    m.update!(status: :waiting_for_dispatch, synthesis_completed_cycles: m.synthesis_total_cycles,
              synthesis_current_step: nil)
    m.wells.each do |w|
      w.update!(status: :completed_oligo, synthetized_nucleotide_count: w.oligo.length)
    end
  end
end

# DATA GENERATORS
# Use this to generate data for the dev database/environment
generate_db(idle_machines_count: 5, idle_assigned_order_machines_count: 5, synthethizing_machines_count: 10,
            waiting_for_dispatch_machines_count: 5)

# Use this to generate data for the test database/environment
# generate_db(idle_machines_count: 20, idle_assigned_order_machines_count: 20, synthethizing_machines_count: 60,
#             waiting_for_dispatch_machines_count: 20)

# Use this to generate a single Synthetizing machine to debug simulator
# generate_db(idle_machines_count: 0, idle_assigned_order_machines_count: 0, synthethizing_machines_count: 1,
#             waiting_for_dispatch_machines_count: 0)
