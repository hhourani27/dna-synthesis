class Machine < ApplicationRecord
  enum :status, { idle: 0, idle_assigned_order: 1, synthetizing: 2, waiting_for_dispatch: 3 }
  enum :synthesis_current_step, { elongation: 0, deprotection: 1, wash: 2 }

  # == Associations
  belongs_to :model
  has_many :wells, dependent: :destroy
  has_one :order, required: false

  # == Callback to create Wells before creating a Machine
  before_create :create_wells

  # == Validations
  # A machine always has a model, location & status
  validates :model, :location, :status, presence: true

  # If machine is idle, there's no associated order
  validates :order, :synthesis_total_cycles, :synthesis_completed_cycles, :synthesis_current_step, absence: true, if: proc { |m|
                                                                                                                        m.status == 'idle'
                                                                                                                      }

  # If machine is not idle, there's an associated order
  validates :order, :synthesis_total_cycles, :synthesis_completed_cycles, presence: true, if: proc { |m|
                                                                                                %w[idle_assigned_order synthetizing waiting_for_dispatch].include?(m.status)
                                                                                              }

  # If machine didn't start synthetizing or finished synthetizing, there's no step
  validates :synthesis_current_step, absence: true, if: proc { |m|
                                                          %w[idle_assigned_order waiting_for_dispatch].include?(m.status)
                                                        }

  def render_json
    output = {
      id: id,
      model: model.name,
      location: location,
      status: status.upcase
    }

    if status != 'idle'
      output[:order] = order.id
      output[:synthesis] = {
        totalCycles: synthesis_total_cycles,
        completedCycles: synthesis_completed_cycles,
        currentStep: synthesis_current_step.present? ? synthesis_current_step.upcase : nil
      }
    end

    output[:wells] = wells.map { |w| render_json_well(w) }

    output
  end



  private

  def create_wells
    model.well_array_rows.times do |r|
      model.well_array_cols.times do |c|
        wells.build(row: r, col: c, status: :idle)
      end
    end
  end

  def render_json_well(well)
    output = {
      id: well.id,
      row: well.row,
      col: well.col,
      status: well.status.upcase
    }

    if well.status != 'idle'
      output[:oligo] = well.oligo
      output[:totalCycles] = well.total_cycles
      output[:synthetizedNucleotideCount] = well.synthetized_nucleotide_count
    end

    output
  end
end
