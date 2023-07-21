class MachinesController < ApplicationController
  def index
    @machines = Machine.all
    render json: @machines.map(&:render_json)
  end
end
