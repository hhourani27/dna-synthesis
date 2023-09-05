class Order < ApplicationRecord
  enum :status, { new_order: 0, assigned_to_machine: 1, completed: 2 }

  belongs_to :machine, required: false

  # A machine always has a model, location & status
  # == Validations
  validates :status, :oligos, presence: true

  # Log validation error
  after_validation :log_validation_errors, if: proc { |m| m.errors }

  private

  def log_validation_errors
    Rails.logger.debug errors.full_messages.join("\n")
  end
end
