class Model < ApplicationRecord
  has_many :machine

  validates :name, :well_array_rows, :well_array_cols, presence: true

  def render_json
    {
      id: name,
      wellArraySize: [well_array_rows, well_array_cols]
    }
  end
end
