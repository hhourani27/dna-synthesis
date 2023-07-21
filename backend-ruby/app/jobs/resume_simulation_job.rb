class ResumeSimulationJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    Rails.logger.debug('Starting ResumeSimulationJob')
    machines = Machine.synthetizing
    Rails.logger.debug("Retrieved #{machines.size} synthetizing machines")

    machines.each { |m| MachineOligoSynthesisJob.perform_later(m.id) }
  end
end
