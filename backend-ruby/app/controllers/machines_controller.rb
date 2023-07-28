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
    @machine = Machine.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Machine not found' }, status: :not_found
  else
    update_result = @machine.update(machine_params)
    if update_result == true
      ActionCable.server.broadcast('MachinesChannel',
                                   { type: 'Machine updated', id: @machine.id, payload: @machine.render_json })
      render json: @machine.render_json, status:	:ok
    elsif update_result == false
      render json: { error: @machine.errors.messages.inspect }, status: :internal_server_error
    end
  end

  private

  # Only allow permitted fields to be modified
  # Transform payload from the API JSON schema to the rails model
  def machine_params
    transformed = params.permit(:status, synthesis: %i[totalCycles completedCycles currentStep],
                                         wells: %i[id status totalCycles synthetizedNucleotideCount])

    # Translate "status" values to Machine's enum
    transformed[:status] = transformed['status'].downcase if transformed.has_key?('status')

    # Translate synthesis by flatten it and rename its properties
    if transformed.has_key?('synthesis')
      # Careful : extract!('synthesis') returns {synthesis:{}}, you should add ['synthesis'] to get the content
      p_s = transformed.extract!('synthesis')['synthesis']
      transformed[:synthesis_total_cycles] = p_s['totalCycles'] if p_s.has_key?('totalCycles')
      transformed[:synthesis_completed_cycles] = p_s['completedCycles'] if p_s.has_key?('completedCycles')
      if p_s.has_key?('currentStep')
        transformed[:synthesis_current_step] = !p_s['currentStep'].nil? ? p_s['currentStep'].downcase : nil
      end
    end

    # Translate wells
    if transformed.has_key?('wells')
      # In order to update the Machine's associated wells, rails require a field names <associated model>_attributes
      transformed = transformed.transform_keys { |key| key == 'wells' ? 'wells_attributes' : key }
      # rename well's properties
      transformed['wells_attributes'].each do |well|
        well.transform_keys! { |key| key == 'totalCycles' ? 'total_cycles' : key }
        well.transform_keys! { |key| key == 'synthetizedNucleotideCount' ? 'synthetized_nucleotide_count' : key }
        well['status'] = well['status'].downcase if well.has_key?('status')
      end
    end
    transformed
  end
end
