class OrdersController < ApplicationController
  def index
    @orders = Order.all
    render json: @orders.map(&:render_json)
  end

  def show
    @order = Order.find(params[:id])
    render json: @order.render_json
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Order not found' }, status: :not_found
  end
end
