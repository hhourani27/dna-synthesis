class MachinesController < ApplicationController
  def index
    @machines = Machine.all
    render json: @machines.map(&:render_json)
  end

  def show
    @machine = Machine.find(params[:id])
    render json: @machine.render_json
  end
end
