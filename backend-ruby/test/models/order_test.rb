require 'test_helper'

class OrderTest < ActiveSupport::TestCase
  test 'Query Order in fixture' do
    order = Order.take
    assert_equal(order.oligos.length, 8 * 12)
  end

  test 'Create Order' do
    order = Order.create!(oligos: %w[A AA AAA AAAA], status: :new_order)
    assert_equal(order.oligos.length, 4)
  end

  test 'An Order should always have a status' do
    assert_raises ActiveRecord::RecordInvalid do
      order = Order.create!(oligos: %w[A AA AAA AAAA])
    end
  end


  test 'An Order should always have oligos (edge case: empty array)' do
    assert_raises ActiveRecord::RecordInvalid do
      order = Order.create!(oligos: [], status: :new_order)
    end
  end

  test 'An Order should always have oligos (edge case: nil)' do
    assert_raises ActiveRecord::RecordInvalid do
      order = Order.create!(oligos: nil, status: :new_order)
    end
  end

  test 'An Order should always have oligos (edge case: no oligos)' do
    assert_raises ActiveRecord::RecordInvalid do
      order = Order.create!
    end
  end
end
