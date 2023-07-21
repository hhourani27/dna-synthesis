class ResumeSimulationJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    Rails.logger.debug('Starting ResumeSimulationJob')
  end
end
