class Order < ApplicationRecord
  belongs_to :machine, required: false

  validates :oligos, presence: true

  # Log validation error
  after_validation :log_validation_errors, if: proc { |m| m.errors }

  private

  def log_validation_errors
    Rails.logger.debug errors.full_messages.join("\n")
  end
end
