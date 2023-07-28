class MachinesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'MachinesChannel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
