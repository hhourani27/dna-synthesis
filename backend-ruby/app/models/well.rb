class Well < ApplicationRecord
    enum :status, {idle_assigned_order: 0, idle_assigned_oligo: 1, synthetizing_oligo: 2, completed_oligo: 3}
    
    belongs_to :machine
end
