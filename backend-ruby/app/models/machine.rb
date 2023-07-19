class Machine < ApplicationRecord
  enum :status, { idle: 0, idle_assigned_order: 1, synthetizing: 2, waiting_for_dispatch: 3 }
  enum :order_current_step, { elongation: 0, deprotectin: 1, wash: 2 }

  # Associations
  belongs_to :model
  has_many :wells, dependent: :destroy
  has_one :order, required: false

  # Validations
  # A machine always has a model, location & status
  validates :model, :location, :status, presence: true

  # If machine is idle, there's no associated order
  validates :order, :order_total_cycles, :order_completed_cycles, :order_current_step, absence: true, if: proc { |m|
                                                                                                            m.status == 'idle'
                                                                                                          }

  # If machine is not idle, there's an associated order
  validates :order, :order_total_cycles, :order_completed_cycles, presence: true, if: proc { |m|
                                                                                        %w[idle_assigned_order synthetizing waiting_for_dispatch].include?(m.status)
                                                                                      }

  # If machine didn't start or finished synthetizing, there's no step
  validates :order_current_step, absence: true, if: proc { |m|
                                                      %w[idle_assigned_order waiting_for_dispatch].include?(m.status)
                                                    }
end
