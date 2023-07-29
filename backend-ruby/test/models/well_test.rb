require 'test_helper'

class WellTest < ActiveSupport::TestCase
  test "Well's total cycles should be equal to oligo length" do
    machine = Machine.create!(model: models(:DNASYNTH96), location: 'Nice', status: :idle)

    machine.status = :idle_assigned_order
    machine.order = orders(:order1)
    machine.synthesis_total_cycles = 22
    machine.synthesis_completed_cycles = 0
    machine.wells.each do |w|
      w.status = :idle_assigned_oligo
      w.oligo = 'GAAATCCAAGCTGTGGAAGTAC'
      w.total_cycles = 21 # should be equal to oligo length = 22
      w.synthetized_nucleotide_count = 0
    end

    assert_raises ActiveRecord::RecordInvalid do
      machine.save!
    end
  end

  test "Well's total cycles should less than or equal to Machine's total cycles" do
    machine = Machine.create!(model: models(:DNASYNTH96), location: 'Nice', status: :idle)

    machine.status = :idle_assigned_order
    machine.order = orders(:order1)
    machine.synthesis_total_cycles = 21 # should be equal to the largest oligo length = 22
    machine.synthesis_completed_cycles = 0
    machine.wells.each do |w|
      w.status = :idle_assigned_oligo
      w.oligo = 'GAAATCCAAGCTGTGGAAGTAC'
      w.total_cycles = 22
      w.synthetized_nucleotide_count = 0
    end

    assert_raises ActiveRecord::RecordInvalid do
      machine.save!
    end
  end

  test "Well's synthetized_nucleotide_count is always less than or equal to total_cycles" do
    machine = Machine.create!(model: models(:DNASYNTH96), location: 'Nice', status: :idle)

    machine.status = :synthetizing
    machine.order = orders(:order1)
    machine.synthesis_current_step = :elongation
    machine.synthesis_total_cycles = 22
    machine.synthesis_completed_cycles = 8
    machine.wells.each do |w|
      w.status = :synthetizing_oligo
      w.oligo = 'GAAATCCAAGCTGTGGAAGTAC'
      w.total_cycles = 22
      w.synthetized_nucleotide_count = 8 # should be less that w.total_cycles
    end

    machine.wells[0].oligo = 'GAAATAAAAA'
    machine.wells[0].total_cycles = 10
    machine.wells[0].synthetized_nucleotide_count = 11 # should be less that w.total_cycles

    assert_raises ActiveRecord::RecordInvalid do
      machine.save!
    end
  end
end
