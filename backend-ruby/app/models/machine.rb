class Machine < ApplicationRecord
    enum :status, {idle: 0, idle_assigned_order: 1, synthetizing: 2, waiting_for_dispatch: 3}
end
