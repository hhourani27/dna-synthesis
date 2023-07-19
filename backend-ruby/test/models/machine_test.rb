require 'test_helper'

class MachineTest < ActiveSupport::TestCase
  test 'Create Idle Machine' do
    machine = Machine.create!(model: models(:DNASYNTH96), location: 'Nice', status: :idle)
    assert_equal(machine.model.name, 'DNA-SYNTH-96')
  end

  test 'A Machine should always have a model' do
    assert_raises ActiveRecord::RecordInvalid do
      machine = Machine.create!(model: nil, location: 'Nice', status: :idle)
    end
  end

  test 'A Machine should not have an invalid status' do
    assert_raises ArgumentError do
      machine = Machine.create!(model: models(:DNASYNTH96), location: 'Nice', status: 4)
    end
  end

  test 'An Idle machine should not have an order' do
    assert_raises ActiveRecord::RecordInvalid do
      machine = Machine.create!(model: models(:DNASYNTH96), location: 'Nice', status: :idle, order: orders(:order1),
                                order_total_cycles: 10, order_completed_cycles: 5, order_current_step: :elongation)
    end
  end

  test 'A Synthetizing Machine should always have an order' do
    assert_raises ActiveRecord::RecordInvalid do
      machine = Machine.create!(model: models(:DNASYNTH96), location: 'Nice', status: :synthetizing)
    end
  end

  test "A Machine that didn't start synthetizing should not have a synthetizing step" do
    assert_raises ActiveRecord::RecordInvalid do
      machine = Machine.create!(model: models(:DNASYNTH96), location: 'Nice', status: :idle_assigned_order, order: orders(:order1),
                                order_total_cycles: 10, order_completed_cycles: 5, order_current_step: :elongation)
    end
  end
end
