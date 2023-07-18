require "test_helper"

class ModelTest < ActiveSupport::TestCase
  test "Basic create model" do
    Model.create!(name: "DNA-SYNTH-96", well_array_rows: 8, well_array_cols: 12)
    model = Model.first
    assert_equal(model.name, "DNA-SYNTH-96")
  end
end
