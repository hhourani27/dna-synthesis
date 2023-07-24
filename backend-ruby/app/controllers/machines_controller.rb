class MachinesController < ApplicationController
  def index
    if params[:status].present?
      Rails.logger.debug "Read params[:status] #{params[:status]}"
      status_query = params[:status].downcase
      Rails.logger.debug "Read status_query #{status_query}"
      Rails.logger.debug "Read Machine.statuses.values #{Machine.statuses.values}"
      if Machine.statuses.key?(status_query)
        Rails.logger.debug "I'm here 1"
        @machines = Machine.where(status: status_query)
        render json: @machines.map(&:render_json)
      else
        Rails.logger.debug "I'm here 2"
        render json: { error: 'Invalid query parameter "status"' }, status: :bad_request
      end
    else
      Rails.logger.debug "I'm here 3"
      @machines = Machine.all
      render json: @machines.map(&:render_json)
    end
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
