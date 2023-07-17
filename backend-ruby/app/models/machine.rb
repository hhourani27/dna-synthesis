class Machine < ApplicationRecord
    enum :status, {IDLE: 0, IDLE_ASSIGNED_ORDER: 1, SYNTHETIZING: 2, WAITING_FOR_DISPATCH: 3}
end
