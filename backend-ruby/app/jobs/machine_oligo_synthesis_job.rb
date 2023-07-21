class MachineOligoSynthesisJob < ApplicationJob
  queue_as :default

  def perform(machine_id)
    3.times do |i|
      sleep(3)
      Rails.logger.debug("MachineOligoSynthesisJob for machine #{machine_id}, iteration #{i}")
    end
  end
end
