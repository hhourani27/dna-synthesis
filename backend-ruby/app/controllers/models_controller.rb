class ModelsController < ApplicationController
  def index
    @models = Model.all
    render json: @models.map(&:render_json)
  end

  def show
    @model = Model.find_by(name: params[:id])
    if @model.nil?
      render json: { error: 'Model not found' }, status: :not_found
    else
      render json: @model.render_json
    end
  end
end
