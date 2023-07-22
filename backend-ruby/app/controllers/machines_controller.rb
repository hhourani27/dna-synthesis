class MachinesController < ApplicationController
  def index
    @machines = params[:status] ? Machine.where(status: params[:status].downcase) : Machine.all
    render json: @machines.map(&:render_json)
  end

  def show
    @machine = Machine.find(params[:id])
    render json: @machine.render_json
  end

  def update
    @machine = Machine.find(params[:id])
  end

  private

  # This In a PATCH operation, only permit to update the following fields
  # At the same time, translate them to rails named attributes
  def translate_params(p)
    new_params = {}
    new_params[:status] = p['status'].downcase if p.has_key?('status')
    if p.has_key?('synthesis')
      p_s = p['synthesis']
      new_params[:synthesis_completed_cycles] = p_s['completedCycles'] if p_s.has_key?('completedCycles')
      new_params[:synthesis_current_step] = p_s['currentStep'].downcase if p_s.has_key?('currentStep')
    end

    new_params
  end
end
