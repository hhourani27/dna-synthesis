class ApplicationController < ActionController::API
  include JsonWebToken

  before_action :authenticate_request

  private

  def authenticate_request
    authorization_header = request.headers['Authorization']

    # Return 401 Unauthorized if there's no 'Authorization' header
    unless authorization_header
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end

    token = authorization_header.split(' ').last
    decoded = jwt_decode(token)
    Rails.logger.debug "HABIB : decoded = #{decoded}"

    # Return 401 Unauthorized if the user is not an admin
    if decoded[:user_id] != 'admin'
      render json: { error: 'Unauthorized' }, status: :unauthorized
      nil
    end
  rescue JWT::DecodeError # Handle any JWT decoding errors
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
