class Order < ApplicationRecord
  enum :status, { new_order: 0, assigned_to_machine: 1, completed: 2 }

  belongs_to :machine, required: false

  # A machine always has a model, location & status
  # == Validations
  validates :status, :oligos, presence: true

  validates :machine, presence: true, if: proc { |o|
                                            o.status != 'new_order'
                                          }

  # Log validation error
  after_validation :log_validation_errors, if: proc { |m| m.errors }

  def render_json
    output = {
      id: id,
      oligos: oligos
    }

    if status == 'new_order'
      output[:status] = 'NEW'
    else
      output[:status] = status.upcase
      output[:machine_id] = machine.id
    end

    output
  end

  private

  def log_validation_errors
    Rails.logger.debug errors.full_messages.join("\n")
  end
end
