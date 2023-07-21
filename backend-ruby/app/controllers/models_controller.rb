class ModelsController < ApplicationController
  def index
    @models = Model.all
    render json: @models.map(&:render_json)
  end
end
