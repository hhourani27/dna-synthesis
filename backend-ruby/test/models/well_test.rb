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
end
