class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  # POST /auth/login
  def login
    if params[:login].nil? or params[:password].nil? or params[:login] != 'admin'
      render json: { error: 'Unauthorized' }, status: :unauthorized
    else
      token = jwt_encode(user_id: params[:login])
      render json: { token: token }, status: :ok
    end
  end
end
