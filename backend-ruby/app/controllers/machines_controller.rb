class MachinesController < ApplicationController
  def index
    @machines = Machine.all
    render json: @machines
  end
end
