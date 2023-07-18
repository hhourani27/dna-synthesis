class Machine < ApplicationRecord
    enum :status, {idle: 0, idle_assigned_order: 1, synthetizing: 2, waiting_for_dispatch: 3}

    belongs_to :model
    has_many :wells, dependent: :destroy
    belongs_to :order, required: false
end
