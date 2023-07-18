require "test_helper"

class MachineTest < ActiveSupport::TestCase
  test "Basic create Machine" do
    model = Model.create!(name: "DNA-SYNTH-96", well_array_rows: 8, well_array_cols: 12)
    machine = Machine.create!(model: model, location: "Nice", status: :idle)
    assert_equal(machine.model.name, "DNA-SYNTH-96")
  end
end
