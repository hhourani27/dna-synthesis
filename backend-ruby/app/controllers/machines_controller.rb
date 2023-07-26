class MachinesController < ApplicationController
  def index
    if params[:status].present?
      status_query = params[:status].downcase
      if Machine.statuses.key?(status_query)
        @machines = Machine.where(status: status_query)
        render json: @machines.map(&:render_json)
      else
        render json: { error: 'Invalid query parameter "status"' }, status: :bad_request
      end
    else
      @machines = Machine.all
      render json: @machines.map(&:render_json)
    end
  end

  def show
    @machine = Machine.find(params[:id])
    render json: @machine.render_json
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Machine not found' }, status: :not_found
  end

  def update
    Rails.logger.debug('HABIB : in update')
    @machine = Machine.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    Rails.logger.debug('HABIB : Machine not found')
    render json: { error: 'Machine not found' }, status: :not_found
  else
    Rails.logger.debug('HABIB : Updating Machine')
    update_result = @machine.update(machine_params)
    Rails.logger.debug("HABIB : Update result #{update_result}")
    Rails.logger.debug(@machine.errors.messages.inspect)
    render json: { error: @machine.errors.messages.inspect }, status: :internal_server_error if update_result == false
  end

  private

  # This In a PATCH operation, only permit to update the following fields
  # At the same time, translate them to rails named attributes
  def machine_params
    Rails.logger.debug('HABIB: Inside machine_params')
    Rails.logger.debug("HABIB: params: #{p}")
    permitted = params.permit(:status, synthesis: %i[totalCycles completedCycles currentStep],
                                       wells: %i[id row col status oligo totalCycles synthetizedNucleotideCount])
    Rails.logger.debug("HABIB: permitted: #{permitted}")

    # Translate "status" values
    permitted[:status] = permitted['status'].downcase if permitted.has_key?('status')

    # Translate synthesis
    if permitted.has_key?('synthesis')
      p_s = permitted.extract!('synthesis')['synthesis']
      Rails.logger.debug("HABIB: p_s: #{p_s}")
      permitted[:synthesis_total_cycles] = p_s['totalCycles'] if p_s.has_key?('totalCycles')
      permitted[:synthesis_completed_cycles] = p_s['completedCycles'] if p_s.has_key?('completedCycles')
      Rails.logger.debug("HABIB: currentStep: #{p_s['currentStep']}")
      if p_s.has_key?('currentStep')
        Rails.logger.debug('HABIB: Line 58')
        permitted[:synthesis_current_step] = p_s['currentStep']
      end
    end
    # Translate wells
    if permitted.has_key?('wells')
      permitted = permitted.transform_keys { |key| key == 'wells' ? 'wells_attributes' : key }
      permitted['wells_attributes'].each do |well|
        well.transform_keys! { |key| key == 'totalCycles' ? 'total_cycles' : key }
        well.transform_keys! { |key| key == 'synthetizedNucleotideCount' ? 'synthetized_nucleotide_count' : key }
        well['status'] = well['status'].downcase
      end
      Rails.logger.debug("HABIB: transformed: #{permitted}")
    end
    permitted

    # transformed["wells"].map! do |well|
    #   well.transform_values! { |value| value == "SYNTHETIZING_OLIGO" ? "NEW_VALUE" : value }

    # new_params = {}
    # new_params[:wells_attributes] = permitted.to_hash
    # new_params

    # Rails.logger.debug('HABIB: Inside translate_params')
    # Rails.logger.debug("HABIB: #{p}")
    # new_params = {}
    # new_params[:status] = p['status'].downcase if p.has_key?('status')
    # if p.has_key?('synthesis')
    #   p_s = p['synthesis']
    #   new_params[:synthesis_completed_cycles] = p_s['completedCycles'] if p_s.has_key?('completedCycles')
    #   new_params[:synthesis_current_step] = p_s['currentStep'].downcase if p_s.has_key?('currentStep')
    # end
    # new_params[:wells_attributes] = p['wells'].to_hash
    # Rails.logger.debug("HABIB: Translated params to #{new_params}")
    # new_params
  end
end
