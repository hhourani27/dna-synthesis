class ModelsController < ApplicationController
  def index
    @models = Model.all
    render json: @models.map(&:render_json)
  end

  def show
    @model = Model.find_by(name: params[:id])
    render json: @model.render_json
  end
end
