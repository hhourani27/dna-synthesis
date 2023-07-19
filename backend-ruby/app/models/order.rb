class Order < ApplicationRecord
  belongs_to :machine, required: false

  validates :oligos, presence: true
end
