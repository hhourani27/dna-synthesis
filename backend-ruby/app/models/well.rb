class Well < ApplicationRecord
  enum :status, { idle: 0, idle_assigned_oligo: 1, synthetizing_oligo: 2, completed_oligo: 3 }

  belongs_to :machine

  # == Validations
  # A Well's total_cycles is always less than or equal to the Machine's total_cycles
  validates :total_cycles, comparison: { less_than_or_equal_to: lambda { |well|
                                                                  well.machine.synthesis_total_cycles
                                                                } }, allow_nil: true

  # A Well's total_cycles is always equal to the well's oligo length
  validates :total_cycles, comparison: { equal_to: lambda { |well|
                                                     well.oligo.length
                                                   } }, allow_nil: true
end
